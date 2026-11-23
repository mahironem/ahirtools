/* AhirTools Portal preview — navigation/layout only, no game data access. */
(function () {
  "use strict";
  const data = window.AHIR_PORTAL;
  if (!data) return;
  const page = data.pages.find(p => p.id === document.body.dataset.page) || data.pages[0];
  const root = document.getElementById("app");
  const byPath = path => data.pages.find(p => p.path === path);
  const esc = val => String(val == null ? "" : val).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ico = (name, className) => '<i data-lucide="' + esc(name || 'circle') + '" class="' + (className || '') + '"></i>';
  const pageUrl = p => esc(p.path);
  const status = p => p.status === "available" ? '<span class="status-tag existing">Kullanıma açık</span>' : p.status === "existing" ? '<span class="status-tag existing">Çalışan araç</span>' : '<span class="status-tag planned">Geliştiriliyor</span>';
  const metaLink = (p, className) => '<a class="' + (className || "nav-leaf") + (p.id === page.id ? ' active' : '') + '" href="' + pageUrl(p) + '">' + ico(p.icon) + '<span>' + esc(p.title) + '</span>' + (["existing","available"].includes(p.status) ? '<span class="status-dot" title="Mevcut panelde çalışıyor"></span>' : '') + '</a>';
  function menu() {
    const html = data.sections.map(s => {
      const selected = page.path.startsWith(s.path);
      const main = '<a class="section-overview" href="' + esc(s.path) + '">Genel bakış</a>';
      let inside;
      if(s.subgroups.length){
        inside = s.subgroups.map(g => {
          const isGroup = page.path.startsWith(g.path);
          return '<details class="nav-subgroup"' + (isGroup ? ' open' : '') + '><summary>' +
            ico(g.icon) + '<span>' + esc(g.title) + '</span>' + ico('chevron-down','chevron') +
            '</summary><div class="nav-leaves">' + g.items.map(it => metaLink(it)).join('') + '</div></details>';
        }).join('');
      } else inside = '<div class="nav-leaves">' + s.items.map(it => metaLink(it)).join('') + '</div>';
      return '<details class="nav-section"' + (selected ? ' open' : '') + '><summary>' +
        ico(s.icon) + '<span>' + esc(s.title) + '</span>' + ico('chevron-down','chevron') +
        '</summary><div class="nav-section-content">' + main + inside + '</div></details>';
    }).join("");
    return '<nav aria-label="Ana menü"><a href="/portal/" class="home-nav' +
      (page.id === "home" ? ' active' : '') + '">' + ico('layout-dashboard') + '<span>Ana Sayfa</span></a>' +
      '<div class="nav-section-heading">ARAÇLAR</div>' + html + '</nav>';
  }
  function smallCard(p) {
    return '<a href="' + pageUrl(p) + '" class="tool-card">' +
      '<div class="tool-top">' + ico(p.icon) + status(p) + '</div>' +
      '<div class="tool-title">' + esc(p.title) + '</div><p>' + esc(p.description) + '</p>' +
      '<span class="tool-link">Sayfayı aç ' + ico('arrow-up-right') + '</span></a>';
  }
  function statCard(icon,val,label){
    return '<div class="metric">' + ico(icon) + '<div class="metric-value">' + esc(val) + '</div><div class="metric-label">' + esc(label) + '</div></div>';
  }
  function homeContent(){
    const highlights = ['birlik','yagma','harita','hesaplayicilar','tablolar','hesap'];
    const cards = highlights.map(sl => byPath('/portal/'+sl+'/')).filter(Boolean);
    const working = data.pages.filter(p=>p.status === 'existing');
    return '<section class="hero"><div class="hero-sheen"></div><div class="hero-copy">' +
      '<span class="eyebrow">' + ico('sparkles') + ' AHIRTOOLS YENİ PLATFORM ÖNİZLEMESİ</span>' +
      '<h1>Birliğin için <em>daha akıllı</em> bir merkez.</h1>' +
      '<p>Operasyonları planla, oyuncuları koordine et, haritayı analiz et. ' +
      'Travian araçlarını tek bir modern çalışma alanında bir araya getiriyoruz.</p>' +
      '<div class="hero-actions"><a class="button primary" href="/portal/birlik/">' + ico('shield') + ' Birlik Yönetimi</a>' +
      '<a class="button subtle" href="/" target="_blank" rel="noopener">' + ico('external-link') + ' Mevcut Çalışan Panel</a></div>' +
      '</div><div class="hero-symbol" aria-hidden="true">' + ico('swords') + '</div></section>' +
      '<section class="metrics">'+statCard('panels-top-left','8','Ana modül')+
      statCard('layers','2','Birlik yönetim modeli')+
      statCard('check-circle-2',String(working.length),'Mevcut çalışan araç')+
      statCard('shield-check','Ayrı','Test ortamı')+'</section>' +
      '<section class="section-block"><div class="section-title"><div><span class="eyebrow">KEŞFET</span><h2>İhtiyacın olan araçlar, tek platformda</h2></div>' +
      '<span class="subtle-text">Menüleri açarak tüm alt sayfaları görebilirsin.</span></div>' +
      '<div class="tools-grid">'+cards.map(smallCard).join("")+'</div></section>' +
      '<section class="section-block"><div class="section-title"><div><span class="eyebrow">ÇALIŞAN SİSTEM</span><h2>Mevcut araçlarımız</h2></div></div>' +
      '<div class="working-strip">'+working.map(p=>'<a class="working-item" href="'+pageUrl(p)+'">'+ico(p.icon)+
      '<span>'+esc(p.title)+'</span>'+ico('arrow-right')+'</a>').join('')+'</div>' +
      '<p class="inline-info">' + ico('info') + ' Bu önizleme yalnızca yeni gezinme yapısını gösterir. ' +
      'Çalışan dört modül geçiş tamamlanana kadar eski panelde kullanılmaya devam eder.</p></section>' +
      '<section class="planning-grid"><div class="feature-panel"><div class="feature-icon">'+ico('globe')+'</div><h3>Sunucu seçimi</h3>' +
      '<p>Her kullanıcı oynadığı dünyayı seçebilecek. Ordu, harita ve operasyon verileri birbirine karışmayacak.</p>' +
      '<a href="/portal/hesap/oyun-dunyalarim/">Yol haritasını gör '+ico('arrow-right')+'</a></div>' +
      '<div class="feature-panel"><div class="feature-icon">'+ico('chart-no-axes-combined')+'</div><h3>7–8 günlük harita geçmişi</h3>' +
      '<p>Günlük nüfus farklarıyla pasif oyuncu adayları ve gelişim trendleri keşfedilebilecek.</p>' +
      '<a href="/portal/yagma/pasif-oyuncu-ara/">Yol haritasını gör '+ico('arrow-right')+'</a></div></section>';
  }
  function listing(items,intro){
    return '<div class="content-intro"><p>'+esc(intro || 'Bu bölümdeki araçlar ayrı adreslerle erişilebilir olacak.')+'</p></div>' +
      '<div class="tools-grid">'+items.map(it=>smallCard(byPath(it.path) || it)).join('')+'</div>';
  }
  function pageContent(){
    if(page.id === "p-tablolar-binalar") return '<div id="build-calculator"></div>';
    if(page.kind === "home") return homeContent();
    if(page.kind === "section"){
      const s=data.sections.find(x=>x.path===page.path);
      if(s.subgroups.length) return listing(s.subgroups.map(g=>({path:g.path,title:g.title,icon:g.icon,description:page.description,status:'planned'})),page.description);
      return listing(s.items,page.description);
    }
    if(page.kind === 'subgroup'){
      const subgroup=data.sections.flatMap(s=>s.subgroups).find(g=>g.path===page.path);
      return listing(subgroup.items,page.description);
    }
    const existing=page.status === 'existing';
    const extra=page.id==='p-hesap-oyun-dunyalarim' ?
      '<div class="note-panel">'+ico('globe')+' <strong>Plan:</strong> Sunucu seçimi, dünya kimliği ve sunucuya özel kayıt ayrımı. Henüz gerçek sunucu değişimi yapılmaz.</div>' :
      page.id==='p-yagma-pasif-oyuncu-ara' || page.id==='p-harita-aktivite-analizi' ?
      '<div class="note-panel">'+ico('calendar-days')+' <strong>Plan:</strong> Son 7–8 günlük nüfus anlık görüntülerini saklamak ve değişimleri karşılaştırmak. Henüz veri arşivlenmez.</div>' :
      page.section === 'Birlik Yönetimi' && page.subsection === 'Ekip Ruhu' ?
      '<div class="note-panel">'+ico('shield-check')+' <strong>Güvenlik:</strong> Gerçek kullanıcı girişleri, roller ve sunucu tarafı veri izinleri kurulmadan gerçek birlik bilgileri burada açılmayacak.</div>' : '';
    return '<section class="detail-hero"><div class="detail-symbol">'+ico(page.icon)+'</div>'+
      (existing?'<span class="eyebrow">MEVCUT MODÜL — YENİ PORTALA TAŞINACAK</span>':'<span class="eyebrow">YOL HARİTASINDA</span>') +
      '<h1>'+esc(page.title)+'</h1><p>'+esc(page.description)+'</p>'+status(page)+'</section>' +
      (existing ?
       '<div class="feature-panel main-message"><div class="feature-icon">'+ico('check-circle-2')+'</div>'+
       '<h2>Bu araç mevcut AhirTools panelinde çalışıyor.</h2>'+
       '<p>Yeni portal iskeletini güvenle sınamak için çalışan modülü henüz taşımadık. '+
       'Geçiş aşamasında araç bağımsız sayfasına alınacak ve bu adres kalıcı giriş noktası olacak.</p>'+
       '<a class="button primary" href="/" target="_blank" rel="noopener">'+ico('external-link')+' Mevcut Çalışan Panele Git</a></div>' :
       '<div class="feature-panel main-message"><div class="feature-icon">'+ico('hammer')+'</div>'+
       '<h2>Bu araç geliştirme aşamasında.</h2><p>Yeni menü ve paylaşılabilir sayfa adresi hazır. '+
       'Özelliğin gerçek işlevleri ilerleyen geliştirme adımlarında eklenecek.</p>'+
       '<div class="milestones"><div>'+ico('check')+' Sayfa adresi ve menü hazır</div>'+
       '<div>'+ico('circle-dashed')+' Arayüz ve iş akışı</div>'+
       '<div>'+ico('circle-dashed')+' Hesaplama / veri bağlantısı ve test</div></div></div>') +
       extra +
       '<div class="next-links"><a class="button subtle" href="/portal/">'+ico('arrow-left')+' Ana sayfaya dön</a>'+
       '<a class="button subtle" href="/portal/birlik/">'+ico('shield')+' Birlik Yönetimi</a></div>';
  }
  function breadcrumbs(){
    const chain=[{path:'/portal/',title:'AhirTools'}];
    if(page.section){
      const sec=data.sections.find(s=>s.title===page.section);
      if(sec)chain.push({path:sec.path,title:sec.title});
    }
    if(page.subsection){
      const sub=data.sections.flatMap(s=>s.subgroups).find(s=>s.title===page.subsection);
      if(sub)chain.push({path:sub.path,title:sub.title});
    }
    if(page.kind!=='home' && page.kind!=='section' && page.kind!=='subgroup')chain.push(page);
    if(page.kind==='section')chain.push({path:page.path,title:page.title});
    if(page.kind==='subgroup')chain.push({path:page.path,title:page.title});
    return chain.map((a,i)=>i===chain.length-1?'<span>'+esc(a.title)+'</span>':'<a href="'+esc(a.path)+'">'+esc(a.title)+'</a>'+ico('chevron-right')).join('');
  }
  root.innerHTML='<div class="app-shell">' +
    '<div class="scrim" id="scrim"></div><aside class="sidebar" id="sidebar">' +
      '<a class="brand" href="/portal/"><span class="brand-emblem">'+ico('swords')+'</span><span><strong>AHIR<span>TOOLS</span></strong><small>TRAVIAN COMMAND CENTER</small></span></a>'+
      '<div class="sidebar-scroll">'+menu()+'</div>'+
      '<div class="sidebar-footer"><div class="preview-mark">'+ico('flask-conical')+' <span>Platform önizlemesi</span></div>'+
      '<a href="/portal/hesap/yardim/" class="footer-link">'+ico('circle-help')+' Yardım ve geri bildirim</a></div>'+
    '</aside><div class="app-main"><header class="topbar">' +
      '<div class="topbar-left"><button class="icon-button menu-button" id="menu-toggle" aria-label="Menüyü aç">'+ico('menu')+'</button>'+
      '<div class="top-breadcrumbs">'+breadcrumbs()+'</div></div>'+
      '<div class="topbar-right"><button class="server-picker" id="server-picker" title="Sunucu seçimi henüz geliştirme aşamasında">'+ico('globe')+'<span>Sunucu seçimi <small>yakında</small></span>'+ico('chevron-down')+'</button>'+
      '<button class="icon-button theme-button" id="theme-toggle" title="Açık / koyu tema" aria-label="Temayı değiştir">'+ico('sun-moon')+'</button>'+
      '<a class="profile-button" href="/portal/hesap/profilim/" title="Profil (geliştirme aşamasında)">'+ico('user-round')+'<span>Profil</span></a></div></header>'+
      '<main class="page-content"><div class="page-heading"><div><div class="section-kicker">AHIRTOOLS PLATFORM</div>'+
      (page.id==="home"?'':'<h1 class="page-title">'+esc(page.title)+'</h1>')+'</div><span class="environment-tag">'+ico('shield-check')+' TEST / ÖNİZLEME</span></div>'+
      pageContent()+'</main><footer class="site-footer"><span>© AhirTools · Yeni platform önizlemesi</span><span>Bu arayüz henüz gerçek verilere bağlı değildir.</span></footer></div></div>' +
      '<div id="server-modal" class="server-modal" hidden><div class="server-dialog" role="dialog" aria-modal="true" aria-labelledby="server-title"><button class="close-dialog icon-button" id="server-close" aria-label="Kapat">'+ico('x')+'</button>'+
      '<div class="feature-icon">'+ico('globe')+'</div><h2 id="server-title">Oyun dünyası seçimi</h2><p>Hangi Travian sunucusunda oynadığını seçebileceğin alanı hazırlıyoruz. Şimdilik sunucu değiştirmek veya veri taşımak mümkün değil.</p>'+
      '<a class="button primary" href="/portal/hesap/oyun-dunyalarim/">Planlanan sayfayı gör</a></div></div>';
  const sidebar=document.getElementById("sidebar");
  const scrim=document.getElementById("scrim");
  function closeMenu(){sidebar.classList.remove("open");scrim.classList.remove("visible");}
  document.getElementById("menu-toggle").addEventListener("click",()=>{sidebar.classList.toggle("open");scrim.classList.toggle("visible");});
  scrim.addEventListener("click",closeMenu);
  const modal=document.getElementById("server-modal");
  document.getElementById("server-picker").addEventListener("click",()=>{modal.hidden=false;});
  document.getElementById("server-close").addEventListener("click",()=>{modal.hidden=true;});
  modal.addEventListener("click",e=>{if(e.target===modal)modal.hidden=true;});
  document.addEventListener("keydown",e=>{if(e.key==='Escape'){modal.hidden=true;closeMenu();}});
  function applyTheme(t){document.documentElement.dataset.theme=t;localStorage.setItem("ahirtools-portal-theme",t);}
  const prior=localStorage.getItem("ahirtools-portal-theme");
  document.documentElement.dataset.theme=(prior==="light"?"light":"dark");
  document.getElementById("theme-toggle").addEventListener("click",()=>{
    applyTheme(document.documentElement.dataset.theme==="light"?"dark":"light");
  });
  if(window.lucide)window.lucide.createIcons();
})();
