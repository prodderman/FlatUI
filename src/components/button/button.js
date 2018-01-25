import './button.styl';

export class Buttons {
  constructor() {
    this._addEventHandlers();
  }

  _addEventHandlers() {
    $(document).on('click', '.js-btn, .js-btn .ripple', (event) => {
      this._ripple(event, $(event.target));
    })
  }

  _ripple(event, $element) {
    const $btn = $element.is('.ripple') ? $element.parent('.js-btn') : $element;
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
    $btn.addClass('btn--ripple');
    $btn.append($div);

    $div.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', (event) => {
      $div.remove();
      $btn.not(':has(".ripple")').removeClass('btn--ripple');
    });
  }
}

$(() => {
  new Buttons();
});
