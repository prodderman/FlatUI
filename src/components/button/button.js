class Button {
  constructor(selector) {
    this.buttonSelector = selector;
    this._addEventHandlers();
  }

  _addEventHandlers() {
    $(document).on('click', `${this.buttonSelector}`, this._ripple);
  }

  _ripple(event) {
    const $button = $(event.target);
    const $rippleElement = $button.children('.js-button__ripple');
    const offSet = $button.offset();
    const x = event.pageX - offSet.left;
    const y = event.pageY - offSet.top;
    $rippleElement.css({
      top: `${y}px`,
      left: `${x}px`
    });
    $button.addClass('button_is-ripple');
    $rippleElement.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', () => {
      $button.removeClass('button_is-ripple');
    });
  }
}

function render() {
  new Button('.js-button');
}

$( document ).ready(render);
