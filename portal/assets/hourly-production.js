/* T4.6 reference: Kirilloid src/model/base/buildings.ts and src/model/t4/buildings.ts.
 * Production bonuses: official Travian Help Center articles 129, 48, 214, 149.
 * The calculator estimates gross field production; no hero, consumption or special-world effects. */
(function(){
"use strict";
const root=document.getElementById("hourly-production");if(!root)return;
const resources=[["wood","Odun"],["clay","Tuğla"],["iron","Demir"],["crop","Tahıl"]];
const historical=[2,5,9,15,22,33,50,70,100,145,200,280,375,495,635,800,1000,1300,1600,2000,2450,3050];
const production=historical.map(v=>Math.round(v*1.4));
const seq=n=>Array.from({length:n+1},(_,i)=>i);
const speeds=[1,2,3,5,10], crops=[6,7,9,15];
const layouts={
 6:[[4,4,4,6],[5,4,3,6],[5,3,4,6],[4,5,3,6],[3,5,4,6],[4,3,5,6],[3,4,5,6]],
 7:[[3,4,4,7],[4,3,4,7],[4,4,3,7]],
 9:[[3,3,3,9]],15:[[1,1,1,15]]
};
/* Image coordinates in original 1254 × 1254 source pixels.
 * Each marker: [x, y, resource index, font size]. Index 4 is the village center,
 * not a resource field. All artwork is cropped to y=140..1090 consistently. */
const villageArtwork={
 "1-1-1-15":[[446,254,3,46],[698,264,3,47],[956,304,0,46],[279,341,2,46],[623,398,3,46],[812,433,3,46],[1072,439,3,46],[408,510,3,46],[163,515,3,46],[918,526,3,46],[1141,546,3,46],[363,645,3,47],[1088,674,3,47],[148,675,3,46],[673,759,3,49],[973,844,3,48],[387,889,1,47],[699,918,3,48]],
 "3-3-3-9":[[409,260,3,44],[671,272,3,43],[938,307,0,43],[249,341,3,43],[597,393,3,44],[789,424,1,43],[1046,435,2,44],[367,506,3,43],[115,510,3,43],[880,533,2,43],[1098,539,2,43],[337,652,3,44],[1070,681,3,44],[131,683,3,43],[643,769,0,44],[964,872,1,43],[372,903,1,44],[673,935,0,44]],
 "3-4-4-7":[[406,255,2,37],[660,260,3,38],[913,296,3,37],[265,342,0,37],[597,394,1,38],[779,414,1,37],[1016,418,2,37],[140,498,3,37],[386,499,3,37],[881,519,2,37],[1104,520,2,37],[364,632,3,37],[144,654,3,37],[1044,658,3,37],[647,752,0,38],[940,842,1,37],[374,865,1,37],[668,908,0,37]],
 "4-3-4-7":[[432,270,2,43],[678,270,3,43],[909,303,3,43],[254,337,0,43],[607,402,0,43],[788,419,1,43],[1044,425,2,44],[137,503,3,43],[376,503,3,43],[1099,533,2,43],[877,534,2,44],[617,573,4,43],[350,642,3,43],[1045,657,3,43],[151,667,3,43],[654,774,0,43],[956,852,1,43],[383,885,1,43],[690,921,0,43]],
 "4-4-3-7":[[430,292,0,48],[675,292,3,49],[929,329,3,49],[269,362,0,47],[615,418,1,47],[780,440,1,49],[1043,446,2,49],[381,520,3,48],[145,526,3,49],[881,549,2,48],[1099,551,2,49],[351,654,3,49],[1046,671,3,49],[152,678,3,49],[660,771,0,49],[947,855,1,49],[390,886,1,49],[680,920,0,49]],
 "3-4-5-6":[[667,260,3,45],[421,271,2,45],[926,304,0,45],[276,338,2,44],[604,394,1,45],[779,418,1,45],[1055,419,2,45],[137,506,3,45],[378,509,3,45],[1101,532,2,45],[877,534,2,44],[357,648,3,44],[1059,665,3,45],[151,668,3,45],[648,760,0,45],[948,845,1,44],[378,879,1,45],[674,925,0,44]],
 "3-5-4-6":[[418,281,2,45],[665,281,3,45],[934,321,0,45],[259,356,1,46],[605,416,1,46],[784,440,1,46],[1036,440,2,46],[372,524,3,46],[119,529,3,45],[895,552,2,46],[1105,552,2,46],[342,669,3,46],[124,687,3,46],[1058,690,3,46],[648,783,0,46],[964,879,1,46],[374,915,1,46],[674,954,0,46]],
 "4-3-5-6":[[403,244,2,46],[667,246,0,45],[956,269,0,45],[243,334,2,45],[596,375,0,45],[803,385,3,45],[1068,389,3,45],[385,447,2,45],[143,462,2,45],[1086,528,1,46],[869,535,1,45],[365,636,0,45],[151,647,2,45],[1096,662,3,45],[667,746,3,45],[989,834,3,46],[390,880,1,46],[696,905,3,45]],
 "4-4-4-6":[[674,271,3,46],[428,273,0,46],[934,311,0,46],[261,349,2,47],[611,406,1,46],[786,420,1,46],[1043,430,2,46],[139,517,3,46],[385,517,3,46],[883,538,2,46],[1101,540,2,46],[355,661,3,46],[1058,676,3,47],[146,683,3,46],[653,772,0,46],[930,861,1,47],[390,884,1,46],[690,917,0,46]],
 "4-5-3-6":[[420,283,0,43],[671,283,3,43],[916,323,0,43],[265,348,1,43],[607,410,1,43],[781,426,1,43],[1045,434,2,43],[135,506,3,43],[378,510,3,44],[899,518,2,43],[1106,527,2,43],[338,649,3,44],[1054,668,3,44],[149,672,3,43],[654,763,0,44],[927,848,1,43],[383,875,1,43],[666,916,0,43]],
 "5-3-4-6":[[687,284,3,45],[428,285,0,46],[952,327,0,45],[259,368,2,45],[609,419,0,45],[799,444,1,45],[1040,444,2,45],[385,526,3,46],[135,530,3,46],[896,547,2,45],[1117,561,2,46],[358,661,3,46],[1061,686,3,45],[146,688,3,46],[651,785,0,46],[958,874,1,46],[384,899,1,45],[689,943,0,45]],
 "5-4-3-6":[[661,259,3,45],[387,268,0,45],[935,304,0,45],[230,348,0,45],[593,402,1,45],[1070,418,2,45],[772,419,1,45],[139,506,3,45],[371,511,3,44],[1105,523,2,44],[877,529,2,45],[353,651,3,45],[1058,667,3,45],[143,672,3,45],[643,769,0,45],[934,851,1,45],[372,880,1,45],[659,928,0,45]]
};
const buildings=["Marangozhane","Tuğla Fırını","Demir Dökümhanesi","Değirmen"];
const state={speed:1,crop:6,layout:0,levels:[10,10,10,10],gold:[false,false,false,false],factory:[0,0,0,0],bakery:0,oasis:[0,0,0,0],water:0};
const nf=new Intl.NumberFormat("tr-TR"),fmt=n=>nf.format(n);
const $=id=>document.getElementById(id);
const icon=i=>'<img class="hp-icon" src="/portal/assets/resources/'+resources[i][0]+'-v2.webp" width="24" height="24" alt="" aria-hidden="true">';
const options=(xs,label)=>xs.map(x=>'<option value="'+x+'">'+label(x)+'</option>').join("");
const select=(id,label,values,format)=>'<select id="'+id+'" aria-label="'+label+'">'+options(values,format)+'</select>';
const levelOptions=seq(production.length-1);
const bonusLevels=seq(5), oasisOptions=seq(6).map(n=>n*25);
const cells=fn=>resources.map((r,i)=>'<td>'+fn(r,i)+'</td>').join("");
function layoutName(v){
 if(v[3]>=9)return v[3]+" tarlalı · "+v.join("-");
 if(v[3]===7)return "Az "+resources[v.slice(0,3).indexOf(3)][1].toLowerCase()+" · "+v.join("-");
 if(v.slice(0,3).every(n=>n===4))return "Dengeli · "+v.join("-");
 return "Çok "+resources[v.slice(0,3).indexOf(5)][1].toLowerCase()+", az "+resources[v.slice(0,3).indexOf(3)][1].toLowerCase()+" · "+v.join("-");
}
function calculate(s){
 const counts=layouts[s.crop][s.layout];
 return counts.map((count,i)=>{
  const base=count*production[s.levels[i]]*s.speed;
  const building=5*(s.factory[i]+(i===3?s.bakery:0));
  const oasis=s.oasis[i]*(1+s.water*.05);
  return Math.round(base*(1+(building+oasis)/100)*(s.gold[i]?1.25:1));
 });
}
root.innerHTML='<section class="hp-panel"><div class="hp-toolbar">'+
 '<label>Sunucu '+select("hp-speed","Sunucu hızı",speeds,n=>"T4.6 "+n+"x")+'</label>'+
 '<div class="hp-village"><span>Köy türü</span><div class="hp-tabs" id="hp-tabs" role="group" aria-label="Köy türü">'+crops.map(n=>'<button type="button" data-crop="'+n+'" aria-pressed="false">'+n+' tarlalı</button>').join("")+'</div></div>'+
 '<label class="hp-layout-label" id="hp-layout-label">Hammadde dağılımı <select id="hp-layout" aria-label="Hammadde dağılımı"></select></label></div>'+
 '<div class="hp-main"><div class="hp-village-panel"><h2 id="hp-village-title">Köy dağılımı</h2><div class="hp-map" id="hp-map" aria-label="Köy hammadde alanları"></div><p class="hp-map-caption">18 hammadde alanı · Seviyeler anlık güncellenir</p></div>'+
 '<div class="hp-calc"><div class="hp-table-wrap"><table class="hp-table"><thead><tr><th scope="col">Ayarlar</th>'+resources.map((r,i)=>'<th scope="col">'+icon(i)+' <span>'+r[1]+'</span></th>').join("")+'</tr></thead><tbody>'+
 '<tr><th scope="row"><label class="hp-inline"><input type="checkbox" id="hp-gold-all"> Plus (+%25)</label></th>'+cells((r,i)=>'<input type="checkbox" id="hp-gold-'+i+'" aria-label="'+r[1]+' altın üretim bonusu">')+'</tr>'+
 '<tr><th scope="row">Alan sayısı</th>'+cells((r,i)=>'<strong id="hp-count-'+i+'"></strong>')+'</tr>'+
 '<tr><th scope="row"><label>Seviye '+select("hp-all","Tüm alanların ortak seviyesi",["",...levelOptions],n=>n===""?"Tümü":n)+'</label></th>'+cells((r,i)=>select("hp-level-"+i,r[1]+" alanlarının ortak seviyesi",levelOptions,n=>n))+'</tr>'+
 '<tr><th scope="row">Üretim binaları</th>'+cells((r,i)=>'<div class="hp-building"><span>'+buildings[i]+'</span>'+select("hp-building-"+i,buildings[i]+" seviyesi",bonusLevels,n=>n===0?"Yok":n+" (+%"+(n*5)+")")+(i===3?'<span>Ekmek Fırını</span>'+select("hp-bakery","Ekmek Fırını seviyesi",bonusLevels,n=>n===0?"Yok":n+" (+%"+(n*5)+")"):"")+'</div>')+'</tr>'+
 '<tr><th scope="row">Vahalar</th>'+cells((r,i)=>select("hp-oasis-"+i,r[1]+" toplam vaha bonusu",oasisOptions,n=>"%"+n))+'</tr>'+
 '<tr><th scope="row">Su İşleri</th><td colspan="4"><div class="hp-water">'+select("hp-water","Su İşleri seviyesi (Mısır)",seq(20),n=>n===0?"Yok":n+". seviye (+%"+(n*5)+")")+'<span>Mısır · vaha bonusuna etki eder</span></div></td></tr>'+
 '<tr class="hp-result"><th scope="row">Üretim /sa</th>'+cells((r,i)=>'<strong id="hp-value-'+i+'"></strong>')+'</tr></tbody></table></div>'+
 '<div class="hp-total" aria-live="polite"><span>Toplam saatlik üretim</span><strong id="hp-total"></strong><span>Günlük toplam <b id="hp-daily"></b></span></div></div></div>'+
 '<div class="hp-note">Brüt üretimdir; kahraman, nüfus, asker tüketimi ve özel dünya bonusları dahil değildir. Vaha yüzdeleri elle girilir; köydeki gerçek üç vahanın toplamını kullan. Bina seviyeleri serbest senaryo içindir; oyun içi ön koşullar denetlenmez. Normal köylerde alan sınırı 10, özel şehirlerde 12; başkent için 21 seviyeye kadar Kirilloid referans değerleri sunulur. Plus burada ayrı satın alınan %25 altın üretim bonusunu ifade eder.</div>'+
 '<details class="hp-sources"><summary>Hesaplama ve kaynaklar</summary><p>Alan sayısı × alan üretimi × sunucu hızı × (1 + bina bonusu + etkin vaha bonusu) × altın bonusu. Vaha bonusu Su İşleri ile çarpılır; yalnızca altın bonusu toplam üretime uygulanır. Yüzdeler ondalık katsayı olarak alınır; sonuç her kaynak için en yakın tam sayıya yuvarlanır.</p><a href="https://github.com/kirilloid/travian/blob/master/src/model/t4/buildings.ts" target="_blank" rel="noopener noreferrer">Kirilloid T4 üretim modeli</a> · <a href="https://support.travian.com/en/articles/129-gold-feature-production-bonuses" target="_blank" rel="noopener noreferrer">Altın üretim bonusu</a> · <a href="https://support.travian.com/en/articles/48-oasis" target="_blank" rel="noopener noreferrer">Vahalar</a> · <a href="https://support.travian.com/en/articles/214-guide-resources-explained" target="_blank" rel="noopener noreferrer">Hammaddeler</a> · <a href="https://support.travian.com/en/articles/149-5-things-to-consider-about-egyptians" target="_blank" rel="noopener noreferrer">Su İşleri</a></details></section>';
function setLayout(){
 $("hp-layout").innerHTML=layouts[state.crop].map((v,i)=>'<option value="'+i+'">'+layoutName(v)+'</option>').join("");
 $("hp-layout").value=String(state.layout);
 $("hp-layout-label").hidden=layouts[state.crop].length===1;
 $("hp-tabs").querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.crop)===state.crop)));
}
function villageVisual(counts,s){
 const key=counts.join("-");
 const markers=villageArtwork[key];
 const label=s.crop+" tarlalı köy · "+key;
 return '<svg class="hp-village-art" viewBox="0 140 1254 950" role="img" aria-label="'+label+'" xmlns="http://www.w3.org/2000/svg">'+
  '<title>'+label+'</title><desc>Seçilen seviyeler: '+resources.map((r,i)=>r[1]+" "+s.levels[i]).join(", ")+'</desc>'+
  '<image href="/portal/assets/hourly-production-villages/'+key+'.webp" x="0" y="140" width="1254" height="950" preserveAspectRatio="none"/>'+
  markers.map(([x,y,type,size])=>{
   const center=type===4;
   const value=center?"Köy":String(s.levels[type]);
   const description=center?"Köy merkezi":resources[type][1]+" · Seviye "+value;
   return '<g class="hp-map-marker" data-resource="'+type+'"><title>'+description+'</title><text x="'+x+'" y="'+y+'" text-anchor="middle" dominant-baseline="central" font-size="'+(center?25:size)+'">'+value+'</text></g>';
  }).join("")+'</svg>';
}
function render(){
 const counts=layouts[state.crop][state.layout];
 const values=calculate(state);
 $("hp-village-title").textContent=state.crop+" tarlalı köy · "+counts.join("-");
 $("hp-map").innerHTML=villageVisual(counts,state);
 for(let i=0;i<4;i++){
  $("hp-count-"+i).textContent=counts[i];
  $("hp-value-"+i).textContent=fmt(values[i]);
 }
 const total=values.reduce((a,b)=>a+b,0);
 $("hp-total").textContent=fmt(total);$("hp-daily").textContent=fmt(total*24);
 $("hp-gold-all").checked=state.gold.every(Boolean);
 $("hp-gold-all").indeterminate=state.gold.some(Boolean)&&!state.gold.every(Boolean);
 $("hp-all").value=state.levels.every(v=>v===state.levels[0])?String(state.levels[0]):"";
}
function bind(id,fn){$(id).addEventListener("change",e=>{fn(e.target);render();});}
$("hp-speed").value=String(state.speed);
bind("hp-speed",el=>{state.speed=Number(el.value)});
$("hp-tabs").addEventListener("click",e=>{const b=e.target.closest("button[data-crop]");if(!b)return;state.crop=Number(b.dataset.crop);state.layout=0;setLayout();render();});
bind("hp-layout",el=>{state.layout=Number(el.value)});
bind("hp-all",el=>{if(el.value==="")return;state.levels.fill(Number(el.value));state.levels.forEach((v,i)=>{$("hp-level-"+i).value=String(v)});});
bind("hp-gold-all",el=>{state.gold.fill(el.checked);state.gold.forEach((v,i)=>{$("hp-gold-"+i).checked=v});});
resources.forEach((r,i)=>{
 $("hp-level-"+i).value=String(state.levels[i]);
 bind("hp-level-"+i,el=>{state.levels[i]=Number(el.value)});
 bind("hp-gold-"+i,el=>{state.gold[i]=el.checked});
 bind("hp-building-"+i,el=>{state.factory[i]=Number(el.value)});
 bind("hp-oasis-"+i,el=>{state.oasis[i]=Number(el.value)});
});
bind("hp-bakery",el=>{state.bakery=Number(el.value)});
bind("hp-water",el=>{state.water=Number(el.value)});
setLayout();render();
})();
