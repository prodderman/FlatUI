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
    const height = swiperWrapper.height();
    swiperWrapper.children().map((index, node) => {
      $(node).wrap( "<div class='carousel__slide swiper-slide'></div>" );
    });
    this.carousel.height(height);
    swiperContainer.wrap( "<div class='carousel__wrap'></div>" );
    setTimeout(() => {
      const swiper = new Swiper(swiperContainer, {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 3,
        loop: true,
        pagination: '.carousel__pagination',
        nextButton: '.carousel__btn-next',
        prevButton: '.carousel__btn-prev',
        scrollbar: '.carousel__scrollbar',
      }); 
    }, 100);
  }
};

$(() => {
  $('.js-carousel').map((index, node) => new Carousel(node));
});