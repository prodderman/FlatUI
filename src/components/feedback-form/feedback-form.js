import 'parsleyjs';

class FeedbackForm {
  constructor(node) {
    this.$form = $(node);
    this.$form.parsley();
    this._addEventHandlers();
  }

  _addEventHandlers() { 
    this.$form.submit((event) => {
      event.preventDefault();
      $.ajax({
        type: this.$form.attr('method'),
        url: this.$form.attr('action'),
        data: this.$form.serializeArray(),
        success: () => {
          this.$form.trigger('reset');
          this.$form.find('input, select, textarea').trigger('focusout');
          this.$form.parsley().reset();
        },
        error: (xhr, textStatus, errorThrown) => {
          alert(`error: ${errorThrown ? errorThrown : xhr.status} ${textStatus}`);
        },
        
      });
    });
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-feedback-form' : '.js-feedback-form');
  if ($components.length > 0) {
    $components.map((index, node) => new FeedbackForm(node));
  }
}

export default render;
