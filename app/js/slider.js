'use strict';
$(function () {

	/*______ Detail product slider ______*/

	 $('.big-slider .slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		lazyLoad: 'progressive',
		asNavFor: '.preview-slider .slider',
		prevArrow: '<div class="btn-slide slick-prev"><i class="icon-arrow-left"></i></div>',
		nextArrow: '<div class="btn-slide slick-next"><i class="icon-arrow-right"></i></div>',
		responsive: [
		{
			breakpoint: 959,
			settings: {
			centerMode: true,
			centerPadding: '180px',
			}
		},
		{
			breakpoint: 767,
			settings: {
				centerMode: false,
				centerPadding: '0px',
			}
		},
	]
	});

	$('.preview-slider .slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.big-slider .slider',
		dots: false,
		infinity: true,
		centerMode: false,
		lazyLoad: 'progressive',
		focusOnSelect: true,
		variableWidth: true,
		responsive: [
		{
			breakpoint: 1245,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 1244,
			settings: {
				slidesToShow: 3,
		}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
			}
		},
	]
	});


	/*______ Products slider ______*/

	 $('.products-slider .slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		lazyLoad: 'progressive',
		centerPadding: '20px',
		prevArrow: '<div class="btn-slide slick-prev"><i class="icon-arrow-left"></i></div>',
		nextArrow: '<div class="btn-slide slick-next"><i class="icon-arrow-right"></i></div>',
		responsive: [
		{
			breakpoint: 959,
			settings: {
			centerMode: true,
			}
		},
		{
			breakpoint: 767,
			settings: {
				centerMode: false,
			}
		},
	]
	});

});
