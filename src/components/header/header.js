import './header.styl';
import Search from '../search/search';

$(document).on('ready pjax:end', (e) => {
  $('.js-search').map((index, node) => new Search($(node)));
});
