
// script.js

// 必要な要素をHTMLから取得
const hamburger = document.querySelector('.nav-hamburger');
const closeBtn = document.querySelector('.close-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks = document.querySelectorAll('.mobile-menu a');

// ハンバーガーボタン（三本線）をクリックしたら、メニューに「is-open」クラスをつける
if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
  });
}

// × ボタンをクリックしたら、メニューから「is-open」クラスを外す
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
}

// メニュー内のリンクをクリックしたら、メニューを閉じる（ページ内アンカーリンク等への移動対策）
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
});

// スクロール時にヘッダーの見た目を変える制御
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  // 10px以上スクロールしたらクラスを追加、上に戻ったら削除
  if (window.scrollY > 10) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
});


function initNeuralCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 70;
  const CONNECTION_DIST = 160;
  const ACCENT = { r: 198, g: 40, b: 40 };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
      op: Math.random() * 0.45 + 0.15,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${particles[i].op})`;
      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', init);
}

initNeuralCanvas('top-canvas');

// スマホでバブルビューアを画面幅に合わせて動的スケール
// バブルのCSS座標は左600px×560pxの範囲に収まる設計
function fitHeroViewer() {
  const viewer = document.querySelector('.hero-container .hero-synapse-viewer');
  if (!viewer) return;

  if (window.innerWidth <= 768) {
    const W = 600; // モバイルのバブル配置が収まる幅
    const H = 560; // モバイルのバブル配置が収まる高さ
    const leftPad = 24; // hero-containerの左パディング
    const availW = window.innerWidth - leftPad;
    const scale = Math.min(1, availW / W); // 1超え（拡大）を防ぐ

    viewer.style.width           = W + 'px';
    viewer.style.height          = H + 'px';
    viewer.style.aspectRatio     = 'unset';
    viewer.style.transform       = `scale(${scale})`;
    viewer.style.transformOrigin = 'left top';
    viewer.style.marginBottom    = `-${H * (1 - scale)}px`;
  } else {
    // デスクトップ：JSのインラインスタイルをリセットしてCSSに戻す
    ['width','height','aspectRatio','transform','transformOrigin','marginBottom']
      .forEach(p => { viewer.style[p] = ''; });
  }
}

fitHeroViewer();
window.addEventListener('resize', fitHeroViewer);

// Hero carousel: 5秒ごとに synapse → Results → SERVICE → siranuí とサイクル
const heroSection = document.querySelector('.hero-section');
const slideResults = document.querySelector('.hero-synapse-viewer.hero-slide-results');
const slideService = document.querySelector('.hero-synapse-viewer.hero-slide-service');
const slideSiranui = document.querySelector('.hero-synapse-viewer.hero-slide:not(.hero-slide-results):not(.hero-slide-service)');

if (heroSection && slideResults && slideService && slideSiranui) {
  let currentSlide = 0; // 0=synapse, 1=Results, 2=SERVICE, 3=siranuí

  function switchHeroSlide() {
    currentSlide = (currentSlide + 1) % 4;

    heroSection.classList.remove('slide-2-active');
    slideResults.classList.remove('is-active');
    slideService.classList.remove('is-active');
    slideSiranui.classList.remove('is-active');

    if (currentSlide === 1) {
      heroSection.classList.add('slide-2-active');
      slideResults.classList.add('is-active');
    } else if (currentSlide === 2) {
      heroSection.classList.add('slide-2-active');
      slideService.classList.add('is-active');
    } else if (currentSlide === 3) {
      heroSection.classList.add('slide-2-active');
      slideSiranui.classList.add('is-active');
    }
  }

  setInterval(switchHeroSlide, 5000);
}


