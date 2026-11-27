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
 '<div class="hp-main"><div class="hp-village-panel"><h2 id="hp-village-title">Köy dağılımı</h2><div class="hp-map" id="hp-map" aria-label="Şematik hammadde alanları"></div><p class="hp-map-caption">18 hammadde alanı · Şematik görünüm</p></div>'+
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
function render(){
 const counts=layouts[state.crop][state.layout];
 const values=calculate(state);
 $("hp-village-title").textContent=state.crop+" tarlalı köy · "+counts.join("-");
 $("hp-map").innerHTML=counts.map((count,i)=>Array.from({length:count},()=>'<div class="hp-tile hp-tile-'+i+'" title="'+resources[i][1]+' · Seviye '+state.levels[i]+'">'+icon(i)+'<b>'+state.levels[i]+'</b></div>').join("")).join("");
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
