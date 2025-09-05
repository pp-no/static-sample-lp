// 年号
$(function () {
	$('#year').text(new Date().getFullYear());
});

// スムーススクロール（ヘッダー分オフセット）
$(document).on('click', '.js-scroll', function (e) {
	const href = $(this).attr('href');
	if (!href || href.charAt(0) !== '#') return;
	e.preventDefault();
	const $target = $(href);
	if (!$target.length) return;
	const offset = $('.site-header').outerHeight() || 0;
	$('html, body').animate({ scrollTop: $target.offset().top - offset - 8 }, 420, 'swing');
});

// FAQアコーディオン（アクセシブル）
$(document).on('click', '.faq-q', function () {
	const $btn = $(this);
	const controls = $btn.attr('aria-controls');
	const $panel = $('#' + controls);
	const expanded = $btn.attr('aria-expanded') === 'true';
	$btn.attr('aria-expanded', !expanded);
	$panel.attr('aria-hidden', expanded);
	$panel.stop(true, true);
});

// ヘッダー影演出
$(window).on('scroll', function () {
	const y = window.scrollY || document.documentElement.scrollTop;
	$('header.site-header').css('box-shadow', y > 8 ? '0 8px 24px rgba(0,0,0,.08)' : 'none');
});

// シンプルスライダー
(function () {
	const $slider = $('.slider');
	if (!$slider.length) return;

	const $wrap = $slider.find('.slides');
	const $slides = $wrap.children();
	const count = $slides.length;
	let idx = 0,
		timer = null;

	// ドット生成
	const $dots = $slider.find('.dots');
	for (let i = 0; i < count; i++) {
		$dots.append('<button data-i="' + i + '" aria-label="スライド ' + (i + 1) + '"></button>');
	}
	const $dot = $dots.children().eq(0).addClass('active');

	function go(i) {
		idx = (i + count) % count;
		$wrap.css('transform', 'translateX(' + -100 * idx + '%)');
		$dots.children().removeClass('active').eq(idx).addClass('active');
	}

	$slider.find('.next').on('click', () => go(idx + 1));
	$slider.find('.prev').on('click', () => go(idx - 1));
	$dots.on('click', 'button', function () {
		go(+$(this).data('i'));
	});

	function autoplay() {
		clearInterval(timer);
		timer = setInterval(() => go(idx + 1), 3800);
	}
	autoplay();

	// フォーカスやホバーで一時停止
	$slider.on('mouseenter focusin', () => clearInterval(timer));
	$slider.on('mouseleave focusout', autoplay);
})();

/* ============================
   Scroll Reveal (jQuery only)
============================ */
(function () {
	const $win = $(window);
	const $reveals = $('.reveal');
	const offsetShow = 0.50; // 画面の上から50%入ったら表示

	function inViewport($el) {
		if (!$el.length) return false;
		const rect = $el[0].getBoundingClientRect();
		const h = window.innerHeight || document.documentElement.clientHeight;
		const triggerY = h * (1 - (1 - offsetShow)); // 50%手前でトリガー
		return rect.top <= triggerY && rect.bottom >= 0; // 少しでも見えたら
	}

	function revealOnScroll() {
		$reveals.each(function () {
			const $el = $(this);
			if ($el.hasClass('is-visible')) return;
			if (inViewport($el)) $el.addClass('is-visible');
		});
	}

	// スクロール/リサイズに反応（軽いスロットル）
	let ticking = false;
	function onScroll() {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(function () {
			revealOnScroll();
			ticking = false;
		});
	}

	// 初期表示・イベント登録
	revealOnScroll();
	$win.on('scroll resize', onScroll);
})();
