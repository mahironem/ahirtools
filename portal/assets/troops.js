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
 training:allowedNum("train",levels.slice(1),1),
 smithy:allowedNum("smithy",levels,0),
 smithyBuilding:allowedNum("sb",levels,0),
 upgradeFrom:allowedNum("uf",levels,0),
 upgradeTo:allowedNum("ut",levels.slice(1),1),
 buildingTarget:allowedNum("bt",levels,1),
 mainBuilding:allowedNum("mb",levels.slice(1),1),
 rowStage:0,
 helmInf:allowedNum("hi",[0,10,15,20],0),
 helmCav:allowedNum("hc",[0,10,15,20],0),
 allianceTrain:allowedNum("at",[0,2,4,6,8,10],0),
 allianceMetal:allowedNum("am",[0,2,4,6,8,10],0),
 brewery:allowedNum("brew",levels,0),
 trainer:allowedNum("art",[1,.75,.5],1),
 titan:allowedNum("titan",[1,1.5,2],1),
 trough:allowedNum("hdt",levels,0),
 selected:null
};
state.selected=(tribes.find(t=>t.id===state.tribe).units.some(u=>u.id===qs.get("unit"))?qs.get("unit"):tribes.find(t=>t.id===state.tribe).units[0].id);
function normalizePlan(){
 // Combat preview is independent of the building upgrade planner.
 state.upgradeFrom=Math.min(19,state.upgradeFrom);
 state.upgradeTo=Math.min(20,Math.max(state.upgradeFrom+1,state.upgradeTo));
 state.buildingTarget=Math.min(20,Math.max(state.smithyBuilding,state.upgradeTo,state.buildingTarget));
}
normalizePlan();
function tribe(){return tribes.find(x=>x.id===state.tribe)||tribes[0];}
function chosen(){return tribe().units.find(x=>x.id===state.selected)||tribe().units[0];}
function selectOpts(items,value){return items.map(([v,label])=>'<option value="'+esc(v)+'"'+(String(v)===String(value)?" selected":"")+'>'+esc(label)+'</option>').join("")}
function selectCard(label,key,values,footnote){
 const iconPath=key==="brewery"?"brewery-control-v1.webp":key==="trough"?"trough-control-v1.webp":key==="training"?"training-building-v1.webp":key==="allianceTrain"?"training-bonus-v1.webp":key==="helmInf"?"infantry-helmet-v1.webp":key==="helmCav"?"cavalry-helmet-v1.webp":key==="smithy"?"smithy-control-v1.webp":key==="allianceMetal"?"metallurgy-control-v1.webp":key==="trainer"||key==="titan"?key+"-artifact-v1.webp":"";
 const icon=iconPath?'<img class="tc-artifact-icon" src="/portal/assets/metric-icons/'+iconPath+'" width="24" height="24" alt="" aria-hidden="true">':"";
 return '<label class="tc-control"><span>'+icon+label+'</span><select data-key="'+key+'" aria-label="'+esc(label)+'">'+selectOpts(values,state[key])+'</select>'+(footnote?'<small>'+footnote+'</small>':'')+'</label>';
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
 // An active Brewery celebration adds 1% attack per level, for this Teuton-only preview.
 const breweryMultiplier=state.tribe==="teutons"&&unit.id.startsWith("teutons-")?1+state.brewery/100:1;
 return {a:smithyPoints(unit.a,unit.u,actualLevel)*multiplier*breweryMultiplier,
         di:smithyPoints(unit.di,unit.u,actualLevel)*multiplier,
         dc:smithyPoints(unit.dc,unit.u,actualLevel)*multiplier};
}
// Kirilloid old T4 model: rt = 3 * base training time + 1800 for upgradable units.
 // Per-level resource formula cross-checked against the Equites Imperatoris reference screenshot.
const round5=x=>Math.round(x/5)*5;
const sum=x=>x.reduce((a,b)=>a+b,0);
function upgradeRow(unit,l,buildingLevel){
 if(!smithyEligible(unit)||!Array.isArray(unit.c)||unit.u<=0||!Number.isFinite(unit.t)||l<1)return null;
 const coeff=[100,100,200,160];
 const scale=Math.pow(l,.8);
 const costs=unit.c.map((c,i)=>round5((7*c+coeff[i])*scale/unit.u));
 const rt=unit.researchTime>0?unit.researchTime:3*unit.t+1800;
 const seconds=Math.round(rt*scale*Math.pow(.964,Math.max(1,buildingLevel)-1)/state.speed);
 return {level:l,costs,seconds,total:sum(costs)};
}
function sumRows(rows){
 if(!rows.length)return {costs:[0,0,0,0],seconds:0,total:0};
 const costs=[0,0,0,0];let seconds=0;
 for(const r of rows){r.costs.forEach((c,i)=>costs[i]+=c);seconds+=r.seconds;}
 return {costs,seconds,total:sum(costs)};
}
function buildingRow(l){
 const b=(window.AHIR_BUILDINGS||[]).find(x=>x.id==="smithy");
 if(!b)return null;
 const costs=b.base.map(c=>round5(c*Math.pow(b.k,l-1)));
 const seconds=Math.round(Math.max(0,b.a*Math.pow(b.tk,l-1)-b.tb)/state.speed*Math.pow(.964,state.mainBuilding-1));
 return {level:l,costs,seconds,total:sum(costs)};
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
// Reuse the same transparent resource illustrations as the Buildings tool.
function resourceIcon(kind){
 const src=kind==="total"?"/portal/assets/metric-icons/total-resources-v1.webp":"/portal/assets/resources/"+kind+"-v2.webp";
 return '<img class="tc-resource-icon" src="'+src+'" alt="" aria-hidden="true" width="20" height="20">';
}
function combatIcon(kind){
 return '<img class="tc-resource-icon tc-combat-icon" src="/portal/assets/metric-icons/'+kind+'-v1.webp" alt="" aria-hidden="true" width="20" height="20">';
}
function clockIcon(){
 return '<img class="tc-resource-icon tc-clock-icon" src="/portal/assets/metric-icons/clock-v1.webp" alt="" aria-hidden="true" width="20" height="20">';
}
function buildShell(){
 root.innerHTML='<div class="tc-toolbar">'+
 '<div class="tc-tribe-tabs" id="tc-tribes" role="group" aria-label="Kabile seçimi"></div>'+
 '<label class="tc-speed-select"><span>Sunucu</span><select id="tc-speed" data-key="speed" aria-label="Sunucu hızı"></select></label></div>'+
 '<div class="tc-table-wrap"><table class="tc-table"><thead><tr>'+
 '<th>Birim / Tür</th><th title="Demirci, metalürji ve aktif İçecek Fabrikası bonuslu saldırı gücü">'+combatIcon("attack")+' Saldırı</th>'+
 '<th title="Piyadeye karşı savunma">'+combatIcon("infantry-defense")+' Piyade</th><th title="Süvariye karşı savunma">'+combatIcon("cavalry-defense")+' Süvari</th>'+
 '<th title="Sunucu hızı ve Titan Çizmesi etkisiyle hareket hızı, alan/saat">'+combatIcon("speed")+' Hız</th><th title="Birimin taşıma kapasitesi">'+combatIcon("capacity")+' Taşıma</th>'+
 '<th>'+resourceIcon("wood")+' Odun</th><th>'+resourceIcon("clay")+' Tuğla</th><th>'+resourceIcon("iron")+' Demir</th><th>'+resourceIcon("crop")+' Tahıl</th>'+
 '<th>'+resourceIcon("total")+' Toplam</th><th title="Saatlik tahıl tüketimi">'+combatIcon("crop-upkeep")+'/sa</th><th title="Kayıtlı eğitim bonuslarına göre eğitim süresi">'+clockIcon()+' Eğitim</th>'+
 '</tr></thead><tbody id="tc-rows"></tbody></table></div>'+
 '<section class="tc-control-sections" aria-label="Asker hesaplama ayarları">'+
 '<div class="tc-control-group"><div class="tc-control-title">'+clockIcon()+' Asker Eğitim Hızı</div><div class="tc-control-items" id="tc-training-controls"></div></div>'+
 '<div class="tc-control-group"><div class="tc-control-title"><img class="tc-panel-heading-icon" src="/portal/assets/metric-icons/armor-effects-v1.webp" alt="" aria-hidden="true" width="24" height="24"> Zırh Etkileri</div><div class="tc-control-items" id="tc-armor-controls"></div></div>'+
 '<div class="tc-control-group"><div class="tc-control-title"><img class="tc-panel-heading-icon" src="/portal/assets/metric-icons/treasury-effects-v1.webp" alt="" aria-hidden="true" width="24" height="24"> Tılsım Etkileri</div><div class="tc-control-items" id="tc-artifact-controls"></div></div>'+
 '</section>'+
 '<section class="tc-detail"><div class="tc-detail-top"><div><span class="tc-eyebrow">ZIRH DÖKÜMHANESİ • ASKER GELİŞTİRMELERİ</span>'+
 '<h3 id="tc-selected-title"></h3><p id="tc-selected-note"></p></div>'+
 '<div class="tc-selected-stats" id="tc-selected-stats"></div></div>'+
 '<div id="tc-upgrade-planner"><div class="tc-upgrade-toolbar" id="tc-upgrade-controls"></div>'+
 '<p class="tc-plan-hint" id="tc-upgrade-hint" role="status"></p>'+
 '<div class="tc-plan-summary" id="tc-upgrade-summary"></div>'+
 '<div class="tc-smithy-wrap"><table class="tc-smithy-table"><thead><tr><th>Seviye</th>'+
 '<th>'+resourceIcon("wood")+' Odun</th><th>'+resourceIcon("clay")+' Tuğla</th><th>'+resourceIcon("iron")+' Demir</th><th>'+resourceIcon("crop")+' Tahıl</th><th>'+resourceIcon("total")+' Toplam</th><th>'+clockIcon()+' Geliştirme</th>'+
 '<th>'+combatIcon("attack")+' Saldırı</th><th>'+combatIcon("infantry-defense")+' Piyade</th><th>'+combatIcon("cavalry-defense")+' Süvari</th><th>Durum</th></tr></thead>'+
 '<tbody id="tc-smithy-rows"></tbody><tfoot id="tc-upgrade-total"></tfoot></table></div></div>'+
 '<div class="tc-building-plan"><div class="tc-control-title">Zırh Dökümhanesi bina yükseltmesi</div><div class="tc-upgrade-toolbar" id="tc-building-controls"></div>'+
 '<p class="tc-plan-hint" id="tc-building-hint"></p><div class="tc-plan-summary" id="tc-building-summary"></div>'+
 '<div id="tc-building-link"></div></div>'+
 '<div class="tc-source-note"><span>Geliştirme maliyetleri tek asker türü içindir, tüm o tür birliklere uygulanır. Akademi araştırması, bina maliyetleri ve asker eğitimi ayrıdır. Süreler Kirilloid eski modeline göre hesaplanır; özel dünyalarda değişebilir.</span>'+
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
   selectCard("Asker zırh seviyesi","smithy",levels.map(v=>[v,"Seviye "+v]))+
   selectCard("Metalürji bonusu","allianceMetal",bonus)+
   (t.id==="teutons"?selectCard("İçecek Fabrikası","brewery",levels.map(v=>[v,v?"Seviye "+v+" (+%"+v+")":"Yok / festival kapalı"]),"Festival aktifken yalnızca saldırıya etki eder."):"");
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
 const statBoxes=[[combatIcon("attack"),"Saldırı",stat.a],[combatIcon("infantry-defense"),"Piyadeye savunma",stat.di],[combatIcon("cavalry-defense"),"Süvariye savunma",stat.dc]];
 $("tc-selected-stats").innerHTML=statBoxes.map(([i,label,value])=>'<div><small>'+i+" "+label+'</small><strong>'+fixed(value)+'</strong></div>').join("");
 drawUpgradePlan(u);
 drawBuildingPlan();
 $("tc-research-info").textContent="Gereksinimler: "+requirementsText(u)+" | Akademi araştırma süresi (seviye 1, eski model): "+researchText(u)+" | Araştırma maliyetleri: doğrulanmadı.";
 $("tc-data-scope").textContent=u.source==="npc"?"Eğitilemeyen NPC birimi":u.source==="official/community"||u.source==="mixed-official-community"?"Karma kaynak verisi; bazı değerler eksik olabilir":u.source==="travian-official"?"Travian resmî Viking verisi":"Kirilloid T4.6 modelinden";
}
function summaryHTML(result,range,label){
 const items=[[resourceIcon("wood")+" Odun",n(result.costs[0])],[resourceIcon("clay")+" Tuğla",n(result.costs[1])],[resourceIcon("iron")+" Demir",n(result.costs[2])],[resourceIcon("crop")+" Tahıl",n(result.costs[3])],[resourceIcon("total")+" Toplam",n(result.total)],[clockIcon()+" "+label,timeFormat(result.seconds)]];
 return '<div class="tc-plan-range">'+esc(range)+'</div>'+items.map(([k,v])=>'<div class="tc-plan-metric"><small>'+k+'</small><strong>'+v+'</strong></div>').join("");
}
function drawUpgradePlan(u){
 const available=smithyEligible(u)&&Array.isArray(u.c)&&u.u>0&&Number.isFinite(u.t);
 const plan=$("tc-upgrade-planner");plan.hidden=!available;
 if(!available)return;
 const planLevel=Math.max(1,state.buildingTarget);
 const options=arr=>arr.map(v=>[v,"Seviye "+v]);
 $("tc-upgrade-controls").innerHTML=selectCard("Mevcut asker geliştirmesi","upgradeFrom",options(levels.slice(0,20)))+
 selectCard("Hedef asker geliştirmesi","upgradeTo",options(levels.filter(l=>l>state.upgradeFrom)));
 const future=state.upgradeTo>state.smithyBuilding;
 $("tc-upgrade-hint").textContent=(state.rowStage?"Mevcut seviye "+state.upgradeFrom+" seçildi; şimdi hedef satıra tıkla.":"Tablodan önce mevcut, sonra hedef seviyeye tıkla veya menüleri kullan.")+
 " | Şu an en fazla "+state.smithyBuilding+". seviye yapılabilir."+
 (future?" Hedef için önce bina en az "+state.upgradeTo+". seviyeye çıkarılmalı.":"")+
 " Süre hesabı: "+planLevel+". seviye dökümhane (planlanan bina tamamlandıktan sonra)."+
 (!u.researchTime&&/^(spartans|vikings)-/.test(u.id)?" Baz geliştirme süresi modelden türetilmiştir; canlı doğrulama yok.":"");
 const rows=levels.slice(1).map(l=>upgradeRow(u,l,planLevel));
 const totals=sumRows(rows.filter(r=>r.level>state.upgradeFrom&&r.level<=state.upgradeTo));
 $("tc-upgrade-summary").innerHTML=summaryHTML(totals,state.upgradeFrom+" → "+state.upgradeTo,"Geliştirme");
 $("tc-smithy-rows").innerHTML=levels.map(l=>{
   const points=combat(u,l),r=l?rows[l-1]:null;
   const selected=l>state.upgradeFrom&&l<=state.upgradeTo;
   const cls=[selected?"tc-range-selected":"",l===state.upgradeFrom?"tc-range-start":"",l===state.upgradeTo?"tc-range-end":"",l>state.smithyBuilding?"tc-upgrade-locked":""].join(" ");
   return '<tr data-smithy="'+l+'" class="'+cls+'" role="button" tabindex="0" aria-label="Geliştirme seviyesi '+l+(l>state.smithyBuilding?", bina seviyesi yetersiz":"")+'">'+
     '<td><strong>'+l+'</strong></td>'+
     (r?r.costs.map(c=>'<td>'+n(c)+'</td>').join("")+'<td>'+n(r.total)+'</td><td>'+timeFormat(r.seconds)+'</td>':'<td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>')+
     '<td>'+fixed(points.a)+'</td><td>'+fixed(points.di)+'</td><td>'+fixed(points.dc)+'</td><td>'+ (l===0?"Baz":l>state.smithyBuilding?"Bina "+l+" gerekli":l<=state.upgradeFrom?"Mevcut":selected?"Seçili":"Uygun")+'</td></tr>';
 }).join("");
 $("tc-upgrade-total").innerHTML='<tr><th>'+state.upgradeFrom+' → '+state.upgradeTo+'</th>'+totals.costs.map(c=>'<th>'+n(c)+'</th>').join("")+'<th>'+n(totals.total)+'</th><th>'+timeFormat(totals.seconds)+'</th><th colspan="4">Toplam</th></tr>';
}
function drawBuildingPlan(){
 const options=arr=>arr.map(v=>[v,"Seviye "+v]);
 $("tc-building-controls").innerHTML=selectCard("Mevcut dökümhane","smithyBuilding",options(levels))+
 selectCard("Hedef dökümhane","buildingTarget",options(levels.filter(v=>v>=Math.max(state.smithyBuilding,state.upgradeTo))))+
 selectCard("Merkez Binası","mainBuilding",options(levels.slice(1)));
 const rows=levels.filter(l=>l>state.smithyBuilding&&l<=state.buildingTarget).map(buildingRow);
 const range=state.smithyBuilding+" → "+state.buildingTarget;
 $("tc-building-hint").textContent="Yalnızca bina yükseltmesi; asker geliştirme kaynakları ve süreleri bu toplama dahil değildir.";
 $("tc-building-summary").innerHTML=rows.some(r=>!r)?"Bina verisi bulunamadı.":summaryHTML(sumRows(rows),range,"İnşaat");
 $("tc-building-link").innerHTML='<a class="tc-copy tc-plan-link" href="/portal/tablolar/binalar/?b=smithy&s='+state.speed+'&mb='+state.mainBuilding+'&from='+Math.min(19,state.smithyBuilding)+'&to='+Math.max(Math.min(20,state.smithyBuilding+1),state.buildingTarget)+'">Binalar aracında dökümhane tablosunu aç ↗</a>';
}
function syncUrl(){
 const p=new URLSearchParams();
 for(const [key,v] of [["tribe",state.tribe],["s",state.speed],["train",state.training],["smithy",state.smithy],["sb",state.smithyBuilding],["uf",state.upgradeFrom],["ut",state.upgradeTo],["bt",state.buildingTarget],["mb",state.mainBuilding],["hi",state.helmInf],["hc",state.helmCav],["at",state.allianceTrain],["am",state.allianceMetal],["brew",state.brewery],["art",state.trainer],["titan",state.titan],["hdt",state.trough],["unit",state.selected]])p.set(key,String(v));
 history.replaceState(null,"",location.pathname+"?"+p.toString());
}
function render(){
 normalizePlan();drawControls();drawUnits();drawDetail();syncUrl();
}
buildShell();
root.addEventListener("change",e=>{
 const el=e.target.closest("select[data-key]");if(!el)return;
 const key=el.dataset.key;
 state[key]=Number(el.value);
 if(key==="upgradeFrom"||key==="upgradeTo"||key==="smithyBuilding"||key==="buildingTarget")state.rowStage=0;
 if(key==="smithyBuilding")state.buildingTarget=Math.max(state.smithyBuilding,state.upgradeTo);
 render();
});
root.addEventListener("click",e=>{
 const tab=e.target.closest("[data-tribe]");
 if(tab){state.tribe=tab.dataset.tribe;state.selected=tribe().units[0].id;render();return;}
 const unit=e.target.closest("tr[data-unit]");
 if(unit){state.selected=unit.dataset.unit;render();return;}
 const sm=e.target.closest("tr[data-smithy]");
 if(sm){const l=Number(sm.dataset.smithy);if(!state.rowStage||l<=state.upgradeFrom){state.upgradeFrom=Math.min(l,19);state.upgradeTo=state.upgradeFrom+1;state.rowStage=1;}else{state.upgradeTo=l;state.rowStage=0;}render();return;}
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
