import './profile.styl';
import Calendar from '../../components/calendar/calendar';
import Button from '../../components/button/button';

$(document).on('ready pjax:end', (e) => {
  $('.js-calendar').map((index, node) => new Calendar(node));
  $('.js-btn').map((index, node) => new Button(node));
});