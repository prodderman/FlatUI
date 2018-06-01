import './select.styl';
import 'vendors/formstyler/jquery.formstyler.min.js';
import 'vendors/formstyler/jquery.formstyler.css';
import $ from 'jquery';

export class Select {
  constructor(node) {
    this.$select = $(node);
    this._init();
  }

  _init() {
    const $selectField = this.$select.find('.js-select__field');
    $selectField.styler();
  }
}

export default function render(isElementOnPage = false) {
  $(() => {
    $(isElementOnPage ? '.js-pjax__container .js-select' : '.js-select').map((index, node) => new Select(node)); // layout to pjax-contaioner
  });
}

