import './button.styl';

export class Buttons {
  constructor() {
    this.addEventHandlers();
  }

  addEventHandlers() {
    $(document).on('click', '.js-btn, .js-btn .ripple', (e) => {
      this.Ripple(e, $(e.target));
    })
  }

  Ripple(e, element) {
    const btn = element.is('.ripple') ? element.parent(".js-btn") : element;
    const div = $('<div/>', {
      class: 'ripple'
    });
    const offSet = btn.offset();
    const x = e.pageX - offSet.left;
    const y = e.pageY - offSet.top;
    div.css({
      top: `${y}px`,
      left: `${x}px`
    });
    btn.addClass('btn--ripple');
    btn.append(div);

    div.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', (e) => {
      div.remove();
      btn.not(":has('.ripple')").removeClass('btn--ripple');
    });
  }
}

$(() => {
  new Buttons();
});
