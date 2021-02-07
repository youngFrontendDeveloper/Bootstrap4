// ++++++++++ Фильтр для элементов  mixitup  в Portfolio +++++++++++

var containerEl = document.querySelector('.container');
var mixer = mixitup(containerEl);


// Изменение цвета фона активной кнопки

$('.button').click(function() {
  $('.button').removeClass('button--active');
  $(this).addClass('button--active');
});


// Карусель
let mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
  slideToClickedSlide: true,
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  breakpoints: {
    540: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 10,
    }
  }
});

// Добавление класса для изменения порядка элементов

$(document).ready(function(){
  $('.blog__item:odd').addClass('reverse');
});


// Плавный переход для меню
$(function(){
  $('.menu__link').click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    $('.menu__link').removeClass('menu__link--active');
    $(this).addClass('menu__link--active');
    return false;
  });
});


// Кнопка вверх, -  исчезновение-появление

$(window).scroll(function() {
  if($(this).scrollTop() != 0) {
    $('.to-top').fadeIn();
  } else {
    $('.to-top').fadeOut();
  }
});

// Кнопка вверх, - пролистывание вверх
$('.to-top').on('click', function() {
  $('html, body').stop().animate({scrollTop : 0}, 300);
});


//Открытие-закрытие меню
$(document).ready(function(){
  if (document.documentElement.clientWidth < 768) {
    $('.menu').css({"display": "none"});
    $('.fa-bars').css({"display": "block"});

    $('.button-menu').click(function() {
      $('.menu').slideToggle(500);
      $('.fa-bars').toggle();
      $('.fa-times').toggle();
    });
  }
});