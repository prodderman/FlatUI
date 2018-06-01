import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
import $ from 'jquery';
import './carousel.styl';

export class Carousel {
  constructor(node) {
    this.$carousel = $(node);
    this._init();
  }

  _init() {
    const $swiperContainer = this.$carousel.find('.js-carousel__container');
    const $swiperWrapper = this.$carousel.find('.js-carousel__wrapper');
    const $height = $swiperWrapper.height();
    
    $swiperWrapper.children().map((index, node) => {
      $(node).wrap('<div class=\'carousel__slide swiper-slide\'></div>');
    });
    this.$carousel.height($height);
    new Swiper($swiperContainer, {
      slidesPerView: 2,
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 20,
      grabCursor: true,
      pagination: this.$carousel.find('.js-carousel__pagination').length > 0 ? this.$carousel.find('.js-carousel__pagination')[0] : false,
      nextButton: this.$carousel.find('.js-carousel__button_next').length > 0 ? this.$carousel.find('.js-carousel__button_next')[0] : false,
      prevButton: this.$carousel.find('.js-carousel__button_prev').length > 0 ? this.$carousel.find('.js-carousel__button_prev')[0] : false,
      scrollbar: this.$carousel.find('.js-carousel__scrollbar').length > 0 ? this.$carousel.find('.js-carousel__scrollbar')[0] : false,
      breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        640: {
          slidesPerView: 1
        }
      }
    }); 
  }
}

export default function render(isElementOnPage = false) {
  $(() => {
    $(isElementOnPage? '.js-pjax__container  .js-carousel' : '.js-carousel').map((index, node) => new Carousel(node));
  });
}