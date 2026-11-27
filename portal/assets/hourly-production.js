/* AhirTools • Hourly resource production reference.
   Uses the existing Buildings T4.6 reference curve (historical values × 1.4).
   A game world may use different values; no live account data is accessed. */
(function(){
"use strict";
const root=document.getElementById("hourly-production");
if(!root)return;
const historical=[2,5,9,15,22,33,50,70,100,145,200,280,375,495,635,800,1000,1300,1600,2000,2450,3050,3750];
const production=historical.map(v=>Math.round(v*1.4));
const resources=[["wood","Odun"],["clay","Tuğla"],["iron","Demir"],["crop","Tahıl"]];
const speeds=[1,2,3,5,10];
const layouts=[[4,4,4,6],[3,4,5,6],[3,5,4,6],[4,3,5,6],[4,5,3,6],[5,3,4,6],[5,4,3,6],[3,4,4,7],[4,3,4,7],[4,4,3,7],[3,3,3,9],[1,1,1,15],[0,0,0,18]];
const levels=production.map((_,i)=>i);
const nf=new Intl.NumberFormat("tr-TR");
const fmt=n=>nf.format(n);
const sum=xs=>xs.reduce((a,b)=>a+b,0);
const icon=i=>'<img class="hp-icon" src="/portal/assets/resources/'+resources[i][0]+'-v2.webp" width="24" height="24" alt="" aria-hidden="true">';
const opts=(xs,label)=>xs.map(x=>'<option value="'+x+'">'+label(x)+'</option>').join("");
const $=id=>document.getElementById(id);
const fieldRate=(level,speed)=>production[level]*speed;
const fieldLevels=()=>opts(levels,n=>"Seviye "+n);
root.innerHTML='<section class="hp-panel"><div class="hp-toolbar"><div><h2>Hammadde alanı üretim tablosu</h2><p>Her seviye için tek bir hammadde alanının bonus öncesi saatlik üretimi.</p></div><label>Sunucu <select id="hp-speed">'+opts(speeds,s=>"T4.6 "+s+"x")+'</select></label></div>'+
 '<div class="hp-table-wrap"><table class="hp-table"><thead><tr><th scope="col">Seviye</th>'+resources.map((r,i)=>'<th scope="col">'+icon(i)+' '+r[1]+' /sa</th>').join("")+'<th scope="col">Önceki seviyeye göre artış /sa</th></tr></thead><tbody id="hp-reference"></tbody></table></div>'+
 '<p class="hp-note">Seviye 0–22 referans aralığı; 22 oyunun kesin üst sınırı değildir. Normal köylerde en fazla 10, özel dünyalardaki şehirlerde 12, başkentte ise depolama koşulları elverdiği sürece daha yüksek seviyeler mümkündür.</p></section>'+
 '<section class="hp-panel"><div class="hp-toolbar"><div><h2>Köyün saatlik üretimi</h2><p>Alan dağılımını ve her alanın seviyesini seç; toplam üretimi anında gör.</p></div><label>Köy türü <select id="hp-layout">'+layouts.map((v,i)=>'<option value="'+i+'">'+v.join('-')+(i===0?' · Standart köy':v[3]===18?' · Özel dünya':'')+'</option>').join("")+'</select></label><label>Tüm alanları ayarla <select id="hp-all"><option value="">Seviye seç</option>'+fieldLevels()+'</select></label></div>'+
 '<div class="hp-fields" id="hp-fields"></div>'+
 '<div class="hp-consumption"><label>Nüfus (tahıl /sa)<input id="hp-pop" type="number" min="0" max="1000000000" step="1" value="0"></label><label>Asker tüketimi (tahıl /sa)<input id="hp-upkeep" type="number" min="0" max="1000000000" step="1" value="0"></label></div>'+
 '<div class="hp-table-wrap"><table class="hp-table hp-results"><thead><tr><th scope="col">Hammadde</th><th scope="col">Brüt /sa</th><th scope="col">Tüketim /sa</th><th scope="col">Net /sa</th><th scope="col">Net /24 sa</th></tr></thead><tbody id="hp-results"></tbody></table></div>'+
 '<p class="hp-note">İlk sürüm yalnızca hammadde alanlarının temel üretimini hesaplar. Vaha, üretim binaları, kahraman ve altın bonusları henüz dahil değildir. Nüfus ve asker tüketimini saatlik toplam olarak gir. Depo sınırı hesaba katılmaz.</p></section>'+
 '<div class="hp-sources">Veri modeli: mevcut AhirTools Binalar sayfasındaki T4.6 referans eğrisi. Sunucuya göre değerler farklı olabilir. <a href="https://support.travian.com/en/articles/33-buildings-and-resource-fields-statistics" target="_blank" rel="noopener noreferrer">Resmî bina istatistikleri</a> · <a href="https://support.travian.com/en/articles/214-guide-resources-explained" target="_blank" rel="noopener noreferrer">Hammadde kuralları</a></div>';
let selected=layouts[0].map(count=>Array(count).fill(0));
function renderFields(){
 $("hp-fields").innerHTML=resources.map((r,i)=>'<div class="hp-field-card"><h3>'+icon(i)+' '+r[1]+' <span>'+selected[i].length+' alan</span></h3><div class="hp-field-levels">'+selected[i].map((level,j)=>'<label>'+ (j+1)+'. alan<select data-resource="'+i+'" data-field="'+j+'" aria-label="'+r[1]+' '+(j+1)+'. alan seviyesi">'+fieldLevels()+'</select></label>').join("")+'</div></div>').join("");
 $("hp-fields").querySelectorAll("select").forEach(el=>{el.value=String(selected[Number(el.dataset.resource)][Number(el.dataset.field)]);});
}
function readConsumption(id){const v=Number($(id).value);return Number.isFinite(v)?Math.min(1000000000,Math.max(0,Math.floor(v))):0;}
function render(){
 const speed=Number($("hp-speed").value);
 $("hp-reference").innerHTML=levels.map(level=>{
  const value=fieldRate(level,speed);
  return '<tr><th scope="row">'+level+'</th>'+resources.map(()=>'<td>'+fmt(value)+'</td>').join("")+'<td class="hp-delta">'+(level?'+'+fmt(value-fieldRate(level-1,speed)):'—')+'</td></tr>';
 }).join("");
 const gross=selected.map(xs=>sum(xs.map(l=>fieldRate(l,speed))));
 const use=[0,0,0,readConsumption("hp-pop")+readConsumption("hp-upkeep")];
 const net=gross.map((v,i)=>v-use[i]);
 const row=(label,g,u,n)=>'<tr><th scope="row">'+label+'</th><td>'+fmt(g)+'</td><td>'+fmt(u)+'</td><td class="'+(n<0?"hp-negative":"hp-net")+'">'+fmt(n)+'</td><td class="'+(n<0?"hp-negative":"")+'">'+fmt(n*24)+'</td></tr>';
 $("hp-results").innerHTML=resources.map((r,i)=>row(icon(i)+' '+r[1],gross[i],use[i],net[i])).join("")+row("Toplam",sum(gross),sum(use),sum(net));
}
$("hp-speed").addEventListener("change",render);
$("hp-layout").addEventListener("change",e=>{
 const layout=layouts[Number(e.target.value)];if(!layout)return;
 selected=layout.map((count,i)=>Array.from({length:count},(_,j)=>selected[i][j]??0));
 $("hp-all").value="";renderFields();render();
});
$("hp-all").addEventListener("change",e=>{
 if(e.target.value==="")return;
 const level=Number(e.target.value);if(!levels.includes(level))return;
 selected=selected.map(xs=>xs.map(()=>level));renderFields();render();
});
$("hp-fields").addEventListener("change",e=>{
 const el=e.target.closest("select[data-resource]");if(!el)return;
 const level=Number(el.value);if(!levels.includes(level))return;
 selected[Number(el.dataset.resource)][Number(el.dataset.field)]=level;$("hp-all").value="";render();
});
["hp-pop","hp-upkeep"].forEach(id=>$(id).addEventListener("input",render));
renderFields();render();
})();
