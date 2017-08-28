import './percentage.styl';

export default class Percentage {
  constructor(diagram) {
    this.diagram = $(diagram);
    this.render();
  }

  render() {
    let percent = this.diagram.data('percent');
    let text = this.diagram.find('.percentage__diagram-number');
    let chart = this.diagram.find('.percentage__diagram-circle');
    let time = 1500;

    chart.animate({
      'stroke-dashoffset': 6.28 * 48 * (100 - percent) / 100
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