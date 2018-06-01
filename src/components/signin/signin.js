import 'parsleyjs';

export class Signin {
  constructor(node) {
    this.$form = $(node);
    this.$form.parsley();
    this.addEventHandlers();
  }

  addEventHandlers() { 
    this.$form.submit((event) => {
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

function render(isElementOnPage = false) {
  $(() => {
    $(isElementOnPage ? '.js-layout__pjax-container .js-signin' : '.js-signin').map((index, node) => new Signin(node));
  });
}

export default render;
