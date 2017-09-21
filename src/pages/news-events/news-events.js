import './news-events.styl';
import Video from '../../components/video/video';
import Carousel from '../../components/carousel/carousel';

$(document).on('ready pjax:end', (e) => {
  $('.js-video').map((i, node) => new Video(node));
  $('.js-carousel').map((index, node) => new Carousel(node));
});