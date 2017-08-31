import './percentage.styl';

class Percentage {
  constructor(diagram) {
    this.diagram = $(diagram);
    this.render();
  }

  render() {
    const percent = this.diagram.data('percent');
    const text = this.diagram.find('.percentage__number');
    const chart = this.diagram.find('.percentage__circle');
    const radius = parseFloat(chart.css("r"));
    const time = 1500;
    const offSet = Math.PI * 2 * radius * (100 - percent) / 100;
    chart.animate({
      'stroke-dashoffset': offSet
    }, time);

    text.prop('Counter', $(this).text()).animate({
      Counter: percent
    }, {
      duration: time,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  }
}

$(() => {
  const charts = $('.js-percentage').map((index, node) => new Percentage(node));
})