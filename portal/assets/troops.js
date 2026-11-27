/* AhirTools • T4.6 troop reference/calculator. No database connections. */
(function(){
"use strict";
const dataset=window.AHIR_TROOPS;
const root=document.getElementById("troops-calculator");
if(!root||!dataset)return;
const tribes=dataset.tribes;
const $=id=>document.getElementById(id);
const nf=new Intl.NumberFormat("tr-TR");
const n=v=>nf.format(Math.round(v||0));
const speedText=v=>Number(v||0).toLocaleString("tr-TR",{maximumFractionDigits:1});
const fixed=v=>Number(v||0).toLocaleString("tr-TR",{minimumFractionDigits:1,maximumFractionDigits:1});
const esc=x=>String(x==null?"":x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Familiar, minimal unit silhouettes in their original tribe-specific colours.
// The 10-column × 9-row atlas follows the order of units in troops-data.js.
const unitIconTribes=["romans","teutons","gauls","nature","natars","egyptians","huns","spartans","vikings"];
function unitIconHTML(u){
 const tribeId=u.id.replace(/-\d+$/,"");
 const unitIndex=Number(u.id.match(/-(\d+)$/)?.[1]);
 const row=unitIconTribes.indexOf(tribeId);
 if(row<0||!Number.isInteger(unitIndex)||unitIndex<0||unitIndex>9)return '<span class="tc-unit-icon" aria-hidden="true">⚔️</span>';
 if(tribeId!=="natars"){
   // Individually cropped icon: no neighbouring sprite pixels can appear.
   // The Cermen icons now use the correct troop artwork; refresh only those cached images.
   const iconVersion=tribeId==="teutons"?"?v=correct-teutons-v4":"";
   return '<img class="tc-unit-icon tc-unit-image" src="/portal/assets/troop-icons-v2/'+tribeId+'-'+unitIndex+'.webp'+iconVersion+'" width="34" height="34" alt="" aria-hidden="true" draggable="false">';
 }
 // Keep Natars on their already-correct original icon atlas.
 const x=(unitIndex*100/9).toFixed(5);
 const y=(row*100/8).toFixed(5);
 return '<span class="tc-unit-icon tc-unit-pixel tc-unit-natar" style="background-position:'+x+'% '+y+'%" aria-hidden="true"></span>';
}
const typeNames={infantry:"Piyade",cavalry:"Süvari",scout:"Casus",ram:"Koçbaşı",catapult:"Mancınık",chief:"Reis / Yönetici",settler:"Göçmen"};
const speedFactor={1:1,2:2,3:2,5:2,10:4};
const qs=new URL(location.href).searchParams;
function allowedNum(qname,choices,fallback){let v=Number(qs.get(qname));return choices.includes(v)?v:fallback;}
const levels=Array.from({length:21},(_,i)=>i);
const state={
 tribe:tribes.some(t=>t.id===qs.get("tribe"))?qs.get("tribe"):"gauls",
 speed:allowedNum("s",[1,2,3,5,10],1),
 training:allowedNum("train",levels.slice(1),7),
 smithy:allowedNum("smithy",levels,0),
 helmInf:allowedNum("hi",[0,10,15,20],0),
 helmCav:allowedNum("hc",[0,10,15,20],0),
 allianceTrain:allowedNum("at",[0,2,4,6,8,10],0),
 allianceMetal:allowedNum("am",[0,2,4,6,8,10],0),
 trainer:allowedNum("art",[1,.75,.5],1),
 titan:allowedNum("titan",[1,1.5,2],1),
 trough:allowedNum("hdt",levels,0),
 selected:null
};
state.selected=(tribes.find(t=>t.id===state.tribe).units.some(u=>u.id===qs.get("unit"))?qs.get("unit"):tribes.find(t=>t.id===state.tribe).units[0].id);
function tribe(){return tribes.find(x=>x.id===state.tribe)||tribes[0];}
function chosen(){return tribe().units.find(x=>x.id===state.selected)||tribe().units[0];}
function selectOpts(items,value){return items.map(([v,label])=>'<option value="'+esc(v)+'"'+(String(v)===String(value)?" selected":"")+'>'+esc(label)+'</option>').join("")}
function selectCard(label,key,values,footnote){
 return '<label class="tc-control"><span>'+label+'</span><select data-key="'+key+'" aria-label="'+esc(label)+'">'+selectOpts(values,state[key])+'</select>'+(footnote?'<small>'+footnote+'</small>':'')+'</label>';
}
function mkOptions(values,suffix){return values.map(v=>[v, v+(suffix||"")]);}
function timeFormat(sec){
 if(sec==null||!Number.isFinite(sec))return "—";
 let s=Math.max(0,Math.round(sec));
 const h=Math.floor(s/3600),m=Math.floor(s%3600/60),z=s%60;
 return (h>=24?Math.floor(h/24)+"g ":"")+String(h%24).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(z).padStart(2,"0");
}
function smithyPoints(stat,upkeep,level){
 if(stat==null)return null;
 return Number(stat)+(Number(stat)+300*Number(upkeep)/7)*(Math.pow(1.007,level)-1);
}
function smithyEligible(unit){
 return unit.trainable && unit.type!=="chief" && unit.type!=="settler";
}
function combat(unit,level=state.smithy){
 const eligible=smithyEligible(unit);
 const multiplier=unit.trainable?1+state.allianceMetal/100:1;
 const actualLevel=eligible?level:0;
 return {a:smithyPoints(unit.a,unit.u,actualLevel)*multiplier,
         di:smithyPoints(unit.di,unit.u,actualLevel)*multiplier,
         dc:smithyPoints(unit.dc,unit.u,actualLevel)*multiplier};
}
function trainingTime(unit){
 if(!unit.trainable||!Number.isFinite(unit.t)||unit.t<=0)return null;
 // T4.6: base training time at building L1, each next building level reduces 10%.
 let time=unit.t*Math.pow(.9,state.training-1)/state.speed;
 const isP=unit.building==="barracks",isC=unit.building==="stable";
 if(isP)time*=1-state.helmInf/100;
 if(isC)time*=1-state.helmCav/100;
 // Recruitment and training artefacts apply to troop production, including expansion units.
 time*=1-state.allianceTrain/100;
 time*=state.trainer;
 if(isC&&unit.id.startsWith("romans-"))time*=1-state.trough/100;
 return time;
}
function unitCost(unit){return unit.trainable&&Array.isArray(unit.c)?unit.c:null;}
function totalCost(unit){const c=unitCost(unit);return c?c.reduce((s,v)=>s+v,0):(unit.totalKnown||null)}
// Titan boots multiply movement speed at every distance. NPC units cannot use player artefacts.
function movement(unit){return unit.v*speedFactor[state.speed]*(unit.trainable?state.titan:1)}
function upkeep(unit){
 const threshold={"romans-3":10,"romans-4":15,"romans-5":20}[unit.id];
 return unit.u-(threshold&&state.trough>=threshold?1:0);
}
function trainingType(unit){
 if(unit.building==="residence")return tribe().id==="huns"?"Köşk / Saray / Komuta Merkezi":"Köşk / Saray";
 return {barracks:"Kışla",stable:"Ahır",workshop:"Tamirhane"}[unit.building]||"—";
}
function requirementsText(unit){
 if(!unit.trainable)return "Eğitilemez";
 if(!unit.requirements)return "Araştırma gereksinimleri doğrulanmadı";
 const names={academy:"Akademi",smithy:"Dökümhane",stable:"Ahır",barracks:"Kışla",workshop:"Tamirhane",main:"Merkez Bina",rally:"Askerî Üs",expansion:trainingType(unit)};
 const items=Object.entries(unit.requirements).map(([k,v])=>(names[k]||k)+" "+v);
 if(unit.type==="chief")items.push(trainingType(unit)+" 10 ve boş genişleme yuvası");
 if(unit.type==="settler")items.push("Boş genişleme yuvası");
 return items.join(" · ")||"Akademi araştırması gerekmez";
}
function researchText(unit){
 if(!unit.trainable)return "—";
 if(unit.researchTime===0)return "Araştırma gerekmez";
 if(!Number.isFinite(unit.researchTime))return "Doğrulanmadı";
 return timeFormat(unit.researchTime/state.speed);
}
function buildShell(){
 root.innerHTML='<div class="tc-topline"><span class="tc-version">⚔ T4.6 Asker İstatistikleri</span>'+
 '<label class="tc-speed-select"><span>Sunucu</span><select id="tc-speed" data-key="speed" aria-label="Sunucu hızı"></select></label></div>'+
 '<div class="tc-tribe-tabs" id="tc-tribes" role="group" aria-label="Kabile seçimi"></div>'+
 '<div class="tc-table-wrap"><table class="tc-table"><thead><tr>'+
 '<th>Birim / Tür</th><th title="Demirci ve metalürji bonuslu saldırı gücü">⚔ Saldırı</th>'+
 '<th title="Piyadeye karşı savunma">🛡 Piyade</th><th title="Süvariye karşı savunma">🛡 Süvari</th>'+
 '<th title="Sunucu hızı ve Titan Çizmesi etkisiyle hareket hızı, alan/saat">👟 Hız</th><th title="Birimin taşıma kapasitesi">🎒 Taşıma</th>'+
 '<th>🪵 Odun</th><th>🧱 Tuğla</th><th>⛏ Demir</th><th>🌾 Tahıl</th>'+
 '<th>📦 Toplam</th><th title="Saatlik tahıl tüketimi">🌾/sa</th><th title="Kayıtlı eğitim bonuslarına göre eğitim süresi">⏱ Eğitim</th>'+
 '</tr></thead><tbody id="tc-rows"></tbody></table></div>'+
 '<section class="tc-control-sections" aria-label="Asker hesaplama ayarları">'+
 '<div class="tc-control-group"><div class="tc-control-title">⏱ Asker Eğitim Hızı</div><div class="tc-control-items" id="tc-training-controls"></div></div>'+
 '<div class="tc-control-group"><div class="tc-control-title">🛡 Demirci ve Zırh</div><div class="tc-control-items" id="tc-armor-controls"></div></div>'+
 '<div class="tc-control-group"><div class="tc-control-title">⚡ Tılsım Etkileri</div><div class="tc-control-items" id="tc-artifact-controls"></div></div>'+
 '</section>'+
 '<section class="tc-detail"><div class="tc-detail-top"><div><span class="tc-eyebrow">DEMİRCİ GELİŞTİRMELERİ</span>'+
 '<h3 id="tc-selected-title"></h3><p id="tc-selected-note"></p></div>'+
 '<div class="tc-selected-stats" id="tc-selected-stats"></div></div>'+
 '<div class="tc-smithy-wrap"><table class="tc-smithy-table"><thead><tr><th>Demirci seviyesi</th>'+
 '<th>⚔ Saldırı</th><th>🛡 Piyade savunması</th><th>🛡 Süvari savunması</th><th>Artış / Durum</th></tr></thead>'+
 '<tbody id="tc-smithy-rows"></tbody></table></div>'+
 '<div class="tc-source-note"><span>ℹ️ Demirci tablosu savaş değerlerini gösterir; demirci araştırmasının kaynak/süre maliyetleri bu sürümde hesaplanmaz.</span>'+
 '<span id="tc-data-scope"></span></div><div class="tc-source-note" id="tc-research-info"></div></section>'+
 '<div class="tc-bottom"><div class="tc-links"><a href="https://support.travian.com/en/articles/20-game-versions-and-speed" target="_blank" rel="noopener noreferrer">Resmî sunucu hızları ↗</a>'+
 '<a href="https://support.travian.com/en/articles/40-troop-upgrades-and-smithy" target="_blank" rel="noopener noreferrer">Demirci kuralları ↗</a><a href="https://support.travian.com/en/articles/102-artefact-effects" target="_blank" rel="noopener noreferrer">Resmî tılsım etkileri ↗</a>'+
 '<a href="https://github.com/kirilloid/travian" target="_blank" rel="noopener noreferrer">Kirilloid veri modeli ↗</a></div>'+
 '<button type="button" class="tc-copy" id="tc-copy">🔗 Hesabın bağlantısını kopyala</button><span id="tc-copy-msg" role="status"></span></div>'+
 '<div class="tc-disclaimer">Özel dünya ve dönemsel denge değişiklikleri olabilir. Askerler sayfası bir referans/hesaplama aracıdır; oyun hesabınıza erişmez. Doğa ve Natar birlikleri normal eğitim hesaplamasına dahil edilmez.</div>';
}
function drawControls(){
 const t=tribe();
 const opts=mkOptions([1,2,3,5,10],"x").map(([v,l])=>[v,"T4.6 "+l]);
 const helmInf=[[0,"Yok"],[10,"Paralı Asker %10"],[15,"Savaşçı %15"],[20,"Liderlik %20"]];
 const helmCav=[[0,"Yok"],[10,"Atlı %10"],[15,"Süvari %15"],[20,"Ağır Süvari %20"]];
 const bonus=[[0,"Yok"],[2,"%2"],[4,"%4"],[6,"%6"],[8,"%8"],[10,"%10"]];
 const artifact=[[1,"Yok"],[.5,"1/2 • %50 daha kısa (küçük / eşsiz)"],[.75,"3/4 • %25 daha kısa (büyük)"]];
 const titanArtifact=[[1,"Yok"],[2,"2× • %100 daha hızlı (küçük / eşsiz)"],[1.5,"1,5× • %50 daha hızlı (büyük)"]];
 $("tc-speed").innerHTML=selectOpts(opts,state.speed);
 $("tc-training-controls").innerHTML=
   selectCard("Eğitim binası","training",levels.slice(1).map(v=>[v,"Seviye "+v]))+
   selectCard("Birlik eğitim bonusu","allianceTrain",bonus)+
   selectCard("Piyade miğferi","helmInf",helmInf)+
   selectCard("Süvari miğferi","helmCav",helmCav)+
   (t.id==="romans"?selectCard("Yalak","trough",levels.map(v=>[v,v?"Seviye "+v:"Yok"])):"");
 $("tc-armor-controls").innerHTML=
   selectCard("Demirci seviyesi","smithy",levels.map(v=>[v,"Seviye "+v]))+
   selectCard("Metalürji bonusu","allianceMetal",bonus);
 $("tc-artifact-controls").innerHTML=
   selectCard("Asker Eğitme Tılsımı","trainer",artifact)+
   selectCard("Titan Çizmesi Tılsımı","titan",titanArtifact);
 const tabs=$("tc-tribes");
 tabs.innerHTML=tribes.map(x=>'<button type="button" class="tc-tribe'+(x.id===state.tribe?" active":"")+'" data-tribe="'+x.id+'">'+esc(x.name)+'</button>').join("");
}
function drawUnits(){
 const t=tribe();
 $("tc-rows").innerHTML=t.units.map(u=>{
  const stat=combat(u),cost=unitCost(u),time=trainingTime(u);
  return '<tr data-unit="'+u.id+'" class="'+(u.id===state.selected?"selected":"")+'" tabindex="0" role="button" aria-label="'+esc(u.name)+" — geliştirme detaylarını aç"+'">'+
   '<td><div class="tc-unit-cell">'+unitIconHTML(u)+'<span><strong>'+esc(u.name)+'</strong><small>'+esc(typeNames[u.type]||"Birim")+'</small></span></div></td>'+
   '<td class="tc-power">'+fixed(stat.a)+'</td><td>'+fixed(stat.di)+'</td><td>'+fixed(stat.dc)+'</td>'+
   '<td class="tc-speed">'+speedText(movement(u))+'</td><td>'+n(u.p)+'</td>'+
   [0,1,2,3].map(i=>'<td>'+(cost?n(cost[i]):"—")+'</td>').join("")+
   '<td class="tc-cost">'+(totalCost(u)!=null?n(totalCost(u)):"—")+'</td>'+
   '<td>'+n(upkeep(u))+'</td><td class="tc-time">'+(time!==null?timeFormat(time):"—")+'</td></tr>';
 }).join("");
}
function drawDetail(){
 const u=chosen(),stat=combat(u),base=combat(u,0);
 $("tc-selected-title").innerHTML=unitIconHTML(u)+'<span>'+esc(u.name)+" • "+esc(tribe().name)+'</span>';
 $("tc-selected-note").textContent=trainingType(u)+" · "+(u.trainable?"Eğitim süresi: "+timeFormat(trainingTime(u)):"Doğa/Natar birimi; eğitim süresi uygulanmaz.")+
   " · Baz hareket: "+u.v+" alan/saat"+(smithyEligible(u)?"":" · Demirci geliştirilemez");
 const statBoxes=[["⚔","Saldırı",stat.a],["🛡","Piyadeye savunma",stat.di],["🛡","Süvariye savunma",stat.dc]];
 $("tc-selected-stats").innerHTML=statBoxes.map(([i,label,value])=>'<div><small>'+i+" "+label+'</small><strong>'+fixed(value)+'</strong></div>').join("");
 $("tc-smithy-rows").innerHTML=levels.map(l=>{
   const points=combat(u,l);
   const active=l===state.smithy;
   return '<tr data-smithy="'+l+'" class="'+(active?"active":"")+'" role="button" tabindex="0" aria-label="Demirci '+l+'. seviye">'+
     '<td><strong>'+l+'</strong>'+(l===0?" <small>Baz</small>":"")+'</td>'+
     '<td>'+fixed(points.a)+'</td><td>'+fixed(points.di)+'</td><td>'+fixed(points.dc)+'</td>'+
     '<td>'+ (!smithyEligible(u)?"Geliştirme uygulanmaz":l===0?"Temel seviye":active?"✓ Seçili seviye":"Seviye "+l)+'</td></tr>';
 }).join("");
 $("tc-research-info").textContent="Gereksinimler: "+requirementsText(u)+" | Akademi araştırma süresi (seviye 1, eski model): "+researchText(u)+" | Araştırma maliyetleri: doğrulanmadı.";
 $("tc-data-scope").textContent=u.source==="npc"?"Eğitilemeyen NPC birimi":u.source==="official/community"||u.source==="mixed-official-community"?"Karma kaynak verisi; bazı değerler eksik olabilir":u.source==="travian-official"?"Travian resmî Viking verisi":"Kirilloid T4.6 modelinden";
}
function syncUrl(){
 const p=new URLSearchParams();
 for(const [key,v] of [["tribe",state.tribe],["s",state.speed],["train",state.training],["smithy",state.smithy],["hi",state.helmInf],["hc",state.helmCav],["at",state.allianceTrain],["am",state.allianceMetal],["art",state.trainer],["titan",state.titan],["hdt",state.trough],["unit",state.selected]])p.set(key,String(v));
 history.replaceState(null,"",location.pathname+"?"+p.toString());
}
function render(){
 drawControls();drawUnits();drawDetail();syncUrl();
}
buildShell();
root.addEventListener("change",e=>{
 const el=e.target.closest("select[data-key]");if(!el)return;
 const key=el.dataset.key;
 state[key]=Number(el.value);
 render();
});
root.addEventListener("click",e=>{
 const tab=e.target.closest("[data-tribe]");
 if(tab){state.tribe=tab.dataset.tribe;state.selected=tribe().units[0].id;render();return;}
 const unit=e.target.closest("tr[data-unit]");
 if(unit){state.selected=unit.dataset.unit;render();return;}
 const sm=e.target.closest("tr[data-smithy]");
 if(sm){state.smithy=Number(sm.dataset.smithy);render();return;}
});
root.addEventListener("keydown",e=>{
 const el=e.target.closest("tr[data-unit],tr[data-smithy]");
 if(el&&(e.key==="Enter"||e.key===" ")){e.preventDefault();el.click();}
});
$("tc-copy").addEventListener("click",async()=>{
 try{await navigator.clipboard.writeText(location.href);$("tc-copy-msg").textContent="Kopyalandı ✓";}
 catch(e){$("tc-copy-msg").textContent="Adres çubuğundaki bağlantıyı kopyala.";}
});
render();
})();
