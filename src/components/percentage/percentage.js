import './percentage.styl';
import 'jquery-circle-progress'; 

export class Percentage {
  constructor(diagram) {
    this.diagram = $(diagram);
    this.render();
  }

  render() {
    this.diagram.find('canvas').remove();
    const percent = parseFloat(this.diagram.data('percent')/100);
    const size = this.diagram.width();
    const start = this.diagram.data("start");
    const fill = this.diagram.data("color");
    const emptyFill = this.diagram.data("emptycolor");
    const time = 1500;
    this.diagram.circleProgress({
      value: percent,
      size: size,
      fill: fill,
      emptyFill: emptyFill,
      startAngle: -Math.PI/2,
      animationStartValue: start/100,
      animation: { duration: time} 
    }).on('circle-animation-progress', function(event, progress, stepValue) {
      $(this).find('.percentage__text').text(Math.round(stepValue * 100));
    });   
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-percentage' : '.js-percentage').map((index, node) => new Percentage(node));
  })
}