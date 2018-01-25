import './form.styl';
import 'parsleyjs';

class Feedback {
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

export default function render(inPage = false) {
  $(()=> {
    $(inPage ? '.page .js-feedback' : '.js-feedback').map((index, node) => new Feedback(node));
  });
}