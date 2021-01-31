// ++++++++++ Фильтр для элементов в Portfolio +++++++++++

var containerEl = document.querySelector('.container');
var mixer = mixitup(containerEl);


// Изменение цвета фона активной кнопки

$('.button').click(function() {
  $('.button').removeClass('button--active');
  $(this).addClass('button--active');
});
