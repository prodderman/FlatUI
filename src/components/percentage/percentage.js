import 'jquery-circle-progress';

class Percentage {
  constructor(diagram) {
    this.$diagram = $(diagram);
    this._render();
  }

  _render() {
    this.$diagram.find('canvas').remove();
    const percent = parseFloat(this.$diagram.data('percent')/100);
    const size = this.$diagram.width();
    const start = this.$diagram.data('start');
    const fill = this.$diagram.data('color');
    const emptyFill = this.$diagram.data('emptycolor');
    const time = 1500;
    this.$diagram.circleProgress({
      value: percent,
      size: size,
      fill: fill,
      emptyFill: emptyFill,
      startAngle: -Math.PI/2,
      animationStartValue: start/100,
      animation: { duration: time} 
    }).on('circle-animation-progress', function(event, progress, stepValue) {
      $(this).find('.js-percentage__text').text(Math.round(stepValue * 100));
    });   
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-percentage' : '.js-percentage');
  if ($components.length > 0) {
    $components.map((index, node) => new Percentage(node));
  }  
}

export default render;
