import './singin.styl';
import 'parsleyjs';

export class Singin {
  constructor(node) {
    this.form = $(node);
    this.form.parsley();
    this.addEventHandlers();
  }

  addEventHandlers() { 
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
        complete: () => {
          window.location.replace("profile.html");
        }
      });
    });
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-singin' : '.js-singin').map((index, node) => new Singin(node));
  });
}