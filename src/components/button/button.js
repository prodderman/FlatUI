import './button.styl';

class Button {
  
  constructor(btn) {
    this.btn = btn;
    this.btn.click((e) => this.Ripple(e));
  }

  Ripple(e) {
    const div = $('<div/>');
    const offSet = this.btn.offset();
    const x = e.pageX - offSet.left;
    const y = e.pageY - offSet.top;
    div.css({
      top: `${y}px`,
      left: `${x}px`
    });
    div.addClass('ripple');
    this.btn.addClass('btn--ripple');
    this.btn.append(div);
    div.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', (e) => {
      div.remove();
      this.btn.removeClass('btn--ripple');
    });
  }
}

export default function render() {
    $('.btn').each(function() {
      return new Button($(this));
    });
}

render();