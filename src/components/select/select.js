import 'vendors/formstyler/jquery.formstyler.min.js';
import 'vendors/formstyler/jquery.formstyler.css';

class Select {
  constructor(node) {
    this.$select = $(node);
    this._init();
  }

  _init() {
    const $selectField = this.$select.find('.js-select__field');
    $selectField.styler();
  }
}

function render(isElementOnPage = false) {
  $(() => {
    $(isElementOnPage ? '.js-layout__pjax-container .js-select' : '.js-select').map((index, node) => new Select(node));
  });
}

export default render;
