import './signin.styl';
import 'parsleyjs';

export class Signin {
  constructor(node) {
    this.form = $(node);
    this.form.parsley();
    this.addEventHandlers();
  }

  addEventHandlers() { 
    this.form.submit((event) => {
      event.preventDefault();
      $.ajax({
        type: this.form.attr('method'),
        url: this.form.attr('action'),
        data: this.form.serializeArray(),
        success: () => {
          this.form.trigger('reset');
          this.form.find('input, select, textarea').trigger('focusout');
          this.form.parsley().reset();
        },
        complete: () => {
          window.location.replace('profile.html');
        }
      });
    });
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-signin' : '.js-signin').map((index, node) => new Signin(node));
  });
}