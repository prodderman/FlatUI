import 'parsleyjs';

export class Signin {
  constructor(node) {
    this.$form = $(node);
    this.$form.parsley();
    this._addEventHandlers();
  }

  _addEventHandlers() { 
    this.$form.submit(this._authorization);
  }

  _authorization(event) {
    event.preventDefault();
    const $targetForm = $(event.currentTarget);
    $.ajax({
      type: $targetForm.attr('method'),
      url: $targetForm.attr('action'),
      data: $targetForm.serializeArray(),
      success: () => {
        $targetForm.trigger('reset');
        $targetForm.find('input, select, textarea').trigger('focusout');
        $targetForm.parsley().reset();
      },
      complete: () => {
        window.location.replace('profile.html');
      }
    });
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-signin' : '.js-signin');
  if ($components.length > 0) {
    $components.map((index, node) => new Signin(node));
  }
}

export default render;
