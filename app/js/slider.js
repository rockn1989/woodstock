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
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.big-slider .slider',
		dots: false,
		arrows: true,
		infinity: true,
		centerMode: false,
		lazyLoad: 'progressive',
		focusOnSelect: true,
		variableWidth: true,
		prevArrow: '<div class="btn-slide slick-prev"><i class="icon-arrow-left"></i></div>',
		nextArrow: '<div class="btn-slide slick-next"><i class="icon-arrow-right"></i></div>',
		responsive: [
		{
			breakpoint: 1245,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 768,
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
			breakpoint: 1245,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 2,
		}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
			}
		},
	]
	});


	 /*______ Modal slider ______*/


	 UIkit.util.on(document, 'show', '#inspiration-modal', function() {
	 	$('.modal-slider .slider').slick({
	 		slidesToShow: 1,
	 		arrows: true,
	 		variableHeight: true
	 	});
	 });

	 UIkit.util.on(document, 'hide', '#inspiration-modal', function() {
	 	$('.modal-slider .slider').slick('unslick');
	 });

});
