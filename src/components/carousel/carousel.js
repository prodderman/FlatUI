import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
import './carousel.styl';

export default class Carousel {
  constructor(node) {
    this.carousel = $(node);
    this.init();
  }

  init() {
    const swiperContainer = this.carousel.find('.carousel__container');
    const swiperWrapper = this.carousel.find('.carousel__wrapper');
    setTimeout(() => {
      const height = swiperWrapper.height();
      swiperWrapper.children().map((index, node) => {
        $(node).wrap( "<div class='carousel__slide swiper-slide'></div>" );
      });
      this.carousel.height(height);
      const swiper = new Swiper(swiperContainer, {
        slidesPerView: 2,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 20,
        grabCursor: true,
        pagination: this.carousel.find('.carousel__pagination').length > 0 ? this.carousel.find('.carousel__pagination')[0] : false,
        nextButton: this.carousel.find('.carousel__btn').length > 0 ? this.carousel.find('.carousel__btn-next')[0] : false,
        prevButton: this.carousel.find('.carousel__btn').length > 0 ? this.carousel.find('.carousel__btn-prev')[0] : false,
        scrollbar: this.carousel.find('.carousel__scrollbar').length > 0 ? this.carousel.find('.carousel__scrollbar')[0] : false,
      }); 
    }, 100);
  }
};

$(() => {
  $('.js-carousel').map((index, node) => new Carousel(node));
});