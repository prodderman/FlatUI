import './button.styl';

class Button {

  constructor(btn) {
    this.btn = $(btn);
    this.btn.click((e) => this.Ripple(e));
  }

  Ripple(e) {
    e.preventDefault();
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
      this.btn.not(":has('.ripple')").removeClass('btn--ripple');
    });
  }
}

$(()=> {
  const buttons = $('.btn').map((index, node) => new Button(node));
});