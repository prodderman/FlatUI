import './feedback.styl';
import Feedback from '../../components/form/form';
import Map from '../../components/map/map';
import Button from '../../components/button/button';

$(document).on('ready pjax:end', (e) => {
  $('.js-feedback').map((index, node) => new Feedback(node));
  $('.js-map').map((index, node) => new Map(node));
  $('.js-btn').map((index, node) => new Button(node));
});
