/* AhirTools Binalar: compact three-column directory + focused calculation dialog.
   Numeric model deliberately unchanged; no Supabase reads/writes. */
(function(){
"use strict";
const buildings=window.AHIR_BUILDINGS||[];
const $=id=>document.getElementById(id);
const byId=id=>buildings.find(b=>b.id===id);
const int=n=>Math.round(Number(n)||0).toLocaleString("tr-TR");
const fmt=s=>{s=Math.max(0,Math.round(s||0));const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),ss=s%60;return(d?d+"g ":"")+String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(ss).padStart(2,"0")};
const round5=n=>Math.round(n/5)*5;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const q=new URL(location.href).searchParams;
const initialBuilding=byId(q.get("b"))?q.get("b"):null;
const speedChoices=[1,2,3,5,10];
const state={
 building:initialBuilding||"mainbuilding",
 opened:!!initialBuilding, speed:speedChoices.includes(Number(q.get("s")))?Number(q.get("s")):1,
 mb:Math.max(1,Math.min(20,Number(q.get("mb"))||1)),
 from:Math.max(0,Number(q.get("from"))||0),
 to:Math.max(1,Number(q.get("to"))||5),
 ad:q.get("ad")==="1",search:"",rowStage:0
};
const groups=["Hammadde","Askeri","Altyapı"];
const BUILDING_ORDER = {"Hammadde":["woodjack","claypit","ironmine","cropland","sawmill","brickyard","ironfoundry","grainmill","bakery","warehouse","greatwarehouse","granary","greatgranary","waterworks"],"Askeri":["barracks","stable","workshop","hospital","greatbarracks","greatstables","rallypoint","arena","academy","smithy","stonemason","wall","earthwall","palisade","makeshiftwall","stonewall","trapper","heromansion"],"Altyapı":["mainbuilding","marketplace","tradeoffice","townhall","embassy","cranny","treasury","residence","palace","commandcenter","brewery","horsepool","worldwonder"]};


const buildingIcons=window.AHIR_BUILDING_ICONS||{};
const buildingEffects=window.AHIR_BUILDING_EFFECTS||{};
const customBuildingArts = {"sawmill":"/portal/assets/building-art-v1/sawmill.webp","brickyard":"/portal/assets/building-art-v1/brickyard.webp","ironfoundry":"/portal/assets/building-art-v1/ironfoundry.webp","bakery":"/portal/assets/building-art-v1/bakery.webp","trapper":"/portal/assets/building-art-v1/trapper.webp","palisade":"/portal/assets/building-art-v1/palisade.webp","barracks":"/portal/assets/building-art-v1/barracks.webp","heromansion":"/portal/assets/building-art-v1/heromansion.webp","academy":"/portal/assets/building-art-v1/academy.webp","smithy":"/portal/assets/building-art-v1/smithy.webp","stable":"/portal/assets/building-art-v2/stable.webp","workshop":"/portal/assets/building-art-v2/workshop.webp","hospital":"/portal/assets/building-art-v2/hospital.webp","arena":"/portal/assets/building-art-v2/arena.webp","greatbarracks":"/portal/assets/building-art-v2/greatbarracks.webp","greatstables":"/portal/assets/building-art-v2/greatstables.webp","cranny":"/portal/assets/building-art-v2/cranny.webp","embassy":"/portal/assets/building-art-v2/embassy.webp","residence":"/portal/assets/building-art-v2/residence.webp","treasury":"/portal/assets/building-art-v2/treasury.webp"};
// New third-batch building artwork; one 10-tile optimized transparent WebP atlas.
const customAtlasIds=["townhall","tradeoffice","greatgranary","grainmill","mainbuilding","greatwarehouse","warehouse","marketplace","granary","rallypoint"];
function iconFromAtlas(id){
 const index=customAtlasIds.indexOf(id);
 return index<0?"":'<span class="bc-art-img bc-art-atlas" style="background-position-x:'+(index*100/9).toFixed(5)+'%" aria-hidden="true"></span>';
}
function buildingIcon(b){
 const fieldResource={woodjack:0,claypit:1,ironmine:2,cropland:3}[b.id];
 if(fieldResource!==undefined)return resourceIcon(fieldResource);
 const newerArt=iconFromAtlas(b.id);
 if(newerArt)return newerArt;
 const asset=customBuildingArts[b.id];
 if(asset)return '<img class="bc-art-img" src="'+asset+'" alt="" width="36" height="36" decoding="async" loading="lazy">';
 const url=buildingIcons[b.id];
 return url?'<img src="'+esc(url)+'" width="24" height="24" loading="lazy" alt="" aria-hidden="true">':'<span aria-hidden="true">🏗️</span>';
}
function requirementList(b){
 const names=buildings.map(x=>x.name).sort((a,z)=>z.length-a.length);
 return String(b.req||"").split(";").map(s=>s.trim()).filter(Boolean).map(part=>{
   const name=names.find(n=>part.toLocaleLowerCase("tr-TR").startsWith(n.toLocaleLowerCase("tr-TR")+" ") || part.toLocaleLowerCase("tr-TR")===n.toLocaleLowerCase("tr-TR"));
   const linked=name?buildings.find(x=>x.name===name):null;
   const blocked=/bulunmamalı|olmamalı/i.test(part);
   return{label:part,id:linked?.id||"",blocked};
 });
}
function requirementHtml(b){
 const reqs=requirementList(b);
 return '<span class="bc-req-title">Ön koşullar:</span> '+
   (reqs.length?reqs.map(x=>'<span class="bc-req-badge '+(x.blocked?'blocked':'')+'">'+esc(x.label)+'</span>').join(" "):
    '<span class="bc-req-none">Yok</span>');
}
function effectAt(b,lvl){
 const [kind,label]=buildingEffects[b.id]||["level","Bina seviyesi"];
 const production=[2,5,9,15,22,33,50,70,100,145,200,280,375,495,635,800,1000,1300,1600,2000,2450,3050,3750];
 let value;
 switch(kind){
 case "prod": value=int(Math.round(production[lvl]*1.4))+"/sa";break;
 case "percent5": value="+"+(5*lvl)+"%";break;
 case "percent10":value="+"+(10*lvl)+"%";break;
 case "percent1":value="+"+lvl+"%";break;
 case "negative1":value="-"+lvl+"%";break;
 case "capacity":value=int(Math.round((2120*Math.pow(1.2,lvl)-1320)/100)*100);break;
 case "greatcapacity":value=int(3*Math.round((2120*Math.pow(1.2,lvl)-1320)/100)*100);break;
 case "cranny":value=int(Math.round(Math.pow(129.17,lvl-1)/10)*10);break;
 case "train":value=Math.round(100*Math.pow(.9,lvl-1))+"%";break;
 case "hospital":value=(50*Math.pow(.9,lvl-1)).toFixed(1).replace(/\.0$/,"")+"%";break;
 case "mbtime":value=Math.round(100*Math.pow(.964,lvl-1))+"%";break;
 case "buildspeed":value=Math.round(100/Math.pow(.964,lvl-1))+"%";break;
 case "slots2":value=String(Number(lvl>=10)+Number(lvl>=20));break;
 case "slots3":value=String(Number(lvl>=10)+Number(lvl>=15)+Number(lvl>=20));break;
 case "traps":value=int(lvl>10?(lvl*lvl+19*lvl+20)/2:(lvl*lvl+21*lvl-2)/2);break;
 case "wallRoman":value="+"+((Math.pow(1.03,lvl)-1)*100).toFixed(1)+"%";break;
 case "wallGerman":value="+"+((Math.pow(1.02,lvl)-1)*100).toFixed(1)+"%";break;
 case "wallGaul":case "wallEgypt":value="+"+((Math.pow(1.025,lvl)-1)*100).toFixed(1)+"%";break;
 case "wallHun":value="+"+((Math.pow(1.015,lvl)-1)*100).toFixed(1)+"%";break;
 case "tribe":value="Kabileye göre";break;
 case "ww":case "level":value=String(lvl);break;
 default:value="—";
 }
 return{label,value};
}
function previewRequirements(id){
 const b=byId(id),preview=$("bc-prereq-preview");if(!preview)return;
 $("bc-columns").querySelectorAll(".bc-building").forEach(btn=>{
   btn.classList.remove("bc-needs","bc-excludes","bc-hovered");
 });
 if(!b){preview.innerHTML='Binaların üzerine gelerek gereken yapıları vurgulayabilirsin.';return;}
 const parts=requirementList(b);
 const ids=new Map(parts.filter(x=>x.id).map(x=>[x.id,x.blocked]));
 $("bc-columns").querySelectorAll(".bc-building").forEach(btn=>{
   if(btn.dataset.building===id)btn.classList.add("bc-hovered");
   if(ids.has(btn.dataset.building))btn.classList.add(ids.get(btn.dataset.building)?"bc-excludes":"bc-needs");
 });
 preview.innerHTML='<strong>'+esc(b.name)+'</strong> — '+requirementHtml(b)+
   '<span class="bc-prereq-hint"> Renkler şartı belirtir; köyündeki seviyeleri kontrol etmez.</span>';
}

const symbols={
 woodjack:"🌲",claypit:"🧱",ironmine:"⛏️",cropland:"🌾",sawmill:"🪚",brickyard:"🏭",
 ironfoundry:"🔥",grainmill:"🌾",bakery:"🥖",warehouse:"📦",granary:"🌽",greatwarehouse:"🏬",
 greatgranary:"🏬",waterworks:"💧",rallypoint:"⚔️",barracks:"🛡️",stable:"🐎",workshop:"🔧",
 academy:"📖",smithy:"⚒️",arena:"🏟️",greatbarracks:"🏯",greatstables:"🐴",heromansion:"🏰",
 hospital:"🏥",trapper:"🪤",wall:"🧱",earthwall:"🪨",palisade:"🪵",stonewall:"🧱",makeshiftwall:"🪵",
 mainbuilding:"🏛️",marketplace:"⚖️",embassy:"🤝",cranny:"🔐",townhall:"🏙️",residence:"🏡",
 palace:"👑",commandcenter:"🏯",treasury:"💎",tradeoffice:"🚚",stonemason:"🔨",
 brewery:"🍺",horsepool:"💧",worldwonder:"🏗️"
};
function options(items){return items.map(v=>'<option value="'+v+'">'+v+'</option>').join('');}
function toolbar(prefix){
 return '<div class="bc-options">'+
 '<label>Sunucu <select id="'+prefix+'-speed">'+speedChoices.map(v=>'<option value="'+v+'">T4.6 '+v+'x</option>').join("")+'</select></label>'+
 '<label>Merkez Binası <select id="'+prefix+'-mb">'+options(Array.from({length:20},(_,i)=>i+1))+'</select></label>'+
 '<label class="bc-check"><input id="'+prefix+'-ad" type="checkbox"><span>Reklam ile %25 daha kısa</span></label>'+
 '</div>';
}
const resourceFiles=["wood","clay","iron","crop"];
function resourceIcon(index){
 const name=resourceFiles[index];
 return name===undefined?"":'<img class="bc-resource-icon" src="/portal/assets/resources/'+name+'-v2.webp" alt="" aria-hidden="true" width="30" height="30">';
}
function setup(){
 const root=$("build-calculator");if(!root)return;
 root.innerHTML=
 '<section class="bc-bar"><div class="bc-intro"><strong>🏗️ Bina rehberi</strong><span>Bir binaya tıkla, tabloyu hemen aç. Seviye aralığını tablodan veya kutulardan seç.</span></div>'+
 toolbar("bc")+'</section>'+
 '<section class="bc-catalog"><div class="bc-catalog-head"><div><h2>Binalar</h2><span id="bc-count"></span></div>'+
 '<label class="bc-search"><span aria-hidden="true">⌕</span><input id="bc-search" type="search" placeholder="Bina ara..." aria-label="Bina ara" autocomplete="off"></label></div>'+
 '<div id="bc-prereq-preview" class="bc-prereq-preview">Binaların üzerine gelerek gereken yapıları vurgulayabilirsin.</div>'+
 '<div id="bc-columns" class="bc-columns"></div></section>'+
 '<div class="bc-data-note">ⓘ Kaynak, KP ve bina etkileri tarihî T4 oyun modeline dayanır. Sunucunun güncel oyun sürümüyle karşılaştır. İkonlar: <a href="https://game-icons.net/" target="_blank" rel="noopener noreferrer">Game-icons.net (Lorc / Delapouite, CC BY 3.0)</a>.</div>'+
 '<div id="bc-overlay" class="bc-overlay" hidden>'+
 '<div id="bc-dialog" class="bc-dialog" role="dialog" aria-modal="true" aria-labelledby="bc-title" tabindex="-1">'+
 '<header class="bc-dialog-head"><div class="bc-head-text"><span class="bc-category" id="bc-category"></span>'+
 '<div class="bc-head-title"><span id="bc-icon" class="bc-head-icon"></span><h2 id="bc-title"></h2></div><p id="bc-desc"></p>'+
 '<div id="bc-requirements" class="bc-requirements"></div></div>'+
 '<div class="bc-head-actions"><button id="bc-share" type="button" class="bc-share" title="Bu bina ve ayarlarının bağlantısını kopyala">🔗 Bağlantıyı kopyala</button>'+
 '<button id="bc-close" type="button" class="bc-close" aria-label="Hesaplayıcıyı kapat">✕</button></div></header>'+
 '<div class="bc-dialog-inner"><div class="bc-dialog-controls">'+
 '<div class="bc-levels"><label>Mevcut <select id="bc-from"></select></label><span class="bc-arrow">→</span>'+
 '<label>Hedef <select id="bc-to"></select></label></div>'+
 toolbar("bm")+'</div>'+
 '<div class="bc-stage"><span id="bc-stage" aria-live="polite">Tablodan önce mevcut, sonra hedef seviyeye tıklayabilirsin.</span>'+
 '<span class="bc-effect-heading" id="bc-effect-heading"></span></div>'+
 '<div class="bc-table-scroll" id="bc-scroll"><table class="bc-table"><thead><tr>'+
 '<th>Seviye</th><th>'+resourceIcon(0)+' Odun</th><th>'+resourceIcon(1)+' Tuğla</th><th>'+resourceIcon(2)+' Demir</th><th>'+resourceIcon(3)+' Tahıl</th>'+
 '<th>Toplam</th><th>👥 Nüfus</th><th>🏛 KP/gün</th><th title="Binanın bu seviyede sağladığı yarar">✨ Etki</th><th>⏱ İnşa</th>'+
 '</tr></thead><tbody id="bc-rows"></tbody><tfoot id="bc-totals"></tfoot></table></div>'+
 '<div class="bc-results"><div class="bc-results-top"><span><strong id="bc-range"></strong> yükseltme toplamı</span></div>'+
 '<div class="bc-mini-metrics" id="bc-summary"></div></div>'+
 '<div class="bc-dialog-footer"><span id="bc-message" role="status"></span>'+
 '<span>Hesap özeti: seçilen yükseltme seviyeleri dahil edilir; mevcut seviye dahil edilmez.</span></div>'+
 '</div></div></div>';
 bindToolbar("bc");bindToolbar("bm");
 $("bc-search").addEventListener("input",e=>{state.search=e.target.value;drawCatalog();});
 $("bc-close").addEventListener("click",close);
 $("bc-overlay").addEventListener("click",e=>{if(e.target===$("bc-overlay"))close();});
 document.addEventListener("keydown",e=>{
   if(!state.opened)return;
   if(e.key==="Escape"){close();return;}
   if(e.key==="Tab"){
     const focusable=Array.from($("bc-dialog").querySelectorAll('button:not([disabled]),select:not([disabled]),input:not([disabled]),[tabindex="0"]'))
       .filter(el=>el.getClientRects().length);
     if(!focusable.length)return;
     const first=focusable[0],last=focusable[focusable.length-1];
     if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
     else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
   }
 });
 $("bc-from").addEventListener("change",e=>{
   state.rowStage=0;state.from=Number(e.target.value);
   if(state.from>=state.to)state.to=state.from+1;
   render();
 });
 $("bc-to").addEventListener("change",e=>{
   state.rowStage=0;state.to=Number(e.target.value);
   if(state.to<=state.from)state.from=state.to-1;
   render();
 });
 function rowSelect(e){
   const row=e.target.closest("tr[data-level]");if(!row)return;
   const level=Number(row.dataset.level);
   const b=byId(state.building);
   if(state.rowStage===0){
     state.from=Math.min(level,b.max-1);
     state.to=Math.min(b.max,state.from+1);
     state.rowStage=1;
   }else if(level>state.from){
     state.to=level;state.rowStage=0;
   }else{
     state.from=Math.min(level,b.max-1);
     state.to=Math.min(b.max,state.from+1);
     state.rowStage=1;
   }
   render();
 }
 $("bc-rows").addEventListener("click",rowSelect);
 $("bc-rows").addEventListener("keydown",e=>{
   if(e.key==="Enter"||e.key===" "){e.preventDefault();rowSelect(e);}
 });
 $("bc-share").addEventListener("click",async()=>{
   try{await navigator.clipboard.writeText(location.href);$("bc-message").textContent="Bağlantı kopyalandı ✓";}
   catch(err){$("bc-message").textContent="Bağlantıyı adres çubuğundan kopyalayabilirsin.";}
 });
 syncToolbar();drawCatalog();
 if(state.opened)openBuilding(state.building,true);
}
function bindToolbar(prefix){
 $(prefix+"-speed").addEventListener("change",e=>{
   state.speed=Number(e.target.value);syncToolbar();if(state.opened)render();else syncUrl();
 });
 $(prefix+"-mb").addEventListener("change",e=>{
   state.mb=Number(e.target.value);syncToolbar();if(state.opened)render();else syncUrl();
 });
 $(prefix+"-ad").addEventListener("change",e=>{
   state.ad=e.target.checked;syncToolbar();if(state.opened)render();else syncUrl();
 });
}
function syncToolbar(){
 for(const prefix of ["bc","bm"]){
   $(prefix+"-speed").value=String(state.speed);
   $(prefix+"-mb").value=String(state.mb);
   $(prefix+"-ad").checked=state.ad;
 }
}
function drawCatalog(){
 const term=state.search.trim().toLocaleLowerCase("tr-TR");
 let count=0;
 const html=groups.map(group=>{
   const list=buildings.filter(b=>b.group===group&&
      (!term||b.name.toLocaleLowerCase("tr-TR").includes(term))).sort((a,b)=>BUILDING_ORDER[group].indexOf(a.id)-BUILDING_ORDER[group].indexOf(b.id));
   count+=list.length;
   return '<div class="bc-group"><div class="bc-group-head"><h3>'+group+'</h3><span>'+list.length+' bina</span></div>'+
      '<div class="bc-group-list">'+(list.length?list.map(b=>
         '<button type="button" class="bc-building" data-building="'+esc(b.id)+'" title="'+esc(b.name)+' — Seviye tablosunu aç">'+
         '<span class="bc-building-icon" aria-hidden="true">'+buildingIcon(b)+'</span><span>'+esc(b.name)+'</span>'+
         '<span class="bc-open-icon" aria-hidden="true">↗</span></button>'
       ).join(""):'<div class="bc-empty">Eşleşen bina yok.</div>')+'</div></div>';
 }).join("");
 $("bc-count").textContent=term?count+" sonuç":buildings.length+" bina • 3 kategori";
 $("bc-columns").innerHTML=html;
 previewRequirements(null);
 $("bc-columns").querySelectorAll("[data-building]").forEach(btn=>{
   btn.addEventListener("click",()=>openBuilding(btn.dataset.building));
   btn.addEventListener("mouseenter",()=>previewRequirements(btn.dataset.building));
   btn.addEventListener("focus",()=>previewRequirements(btn.dataset.building));
 });
 $("bc-columns").addEventListener("mouseleave",()=>previewRequirements(null));
}
function openBuilding(id,fromLink){
 const b=byId(id);if(!b)return;
 state.building=id;state.opened=true;state.rowStage=0;
 // Bina değiştiğinde önceki seviye aralığını koru; yalnızca yeni binanın azami seviyesine uyarla.
 state.from=Math.min(Math.max(0,Math.floor(state.from)),b.max-1);
 state.to=Math.min(Math.max(state.from+1,Math.floor(state.to)),b.max);
 $("bc-overlay").hidden=false;
 document.body.classList.add("bc-locked");
 $("bc-category").textContent=b.group;
 $("bc-title").textContent=b.name;
 $("bc-desc").textContent=b.desc;
 $("bc-icon").innerHTML=buildingIcon(b);
 $("bc-requirements").innerHTML=requirementHtml(b);
 $("bc-message").textContent="";
 render();
 $("bc-close").focus();
}
function close(){
 state.opened=false;state.rowStage=0;
 $("bc-overlay").hidden=true;document.body.classList.remove("bc-locked");
 syncUrl();
 const prior=$("bc-columns").querySelector('[data-building="'+state.building+'"]');
 if(prior)prior.focus();
}
function syncUrl(){
 const p=new URLSearchParams();
 if(state.opened){
   p.set("b",state.building);
   p.set("from",String(state.from));p.set("to",String(state.to));
 }
 p.set("s",String(state.speed));p.set("mb",String(state.mb));p.set("ad",state.ad?"1":"0");
 history.replaceState(null,"",location.pathname+"?"+p.toString());
}
function rowData(b,level){
 let costs=b.base.map(n=>Math.max(0,round5(n*Math.pow(b.k,level-1))));
 if(b.id==="worldwonder")costs=costs.map((n,i)=>level===100?(i===3?193630:1000000):Math.min(1000000,n));
 const pop=level===1?b.pop:Math.round((5*b.pop+level-1)/10);
 const cp=b.cp===0?0:Math.round(b.cp*Math.pow(1.2,level));
 const t=Math.max(0,b.a*Math.pow(b.tk,level-1)-b.tb);
 const mb=b.id==="mainbuilding"?Math.max(state.mb,level-1):state.mb;
 const seconds=t/state.speed*Math.pow(.964,mb-1)*(state.ad?.75:1);
 return{level,costs,total:costs.reduce((a,v)=>a+v,0),pop,cp,seconds};
}
function render(){
 const b=byId(state.building);if(!b)return;
 state.from=Math.min(Math.max(0,Math.floor(state.from)),b.max-1);
 state.to=Math.min(Math.max(state.from+1,Math.floor(state.to)),b.max);
 $("bc-from").innerHTML=Array.from({length:b.max},(_,i)=>'<option value="'+i+'">'+i+'</option>').join("");
 $("bc-to").innerHTML=Array.from({length:b.max},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+'</option>').join("");
 $("bc-from").value=state.from;$("bc-to").value=state.to;
 $("bc-stage").innerHTML=state.rowStage===1?
   '<strong>Mevcut seviye '+state.from+' seçildi.</strong> Şimdi tablodan hedef seviyeye tıkla.' :
   'Tablodan <strong>önce mevcut, sonra hedef seviyeye</strong> tıkla (örnek: <strong>0 → 5</strong> veya <strong>5 → 12</strong>).';
 const all=Array.from({length:b.max},(_,i)=>rowData(b,i+1));
 const selected=all.filter(r=>r.level>state.from&&r.level<=state.to);
 const sums=[0,0,0,0];let seconds=0,pop=0;
 for(const r of selected){r.costs.forEach((v,i)=>{sums[i]+=v;});seconds+=r.seconds;pop+=r.pop;}
 const total=sums.reduce((a,v)=>a+v,0);
 const startCp=state.from===0?0:rowData(b,state.from).cp;
 const cpDiff=rowData(b,state.to).cp-startCp;
 $("bc-range").textContent=state.from+" → "+state.to;
 $("bc-effect-heading").textContent="✨ Seviye etkisi: "+effectAt(b,Math.min(1,b.max)).label;
 const items=[
   [resourceIcon(0),"Odun",int(sums[0])],[resourceIcon(1),"Tuğla",int(sums[1])],
   [resourceIcon(2),"Demir",int(sums[2])],[resourceIcon(3),"Tahıl",int(sums[3])],
   ["📦","Toplam",int(total)],["⏱","Süre",fmt(seconds)],
   ["🏛","KP/gün artışı","+"+int(cpDiff)],["👥","Ek nüfus","+"+int(pop)]
 ];
 $("bc-summary").innerHTML=items.map(([ico,label,value],i)=>'<div class="bc-mini'+(i===4?" emphasized":"")+'">'+
   '<span>'+ico+' '+label+'</span><strong>'+esc(value)+'</strong></div>').join("");
 // 0. seviye, bina henüz kurulmamış anlamına gelir. Tablodan 0 → 5 seçilebilir.
 const unbuiltRow='<tr data-level="0" tabindex="0" role="button" aria-label="Seviye 0, bina kurulmamış" class="bc-zero-row">'+
   '<td><strong>0</strong></td><td colspan="9">Bina henüz kurulmamış — başlangıç seviyesi olarak seç</td></tr>';
 $("bc-rows").innerHTML=unbuiltRow+all.map(r=>{
   const chosen=r.level>state.from&&r.level<=state.to;
   const classes=[chosen?"selected":"",r.level===state.to?"target":""].join(" ");
   return '<tr data-level="'+r.level+'" tabindex="0" role="button" aria-label="Seviye '+r.level+' seç" class="'+classes+'">'+
     '<td><strong>'+r.level+'</strong></td>'+
     r.costs.map(n=>'<td>'+int(n)+'</td>').join("")+
     '<td class="bc-row-total">'+int(r.total)+'</td><td>'+int(r.pop)+'</td><td>'+int(r.cp)+'</td>'+
 '<td class="bc-row-effect">'+esc(effectAt(b,r.level).value)+'</td><td>'+fmt(r.seconds)+'</td></tr>';
 }).join("");
 $("bc-totals").innerHTML='<tr><th>'+state.from+' → '+state.to+'</th>'+
   sums.map(n=>'<th>'+int(n)+'</th>').join("")+
   '<th>'+int(total)+'</th><th>+'+int(pop)+'</th><th>+'+int(cpDiff)+'</th><th title="Bina etkileri seviyeye göre gösterilir">—</th><th>'+fmt(seconds)+'</th></tr>';
 syncUrl();
}
setup();
})();
