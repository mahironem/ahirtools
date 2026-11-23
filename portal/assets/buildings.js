/* AhirTools Binalar — bağımsız, paylaşılabilir hesaplayıcı. Veritabanına erişmez. */
(function(){
"use strict";
const buildings=window.AHIR_BUILDINGS||[];
const $=id=>document.getElementById(id);
const names={wood:"🪵 Odun",clay:"🧱 Tuğla",iron:"⛏ Demir",crop:"🌾 Tahıl"};
const int=n=>Math.round(Number(n)||0).toLocaleString("tr-TR");
const fmt=s=>{s=Math.max(0,Math.round(s||0));const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),ss=s%60;return(d?d+"g ":"")+String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(ss).padStart(2,"0")};
const round5=n=>Math.round(n/5)*5;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=id=>buildings.find(b=>b.id===id);
const defaults={building:"mainbuilding",speed:1,mb:1,from:0,to:5,ad:false,group:"Tümü",q:""};
const url=new URL(window.location.href),search=url.searchParams;
let state={...defaults,building:byId(search.get("b"))?search.get("b"):defaults.building,
 speed:[1,2,3,5,10].includes(+search.get("s"))?+search.get("s"):1,
 mb:Math.max(1,Math.min(20,+search.get("mb")||1)),
 from:Math.max(0,+search.get("from")||0),
 to:Math.max(1,+search.get("to")||5),
 ad:search.get("ad")==="1",group:"Tümü",q:""};
function setup(){
 const root=$("build-calculator");if(!root)return;
 root.innerHTML='<section class="build-hero"><div><div class="build-kicker">TRAVIAN BİNA REHBERİ</div><h2>Binalar ve geliştirme maliyetleri</h2><p>Binanı seç, seviyeleri karşılaştır; kaynak, nüfus, kültür puanı ve tahmini inşa süresini hesapla.</p></div><div class="build-hero-icon">🏰</div></section>'+
 '<div class="build-settings"><label>Sunucu hızı <select id="b-speed">'+[1,2,3,5,10].map(x=>'<option value="'+x+'">'+x+'x</option>').join('')+'</select></label>'+
 '<label>Merkez Binası seviyesi <select id="b-mb">'+Array.from({length:20},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+'</option>').join('')+'</select></label>'+
 '<label class="check-label"><input id="b-ad" type="checkbox"> Reklamla %25 inşa süresi indirimi</label>'+
 '<div class="build-disclaimer"><strong>Veri notu:</strong> Maliyet/KP değerleri tarihi T4 veri modeline dayalıdır; sunucuya, sürüme ve özel etkinliklere göre farklılık olabilir. İnşa süreleri tahminidir, oyundaki süreyi kontrol et.</div></div>'+
 '<div class="build-layout"><aside class="build-picker"><div class="build-picker-header"><strong>🏗 Bina seçimi</strong><span id="b-count"></span></div>'+
 '<input id="b-search" placeholder="Bina ara..." aria-label="Bina ara">'+
 '<div class="build-chips" id="b-groups"></div><div id="b-list" class="build-list"></div></aside>'+
 '<div class="build-detail"><div class="build-title"><div><span id="b-group" class="build-category"></span><h2 id="b-title"></h2><p id="b-desc"></p></div><div class="build-icon">🏛️</div></div>'+
 '<div class="build-level-controls"><label>Mevcut seviye <select id="b-from"></select></label><span class="build-arrow">→</span>'+
 '<label>Hedef seviye <select id="b-to"></select></label><span class="build-level-hint">Tablodaki seviyelere de tıklayabilirsin.</span></div>'+
 '<div class="build-summary" id="b-summary"></div><div id="b-req" class="build-req"></div>'+
 '<div class="build-table-scroll"><table class="build-table"><thead><tr><th>Seviye</th><th>🪵 Odun</th><th>🧱 Tuğla</th><th>⛏ Demir</th><th>🌾 Tahıl</th>'+
 '<th>Toplam</th><th>👥 Nüfus</th><th>🏛 KP/gün</th><th>⏱ İnşa süresi</th></tr></thead><tbody id="b-rows"></tbody><tfoot id="b-totals"></tfoot></table></div>'+
 '<div class="build-hints"><span class="dot-green"></span> Seçili yükseltmelerin toplamı hesaplanır. Mevcut seviyen 5 ise 6–12 arası yükseltmeler maliyete dahildir.</div>'+
 '<div class="build-actions"><button id="b-share" class="button primary">🔗 Hesap bağlantısını kopyala</button><span id="b-share-msg" role="status"></span></div></div></div>';
 $("b-speed").value=state.speed;$("b-mb").value=state.mb;$("b-ad").checked=state.ad;
 for(const [id,key,parser] of [["b-speed","speed",Number],["b-mb","mb",Number]]){
   $(id).addEventListener("change",e=>{state[key]=parser(e.target.value);render();});
 }
 $("b-ad").addEventListener("change",e=>{state.ad=e.target.checked;render();});
 $("b-search").addEventListener("input",e=>{state.q=e.target.value;drawList();});
 $("b-from").addEventListener("change",e=>{state._rowStartChosen=false;state.from=+e.target.value;state.to=Math.max(state.to,state.from+1);render();});
 $("b-to").addEventListener("change",e=>{state._rowStartChosen=false;state.to=+e.target.value;if(state.to<=state.from)state.from=state.to-1;render();});
 $("b-rows").addEventListener("click",e=>{
    const row=e.target.closest("tr[data-level]");if(!row)return;
    const lvl=+row.dataset.level;
    // İlk tık mevcut seviye, ikinci tık hedef seviye (5 ardından 12 = 5 → 12).
    if(!state._rowStartChosen){
      state.from=Math.min(lvl,b.max-1);
      state.to=Math.min(b.max,state.from+1);
      state._rowStartChosen=true;
    }else{
      if(lvl<=state.from){state.from=Math.max(0,lvl-1);state.to=lvl;}
      else state.to=lvl;
      state._rowStartChosen=false;
    }
    render();
 });
 $("b-share").addEventListener("click",async()=>{
    const href=location.href;const msg=$("b-share-msg");
    try{await navigator.clipboard.writeText(href);msg.textContent="Bağlantı kopyalandı ✓";}
    catch(e){msg.textContent="Adres çubuğundaki bağlantıyı kopyalayabilirsin.";}
 });
 render();
}
function rowData(b,lvl){
 let costs=b.base.map(x=>Math.max(0,round5(x*Math.pow(b.k,lvl-1))));
 if(b.id==="worldwonder")costs=costs.map((x,i)=>lvl===100?(i===3?193630:1000000):Math.min(1000000,x));
 const pop=lvl===1?b.pop:Math.round((5*b.pop+lvl-1)/10);
 const cp=b.cp===0?0:Math.round(b.cp*Math.pow(1.2,lvl));
 let t=Math.max(0,b.a*Math.pow(b.tk,lvl-1)-b.tb);
 let mb=state.mb;
 if(b.id==="mainbuilding") mb=Math.max(state.mb,lvl-1);
 const mbFactor=Math.pow(.964,mb-1);
 t=t/state.speed*mbFactor*(state.ad?.75:1);
 return{lvl,costs,total:costs.reduce((a,v)=>a+v,0),pop,cp,seconds:t};
}
function render(){
 const b=byId(state.building)||buildings[0];
 state.from=Math.min(Math.max(0,Math.floor(state.from)),b.max-1);
 state.to=Math.min(Math.max(state.from+1,Math.floor(state.to)),b.max);
 $("b-group").textContent=b.group;$("b-title").textContent=b.name;$("b-desc").textContent=b.desc;
 $("b-req").innerHTML='<strong>Ön koşullar:</strong> '+esc(b.req||"Özel koşul bulunmuyor.")+
 '<span class="build-subtle"> · Seviye başına artan nüfus, toplam nüfus yükü olarak gösterilir. KP/gün sütunu seviyedeki toplam kültür puanıdır.</span>';
 $("b-from").innerHTML=Array.from({length:b.max},(_,i)=>'<option value="'+i+'">'+i+'</option>').join('');
 $("b-to").innerHTML=Array.from({length:b.max},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+'</option>').join('');
 $("b-from").value=state.from;$("b-to").value=state.to;
 const all=Array.from({length:b.max},(_,i)=>rowData(b,i+1));
 const selected=all.filter(r=>r.lvl>state.from&&r.lvl<=state.to);
 const sums=[0,0,0,0];let sec=0,pop=0;
 for(const r of selected){r.costs.forEach((v,i)=>sums[i]+=v);sec+=r.seconds;pop+=r.pop;}
 const total=sums.reduce((a,v)=>a+v,0);
 const baseCp=state.from===0?0:rowData(b,state.from).cp;
 const cpDiff=rowData(b,state.to).cp-baseCp;
 const summary=[
  ["🪵","Odun",sums[0]],["🧱","Tuğla",sums[1]],["⛏","Demir",sums[2]],["🌾","Tahıl",sums[3]],
  ["📦","Toplam kaynak",total],["⏱","İnşa süresi",fmt(sec)],["🏛","KP/gün artışı",cpDiff>=0?"+"+int(cpDiff):int(cpDiff)],["👥","Ek nüfus",pop>=0?"+"+int(pop):int(pop)]
 ];
 $("b-summary").innerHTML=summary.map(([ic,title,val],idx)=>'<div class="build-stat'+(idx===4?" primary-stat":"")+'"><span>'+ic+' '+title+'</span><strong>'+ (typeof val==="number"?int(val):esc(val))+'</strong></div>').join('');
 $("b-rows").innerHTML=all.map(r=>'<tr class="'+(r.lvl>state.from&&r.lvl<=state.to?"selected ":"")+
 (r.lvl===state.to?"target ":"")+'" data-level="'+r.lvl+'" title="Bu seviyeyi hesaplamak için tıkla"><td><strong>'+r.lvl+'</strong></td>'+
 r.costs.map(v=>'<td>'+int(v)+'</td>').join('')+'<td class="row-total">'+int(r.total)+'</td><td>'+int(r.pop)+'</td>'+
 '<td>'+int(r.cp)+'</td><td>'+fmt(r.seconds)+'</td></tr>').join('');
 $("b-totals").innerHTML='<tr><th>Seçim '+state.from+' → '+state.to+'</th>'+sums.map(v=>'<th>'+int(v)+'</th>').join('')+
 '<th>'+int(total)+'</th><th>+'+int(pop)+'</th><th>+'+int(cpDiff)+'</th><th>'+fmt(sec)+'</th></tr>';
 const qp=new URLSearchParams({b:state.building,s:String(state.speed),mb:String(state.mb),from:String(state.from),to:String(state.to),ad:state.ad?"1":"0"});
 history.replaceState(null,"",location.pathname+"?"+qp.toString());
 drawList(false);
}
function drawList(skipGroups){
 const groups=["Tümü","Hammadde","Askeri","Altyapı"];
 if(!skipGroups)$("b-groups").innerHTML=groups.map(g=>'<button type="button" data-group="'+g+'" class="'+(state.group===g?'selected':'')+'">'+g+'</button>').join("");
 $("b-groups").querySelectorAll("button").forEach(el=>el.onclick=()=>{state.group=el.dataset.group;drawList();});
 const q=state.q.toLocaleLowerCase("tr-TR").trim();
 const filtered=buildings.filter(b=>(state.group==="Tümü"||b.group===state.group)&&(!q||b.name.toLocaleLowerCase("tr-TR").includes(q)));
 $("b-count").textContent=filtered.length+" bina";
 $("b-list").innerHTML=filtered.length?filtered.map(b=>'<button class="build-list-item '+(b.id===state.building?'active':'')+'" data-building="'+b.id+'"><span class="build-list-icon">'+(b.group==="Hammadde"?"🌾":b.group==="Askeri"?"⚔️":"🏛️")+'</span><span>'+esc(b.name)+'</span><span class="build-list-max">'+b.max+'</span></button>').join(""):'<div class="build-empty">Aramana uygun bina bulunamadı.</div>';
 $("b-list").querySelectorAll("[data-building]").forEach(el=>el.onclick=()=>{state.building=el.dataset.building;state._rowStartChosen=false;state.from=0;state.to=Math.min(5,byId(state.building).max);render();});
}
setup();
})();
