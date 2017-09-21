import './feedback.styl';
import Feedback from '../../components/form/form';
import Map from '../../components/map/map';

$(document).on('ready pjax:end', (e) => {
  if (window.location.pathname === "/feedback.html") {
    $('.js-feedback').map((index, node) => new Feedback(node));
    $('.js-map').map((index, node) => new Map(node));
  }
});
