import './select.styl';
import 'vendors/formstyler/jquery.formstyler.min.js';
import 'vendors/formstyler/jquery.formstyler.css';

export class Select {
  constructor(node) {
    this.select = $(node);
    this.init();
  }

  init() {
    $('select').styler();
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-select' : '.js-select').map((index, node) => new Select(node));
  });
}

