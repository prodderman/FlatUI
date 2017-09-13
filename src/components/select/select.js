import './select.styl';
import 'vendors/formstyler/jquery.formstyler.min.js';
import 'vendors/formstyler/jquery.formstyler.css';

class Select {
  constructor(node) {
    this.select = $(node);
    this.init();
  }

  init() {
    $('select').styler();
  }
}

$(() => {
  const selects = $('.js-select').map((index, node) => new Select(node));
});