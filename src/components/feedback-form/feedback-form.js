import 'parsleyjs';
import { bind } from 'decko';

class FeedbackForm {
  constructor(node) {
    this.$form = $(node);
    this.$form.parsley();
    this._addEventHandlers();
  }

  _addEventHandlers() {
    this.$form.submit(this._sendFormData);
  }

  @bind
  _sendFormData(event) {
    event.preventDefault();
    const $targetForm = $(event.currentTarget);
    $.ajax({
      type: $targetForm.attr('method'),
      url: $targetForm.attr('action'),
      complete: this._resetForm($targetForm)
    });
  }

  _resetForm($form) {
    return function() {
      $form.parsley().reset();
      $form.trigger('reset');
      $form.find('input, select, textarea').trigger('focusout');
    };
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-feedback-form' : '.js-feedback-form');
  if ($components.length > 0) {
    $components.map((index, node) => new FeedbackForm(node));
  }
}

export default render;
