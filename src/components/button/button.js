export class Buttons {
  constructor() {
    this._addEventHandlers();
  }

  _addEventHandlers() {
    $(document).on('click', '.js-button, .js-button .ripple', (event) => {
      this._ripple(event, $(event.target));
    });
  }

  _ripple(event, $element) {
    const $btn = $element.is('.ripple') ? $element.parent('.js-button') : $element;
    const $div = $('<div/>', {
      class: 'ripple'
    });
    const offSet = $btn.offset();
    const x = event.pageX - offSet.left;
    const y = event.pageY - offSet.top;
    $div.css({
      top: `${y}px`,
      left: `${x}px`
    });
    $btn.addClass('button_ripple');
    $btn.append($div);

    $div.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', () => {
      $div.remove();
      $btn.not(':has(".ripple")').removeClass('button_ripple');
    });
  }
}

$(() => {
  new Buttons();
});
