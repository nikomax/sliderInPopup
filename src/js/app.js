import sayHello from './lib/sayHello.js';
import $ from 'jquery';
import 'slick-carousel';
import './lib/popup.js';

$(document).ready(function() {
  $('.slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2
  });

  $('.single-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  var popupSlider = $('.single-slider');
  var popupParentId;
  var currentSlide;
  var slidesQuantity;
  var block;

  setTimeout(function() {
    $('.preview').find('.preview__item:not(.preview__item:first-child)').hide();
    if(window.location.hash) {
      $('.preview__item').hide();
      block = window.location.hash;
      console.log(block);
      $(block).show();
      $('.tab__link').removeClass('is-active');
      $(`[class="tab__link"][href="${block}"]`).addClass('is-active');
    }
    $('.single-slider').hide();
  }, 100);

  $(window).bind('hashchange', function() {
    $('.preview__item').hide();
    block = window.location.hash;
    $(block).show();
    $('.tab__link').removeClass('is-active');
    $(`[class="tab__link"][href="${block}"]`).addClass('is-active');
  });

  $('.more-btn').magnificPopup({
    items: [
      {
        src: '#my-popup',
        type: 'inline'
      }
    ],
    callbacks: {
      close: function() {
        popupSlider.hide();
        $(`[id="${popupParentId}"]`).find('.single-box').append(popupSlider);
        $('#my-popup').find('.popup-content').html('');
      }
    }
  });

  $('.single-slider').append('<div class="counter"><span class="current-slide"></span> / <span class="slides-quantity"></span></div>');

  $(popupSlider).on('afterChange', function() {
    currentSlide = $(this).slick('slickCurrentSlide');
    $(this).find('.current-slide').html(`${+currentSlide+1}`);
    $(this).find('.slides-quantity').html(`${slidesQuantity}`);
  });

  $('.more-btn').on('click', function() {
    popupParentId = $(this).parents('.preview__item').attr('id');
    popupSlider = $(this).parents('.preview__item').find('.single-slider');
    currentSlide = $(this).parents('.slick-slide').attr('data-slick-index');
    slidesQuantity = $(popupSlider).find('.slick-slide:not(.slick-cloned)').length;
    popupSlider.slick('slickGoTo', currentSlide);
    $('#my-popup').find('.popup-content').append(popupSlider);
    $(popupSlider).show();
    $(popupSlider).find('.current-slide').html(`${+currentSlide+1}`);
    $(popupSlider).find('.slides-quantity').html(`${slidesQuantity}`);
  });
});
sayHello();
