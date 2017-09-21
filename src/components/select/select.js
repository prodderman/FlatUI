import './select.styl';
import 'vendors/formstyler/jquery.formstyler.min.js';
import 'vendors/formstyler/jquery.formstyler.css';

export default class Select {
  constructor(node) {
    this.select = $(node);
    this.init();
  }

  init() {
    $('select').styler();
  }
}

$(() => {
  $('.js-select').map((index, node) => new Select(node));
});