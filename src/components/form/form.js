import './form.styl';
import 'parsleyjs';

class Feedback {
  constructor(form) {
    this.form = $(form);
    this.EventHandlers();
  }

  EventHandlers() { 
    this.form.submit((e) => {
      e.preventDefault();
      $.ajax({
        type: this.form.attr("method"),
        url: this.form.attr("action"),
        data: this.form.serializeArray(),
        success: () => {
          this.form.trigger('reset');
          this.form.find("input, select, textarea").trigger("focusout");
          this.form.parsley().reset();
        },
        error: (xhr, textStatus, errorThrown) => {
          alert(`error: ${errorThrown ? errorThrown : xhr.status} ${textStatus}`);
        },
        
      });
    });
  }
}

$(()=> {
  const forms = $('.js-feedback').map((index, node) => new Feedback(node));
});