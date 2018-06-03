import 'parsleyjs';
import { bind } from 'decko';

export class Signin {
  constructor(node) {
    this.$form = $(node);
    this.$form.parsley();
    this._addEventHandlers();
  }

  _addEventHandlers() { 
    this.$form.submit(this._authorization);
  }

  @bind
  _authorization(event) {
    event.preventDefault();
    const $targetForm = $(event.currentTarget);
    $.ajax({
      type: $targetForm.attr('method'),
      url: $targetForm.attr('action'),
      complete: this._relocation
    });
  }

  _relocation() {
    window.location.replace('profile.html');
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-signin' : '.js-signin');
  if ($components.length > 0) {
    $components.map((index, node) => new Signin(node));
  }
}

export default render;
