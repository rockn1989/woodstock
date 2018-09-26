'use strict';

$(function() {	

	/*______ Fancybox ______*/

$('a.insp-group').click(function() {
    
    $.fancybox.open( $('.inspiration-modal').get(), {
        'type':'inline',
        'overlayShow': true,
        'overlayOpacity': 0.7,
        'overlayColor': '#666',
        'overlayColor': '#666',
        'showNavArrows': true,
        'titleShow': false
    });
});


/*	$('a.insp-group').fancybox({
		'type' : 'inline',
		'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600, 
		'speedOut'		:	200, 
		'overlayShow'	:	true,
		'showNavArrows': true
	});*/


	/*______ Ленивая загрузка картинок ______*/

	$('.lazy').lazy({
			// your configuration goes here
			scrollDirection: 'vertical',
			effect: 'fadeIn',
			visibleOnly: true,
			placeholder: "img/ajax-loader.gif",
			onError: function(element) {
					console.log('error loading ' + element.data('src'));
			}
	});

	/*______ Показывать форму на мобильных устройствах ______*/

	var $mobileForm = $('.mobile-form');

	$('.js__show-form').on('click', function (e) {
		e.preventDefault();
		$mobileForm.slideToggle('350').find('input').focus();
	})


	/*______ Маска формы ______*/

	$('.js__input-phone').mask('+7 999 999-99-99', {clearIfNotMatch: true}).focus(function (e) {
		if (!$(this).val()) {
			$(this).val('+7 ');
		}
	});


	/*______ Валидация формы ______*/

	if($('form').is('.default-form')) {

		$('.default-form').validate({
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				email: "Обязательноe поле",
			},
		});
	};


	/*______ Открытие мобильного подменю ______*/

	$('.js__menu-sublist-toggle').on('click', function (e) {
		e.preventDefault();
		var self = $(this),
			blockParent = self.parent('a'),
			siblingsList = blockParent.siblings('.menu-sublist');

		if(blockParent.hasClass('open')) {
			siblingsList.stop().slideUp('350', function () {
				blockParent.removeClass('open');
			});
		} else {
			siblingsList.stop().slideDown('350', function () {
				blockParent.addClass('open');
			});
		}

		self.toggleClass('open');
	});


	/*______ Открытие мобильного подменю в футере ______*/

	$('[data-role="toggle-list"] i').on('click', function (e) {
		e.preventDefault();
		var self = $(this),
			blockParent = self.parent('[data-role="toggle-list"]'),
			siblingsList = blockParent.parent().find('.footer__list');

		self.toggleClass('open');
		siblingsList.stop().slideToggle('350');
	});


	/*______ Отключение UIKIT анимации для мобильных устройств ______*/

/*	UIkit.on('beforeready.uk.dom', function () {
		if (UIkit.$win.width() < 767 && $('html').hasClass('uk-touch')) {
			UIkit.$('[data-uk-scrollspy]').removeAttr('data-uk-scrollspy');
		};
	});*/


	/*______ Полифил для Object-fit ______*/
	
	objectFitImages();


	/*______ Полифил для SVG ______*/

	/*svg4everebody();*/

});


$(function () {
	$('.js-test').on('click', function(e){
		e.preventDefault();
		var redirect = $(this).attr('href');
		$('.first-screen').addClass('load');
		$('.first-screen').on('transitionend', function () {
			$(this).addClass('loaded');
			setTimeout(function () {
				window.location = redirect;
			}, 1500)
		});		
	});
});

$(document).ready(function() {
	
	$('.js__preload').on('click', function(e){
		e.preventDefault();
		var redirect = $(this).attr('href');
		$('.preloader').addClass('reload');
		$('.preloader').on('transitionend', function () {
			$(this).addClass('loaded');
			setTimeout(function () {
				window.location = redirect;
			}, 1500)
		});		
	});

	$('.preloader').removeClass('load');
	$('.preloader').addClass('loaded');
	$('.preloader.loaded').on('transitionend', function () {
		//$('.preloader').css('display','none');
		$('body').removeClass('load');
		$('.preloader').remove()
	});
	
});
