import './select.styl';
import 'vendors/formstyler/jquery.formstyler.min.js';
import 'vendors/formstyler/jquery.formstyler.css';

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

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.layout .js-select' : '.js-select').map((index, node) => new Select(node));
  });
}

