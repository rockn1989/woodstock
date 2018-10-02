'use strict';

$(function() {	

	/*______ Окончание загрузки страницы ______*/

	setTimeout(function () {
		$('body').removeClass('loading');
		$('.preloader').addClass('another-page');
	}, 800);


	/*______ Preloader для контентных картинок и фонов ______*/

	function preloadImg (targetElement) {

		var _self = $(targetElement);

		_self.each(function(i, el) {

			var imgSrc = $(el).find('[data-bg-preload]').css('background-image') || $(el).find('img');


			// Если картинка лежит фоном

			if(typeof imgSrc == 'string') {
				var src = imgSrc.replace(/(^url\()|(\)$|[\"\'])/g, ''),
					img = $('<img>').attr('src', src).on('load', function() {
						_self.removeClass('preload');
					});
			} else {

				// Если картинка лежит через тег img

				$.each(imgSrc, function (i, el) {
					var src = $(el).attr('src');
					$('<img>').attr('src', src).on('load', function() {
						_self.removeClass('preload')
					});
				});
			}

		});
	};


	preloadImg('div.preload');



	/*______ Fancybox ______*/

	var inspLinkArray = $('a.insp-group');

	$('a.insp-group').click(function() {

			$.fancybox.open( $('.inspiration-modal').get(), {
				selector : '.inspiration-modal',
				'type':'inline',
				'overlayShow': true,
				'overlayOpacity': 0.7,
				'overlayColor': '#666',
				'showNavArrows': true,
				'titleShow': false
			});

	});

	jQuery('input[type=text]').on('autofocus', function (e) {
		e.preventDefault();
		return false;
	});

	/*______ Автопроигрывание видео на главной ______*/

	if($('div').is('#video-banner')) {
		$("#video-banner")[0].play();
	}


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


	/*______ Открытие мобильного меню в каталоге ______*/

	$('.js__toggle-nav').on('click', function (e) {
		e.preventDefault()
		$(this).toggleClass('open');
		var wrapper = $(this).closest('div');
		wrapper.find('ul').stop(true, true).slideToggle('350')
	});


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


	/*______ Полифил для Object-fit ______*/
	
	objectFitImages();

	
});


/*______ Запуска анимации ухода со страницы по клику на ссылку ______*/

$(function () {
	$('.js__page-leave').on('click', function(e){
		e.preventDefault();
		var redirect = $(this).attr('href');
		$('body').addClass('loading');
		$('.preloader').addClass('page-leave');
		$('.preloader').on('transitionend', function () {
			window.location = redirect;
		});		
	});
});
