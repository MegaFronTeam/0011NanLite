Dropzone.autoDiscover = false;
const JSCCommon = {
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			keyboard: {
				CLOSE: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				// PLAY_START: "Start slideshow",
				// PLAY_STOP: "Pause slideshow",
				// FULL_SCREEN: "Full screen",
				// THUMBS: "Thumbnails",
				// DOWNLOAD: "Download",
				// SHARE: "Share",
				// ZOOM: "Zoom"
			},
			//
			//infinite: false,
			on: {
				initCarousel: () => {
					$('.header').addClass('has-pe');
				},
				destroy: () => {
					$('.header').removeClass('has-pe');
					console.log(this);
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		// $.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	// tabs  .
	tabscostume(tab) {
		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					//turn off old
					let oldActiveEl = element.closest(`.${tab}`).querySelector(`.${tab}__btn.active`);
					let oldActiveContent = tabs.Content[index].closest(`.${tab}`).querySelector(`.${tab}__content.active`);

					oldActiveEl.classList.remove('active');
					oldActiveContent.classList.remove('active')

					//turn on new(cklicked el)
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	//taken from good planet
	customRange() {
		$(".range-wrap").each(function () {
			let _this = $(this);
			var $d3 = _this.find(".slider-js");

			var slider = $d3.ionRangeSlider({
				skin: "round",
				type: "double",
				grid: false,
				grid_snap: false,
				hide_min_max: true,
				hide_from_to: true,
				onStart: function (data) {
					_this.find('.minus').val(data.from);
					_this.find('.plus').val(data.to);
				},
				onChange: function (data) {
					_this.find('.minus').val(data.from);
					_this.find('.plus').val(data.to);
				},
				onFinish: function (data) {
					_this.find('.minus').val(data.from);
					_this.find('.plus').val(data.to);
				},
				onUpdate: function (data) {
					_this.find('.minus').val(data.from);
					_this.find('.plus').val(data.to);
				}
			});
			var $d3_instance = slider.data("ionRangeSlider");
			$(this).on('change  input  cut  copy  paste', '.minus', function () {
				var th = $(this);
				var data = th.val();
				var min = +data;
				// th.val(data + ' т')
				console.log(1);
				$d3_instance.update({
					from: min,
				})
			});

			$(this).on('change  input  cut  copy  paste', '.plus', function () {
				var th = $(this);
				var data = th.val();
				var max = +data;

				//max => new val of max inp
				//min => value of the min inp

				let min = Number(document.querySelector('.range-result.range-result--minus.minus').value);
				if (min >= max) {
					min = 0;
					$d3_instance.update({
						from: min,
						to: max,
					});
				}
				else {
					$d3_instance.update({
						to: max,
					});
				}
			});
			// $d3.on("change", function () {
			// 	var $inp = $(this);
			// 	var from = $inp.prop("value"); // reading input value
			// 	var from2 = $inp.data("from"); // reading input data-from attribute

			// 	_this.find('range-result--minus').val(from); // FROM value
			// 	_this.find('range-result--plus').val(from); // FROM value
			// });


		})
	},
	//taken from good planet
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.customRange();

	// JSCCommon.CustomInputFile();
	var x = window.location.host;
	let screenName = '06-1-768.png';
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// modal window

	//luckyone js
	let defaultSl = {
		loop: true,
		loopedSlides: 5, //looped slides should be the same
		lazy: {
			loadPrevNextAmount: 5,
			loadPrevNext: true,
		},
	};

	//ccs vars
	let topLine = document.querySelector(".topLine--js");
	let topNav = document.querySelector(".top-nav--js");
	let buyBl = document.querySelector(".buy-bl--js");

	function calctopLineHeight() {
		document.documentElement.style.setProperty('--top-line-h', `${topLine.offsetHeight}px`);
		document.documentElement.style.setProperty('--top-nav-bot', `${topNav.offsetHeight + topLine.offsetHeight}px`);
		if (buyBl){
			document.documentElement.style.setProperty('--buy-bl-h', `${buyBl.offsetHeight}px`);
		}
	}

	window.addEventListener('resize', calctopLineHeight, { passive: true });
	window.addEventListener('scroll', calctopLineHeight, { passive: true });
	calctopLineHeight();

	//mob menu
	$('.burger--js').click(function (){
		$(this).toggleClass('active');
		$('body').toggleClass('fixed2');
		$('.mob-menu--js').toggleClass('active');
		calctopLineHeight();
	});
	//submenu
	$('.has-dd-js').click(function (){
		$(this.parentElement).find('.submenu-js').addClass('active');
		$('.mob-menu--js').addClass('overflow-hidden');
	});
	$('.has-subdd-js').click(function (){
		$(this.parentElement).find('.sub2menu-js').addClass('active');
	});
	$('.back-link-js').click(function (){
		$(this).closest('.submenu-js').removeClass('active');
		$('.mob-menu--js').removeClass('overflow-hidden');
	})
	$('.back2-link-js').click(function (){
		$(this).closest('.sub2menu-js').removeClass('active');
	})

	//
	let galleryTop = new Swiper('.gallery-top', {
		...defaultSl,
		spaceBetween: 30,
		slidesPerView: 1,
		whatOverflow: true,
		loop: true,
		autoplay: {
			delay: 2000,
		},
		//
		// navigation: {
		// 	nextEl: '.headerBlock .swiper-next',
		// 	prevEl: '.headerBlock .swiper-prev',
		// },
		//
		pagination: {
			el: '.headerBlock .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	//
	const catalogSection = document.querySelectorAll('.sCatalog');
	for (let sCatalog of catalogSection) {
		const sliderCatalog = new Swiper(sCatalog.querySelector('.sCatalog__slider--js'), {
			...defaultSl,
			loop: false,
			spaceBetween: 30,
			preloadImages: false,
			lazy: true,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			navigation: {
				nextEl: sCatalog.querySelector('.swiper-next'),
				prevEl: sCatalog.querySelector('.swiper-prev'),
			},
		});
	}
	$(".sCatalog--familiar").each(function () {
		let sliderCatalog = new Swiper($(this).find(".sCatalog__slider--js"), {
			...defaultSl,
			spaceBetween: 30,
			preloadImages: false,
			lazy: true,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			navigation: {
				nextEl: $(this).find('.swiper-next'),
				prevEl: $(this).find('.swiper-prev'),
			},
		});
	});


	function makeDDGroup(qSelecorts){
		for (let parentSelect of qSelecorts){
			let parents = document.querySelectorAll(parentSelect);

			if (parents){
				// childHeads, kind of funny))
				for (const parent of parents) {
					let ChildHeads = parent.querySelectorAll('.dd-head-js');

					$(ChildHeads).click(function (){
						let clickedHead = this;

						$(ChildHeads).each(function (){
							if (this === clickedHead){
								//parent element gain toggle class, style head change via parent
								$(this.parentElement).toggleClass('active');
								$(this.parentElement).find('.dd-content-js').slideToggle(function (){
									$(this).toggleClass('active');
								});
							}
							// else{
							// 	$(this.parentElement).removeClass('active');
							// 	$(this.parentElement).find('.dd-content-js').slideUp(function (){
							// 		$(this).removeClass('active');
							// 	});
							// }
						});
					});
				}

			}

		}
	}
	makeDDGroup([
		'.footer-dd-group-js',
		'.cat-aside-dd-js',
		'.mob-menu-dd-js',
		'.pa-orders-dd-js',
		'.delivery-group-dd-js',
		'.order-content-dd-js',
		'.filter-dd-js',
		'.property-dd-js'
	]);

	//filter custom pop-up
	$('.filter-bar-btns .filter-bar-btns__filter-btn').click(function () {
		$('body').addClass('stop-scrolling');
		$('.filter-bl').addClass('filter-visiable');
	});
	$('.filter-bl__back-btn').click(function () {
		closeFilterPopUp();
	});
	function closeFilterPopUp() {
		$('body').removeClass('stop-scrolling');
		$('.filter-bl').removeClass('filter-visiable');
	}
	function closeFiltersOnResize() {
		if (window.matchMedia("(min-width: 992px)").matches) {
			closeFilterPopUp();
		}
	}
	window.addEventListener('resize', closeFiltersOnResize, {
		passive: true,
	});
	// dropzone
	$("#props-dz").dropzone({
		url: "/file/post",
		dictDefaultMessage: 'Перенесите сюда файл или выберите на компьютере',
	});

	//prodCard
	// $('.pc-sliders--js').each(function (){
	// 	let self = this;

	// 	let prodCardThumb = new Swiper($(self).find('.sProdCard-thumb-js'), {
	// 		slidesPerView: 'auto',
	// 		breakpoints: {
	// 			0: {
	// 				direction: 'horizontal',
	// 				spaceBetween: 16,
	// 			},
	// 			768: {
	// 				direction: 'vertical',
	// 				spaceBetween: 20,
	// 			},
	// 		},

	// 		//lazy
	// 		lazy: {
	// 			loadPrevNext: true,
	// 			loadPrevNextAmount: 6,
	// 		},
	// 	});

	// 	let prodCardSlider = new Swiper($(self).find('.sProdCard-slider-js'), {
	// 		spaceBetween: 30,
	// 		thumbs: {
	// 			swiper: prodCardThumb,
	// 		},
	// 		lazy: {
	// 			loadPrevNext: true,
	// 			loadPrevNextAmount: 3,
	// 		},
	// 		loop: true,
	// 	});
	// });


	let pcSliders = document.querySelectorAll('.pc-sliders--js');

	for (let pcSlider of pcSliders) {
		const prodCardThumb = new Swiper(pcSlider.querySelector('.sProdCard-thumb-js'), {
			slidesPerView: 'auto',
			slideToClickedSlide: true,
			breakpoints: {
				0: {
					direction: 'horizontal',
					spaceBetween: 16,
				},
				768: {
					// direction: 'vertical',
					spaceBetween: 20,
				},
				992: {
					// direction: 'vertical',
					slidesPerView: 7,
					spaceBetween: 20,
				},
			},
			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 6,
			},
		});
		let prodCardSlider = new Swiper(pcSlider.querySelector('.sProdCard-slider-js'), {
			spaceBetween: 30,
			slideToClickedSlide: true,
			// navigation: {
			// 	nextEl: '.pc-sliders .swiper-next',
			// 	prevEl: '.pc-sliders .swiper-prev',
			// },
			thumbs: {
				swiper: prodCardThumb,
			},
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 3,
			},
			// loop: true,
		});
		prodCardSlider.controller.control = prodCardThumb;
	}

	// for (let pcSlider of pcSliders) {
	// }
	//minislider
	let miniSlider = new Swiper('.mini-slider-js', {
		...defaultSl,
		spaceBetween: 20,
		slidesPerView: 1,
		//
		pagination: {
			el: ('.sProdCard .swiper-pagination'),
			type: 'bullets',
			clickable: true,
		},
	});
	//floating bar
	$('.buy-bl-toggle-js').click(function (){
		$('.buy-bl--js').toggleClass('open');
	});


	let captionSlider = new Swiper('.prodTabs-caption-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true,
	});

	$('.plus-btn-js').click(function (){
		$(this).fadeOut();
		$('.has-plus-btn').removeClass('has-plus-btn');
	});
	//comparation
	let compareSlider = new Swiper('.sCompare-slider-js', {
		slidesPerView: 'auto',
		navigation: {
			nextEl: document.querySelector('.swiper-next'),
			prevEl: document.querySelector('.swiper-prev'),
		},
		breakpoints: {
			// when window width is >= 320px
			576: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		}
	});
	//new search
	let searchBtn = document.querySelector('.search-btn-js');
	$(searchBtn).click(function (){
		document.body.removeEventListener('click', removeSearchMissClick);

		if (this.classList.contains('active') && !event.target.closest('.search-dd--js')){
			$(this).removeClass('active');
		}
		else{
			$(this).addClass('active');
		}
		event.stopPropagation();
		document.body.addEventListener('click', removeSearchMissClick);
	});
	function removeSearchMissClick(){
		let target = event.target;

		if (!target.closest('.search-dd--js')){
			$(searchBtn).removeClass('active');
			document.body.removeEventListener('click', removeSearchMissClick);
		}
	}
	window.addEventListener('scroll', function (){
		$(searchBtn).removeClass('active');
	}, {passive: true});


	//end luckyone js


	var allPanels = $('.cat-aside__items');
	allPanels.hide();
	$('.cat-aside__header').click(function() {
		$('.cat-aside').toggleClass('active');
		allPanels.slideToggle();
	});


	let slidersPromotion = new Swiper((".sPromotion__slider--js"), {
		...defaultSl,
		spaceBetween: 0,
		// preloadImages: false,
		// lazy: true,
		slidesPerView: 1,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	


	let slidersServises = new Swiper((".sServises__slider--js"), {
		...defaultSl,
		spaceBetween: 0,
		// preloadImages: false,
		// lazy: true,
		loop: false,
		slidesPerView: 'auto',
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});


		// конечная дата
		let timer = $('.timer');
		let deadline;
		if(timer) {
			for(i=0; i<timer.length; i++) {
				deadline = new Date(timer[i].dataset.date);
			}
			let timerId = null;
			function declensionNum(num, words) {
				return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
			}
			function countdownTimer() {
				const diff = deadline - new Date();
				if (diff <= 0) {
					clearInterval(timerId);
				}
				const $daysAll = document.querySelectorAll('.timer__days');
				const $hoursAll = document.querySelectorAll('.timer__hours');
				const $minutesAll = document.querySelectorAll('.timer__minutes');
				const $secondsAll = document.querySelectorAll('.timer__seconds');
				for (const $days of $daysAll) {
					const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
					$days.textContent = days < 10 ? '0' + days : days;
					$days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
				}
				for (const $hours of $hoursAll) {
					const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
					$hours.textContent = hours < 10 ? '0' + hours : hours;
					$hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
				}
				for (const $minutes of $minutesAll) {
					const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
					$minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
					$minutes.dataset.title = declensionNum(minutes, ['мин', 'мин', 'мин']);
				}
				for (const $seconds of $secondsAll) {
					const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
					$seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
					$seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
				}
			}
			countdownTimer();
			timerId = setInterval(countdownTimer, 1000);
		}
	let mapId= document.getElementById('map');
	if(mapId) {

		var myMap;

		// Дождёмся загрузки API и готовности DOM.
		ymaps.ready(init);

		function init () {
				// Создание экземпляра карты и его привязка к контейнеру с
				// заданным id ("map").
				myMap = new ymaps.Map('map', {
						// При инициализации карты обязательно нужно указать
						// её центр и коэффициент масштабирования.
						center:[55.74326143322644,37.65071609761125], // Москва
						zoom:12
				}),
				myPlacemark1 = new ymaps.Placemark([55.74326143322644,37.65071609761125], {
					// Свойства.
					hintContent: '',
					balloonContentHeader: "<img src='img/logo.png'>",
					balloonContentBody: "115419, Москва, 2-й Рощинский проезд, дом 8. БЦ&nbsp;&laquo;Серпуховской Двор&raquo;. офис 101. вход с&nbsp;основной проходной, внутр. тел 3046. ст. метро &laquo;Ленинский проспект&raquo;",
				}, {
					// Необходимо указать данный тип макета.
					iconLayout: 'default#image',
					// Своё изображение иконки метки.
					iconImageHref: 'img/svg/pin.svg',
					// Размеры метки.
					iconImageSize: [48, 48],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-5, -38]
				});
			myMap.geoObjects
				.add(myPlacemark1);
		}
	}

	$(document).on("click", ".btn-more-js", function (e) {
		e.preventDefault();
		console.log(this)  
		$(".prod-rews").find(".sArticle__b-item:hidden").fadeIn().addClass("shown");
	})
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
