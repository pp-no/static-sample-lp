// 年号
$(function () {
	$('#year').text(new Date().getFullYear());
});

/* =========================================
   スムーススクロール（ヘッダー分オフセット）
========================================= */
$(document).on('click', '.js-scroll', function (e) {
	const href = $(this).attr('href');
	if (!href || href.charAt(0) !== '#') return;
	e.preventDefault();
	const $target = $(href);
	if (!$target.length) return;
	const offset = $('.header').outerHeight() || 0; // BEM: .site-header -> .header
	$('html, body').animate({ scrollTop: $target.offset().top - offset - 8 }, 420, 'swing');
});

/* =========================================
   FAQアコーディオン（アクセシブル）
========================================= */
$(document).on('click', '.faq__q', function () {
	// BEM: .faq-q -> .faq__q
	const $btn = $(this);
	const controls = $btn.attr('aria-controls');
	const $panel = $('#' + controls);
	const expanded = $btn.attr('aria-expanded') === 'true';

	$btn.attr('aria-expanded', !expanded);
	$panel.attr('aria-hidden', expanded);

	// 視覚効果（必要に応じて無効化OK）
	$panel.stop(true, true);
	if (expanded) {
		$panel.slideUp(200);
	} else {
		$panel.slideDown(200);
	}
});

/* =========================================
   ヘッダー影演出
========================================= */
$(window).on('scroll', function () {
	const y = window.scrollY || document.documentElement.scrollTop;
	$('.header').css('box-shadow', y > 8 ? '0 8px 24px rgba(0,0,0,.08)' : 'none'); // BEM: header.site-header -> .header
});

/* =========================================
   シンプルスライダー（BEM対応）
========================================= */
(function () {
	const $slider = $('.slider');
	if (!$slider.length) return;

	const $wrap = $slider.find('.slider__slides'); // was .slides
	const $slides = $wrap.children('.slider__slide'); // was .slide
	const count = $slides.length;
	let idx = 0,
		timer = null;

	// ドット生成
	const $dots = $slider.find('.slider__dots'); // was .dots
	$dots.empty();
	for (let i = 0; i < count; i++) {
		$dots.append(
			'<button class="slider__dot" data-i="' +
				i +
				'" aria-label="スライド ' +
				(i + 1) +
				'"></button>',
		);
	}
	const $dotButtons = $dots.children('.slider__dot').attr('type', 'button');
	$dotButtons.eq(0).addClass('slider__dot--active').attr('aria-current', 'true');

	function go(i) {
		idx = (i + count) % count;
		$wrap.css('transform', 'translateX(' + -100 * idx + '%)');
		$dotButtons
			.removeClass('slider__dot--active')
			.removeAttr('aria-current')
			.eq(idx)
			.addClass('slider__dot--active')
			.attr('aria-current', 'true');
	}

	$slider.find('.slider__btn--next').on('click', () => go(idx + 1)); // was .next
	$slider.find('.slider__btn--prev').on('click', () => go(idx - 1)); // was .prev

	$dots.on('click', '.slider__dot', function () {
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

/* =========================================
   Scroll Reveal (jQuery only, BEM Utility)
   .u-reveal に .u-reveal--visible を付与
========================================= */
(function () {
	const $win = $(window);
	const $reveals = $('.u-reveal'); // was .reveal
	const offsetShow = 0.5; // 画面の上から50%入ったら表示

	function inViewport($el) {
		if (!$el.length) return false;
		const rect = $el[0].getBoundingClientRect();
		const h = window.innerHeight || document.documentElement.clientHeight;
		const triggerY = h * (1 - (1 - offsetShow));
		return rect.top <= triggerY && rect.bottom >= 0;
	}

	function revealOnScroll() {
		$reveals.each(function () {
			const $el = $(this);
			if ($el.hasClass('u-reveal--visible')) return; // was is-visible
			if (inViewport($el)) $el.addClass('u-reveal--visible');
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
