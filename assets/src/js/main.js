// ++++++++++ Фильтр для элементов в Portfolio +++++++++++

$(document).ready(function() {
  $('.button[filter="wd"]').click(function() {
    if($(this).attr('val') == 'off') {
      $('.button[filter]').attr('val', 'off');
      $(this).attr('val', 'on');
      $('.portfolio__img-block').hide(300);
      $('.portfolio__img-block[filter="wd"]').show(300);
    }
  });

  $('.button[filter="ud"]').click(function() {
    if($(this).attr('val') == 'off') {
      $('.button[filter]').attr('val', 'off');
      $(this).attr('val', 'on');
      $('.portfolio__img-block').hide(300);
      $('.portfolio__img-block[filter="ud"]').show(300);
    }
  });

  $('.button[filter="moc"]').click(function() {
    if($(this).attr('val') == 'off') {
      $('.button[filter]').attr('val', 'off');
      $(this).attr('val', 'on');
      $('.portfolio__img-block').hide(300);
      $('.portfolio__img-block[filter="moc"]').show(300);
    }
  });

  $('.button[filter="all"]').click(function() {
    if($(this).attr('val') == 'off') {
      // $('.button[filter]').attr('val', 'off');
      $(this).attr('val', 'on');
      // $('.portfolio__img-block').hide(300);
      $('.portfolio__img-block').show(300);
    }
  });
});
