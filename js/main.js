
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


