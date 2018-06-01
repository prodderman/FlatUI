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

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-select' : '.js-select');
  if ($components.length > 0) {
    $components.map((index, node) => new Select(node));
  }
}

export default render;
