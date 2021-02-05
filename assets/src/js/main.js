// ++++++++++ Фильтр для элементов в Portfolio +++++++++++

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
  // autoplay: {
  //   delay: 3000,
  // },
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


