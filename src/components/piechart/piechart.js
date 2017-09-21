import './piechart.styl';

export default class Piechart {
  constructor(diagram) {
    this.diagram = $(diagram);
    this.render();
  }

  render() {
    const canvas = this.diagram.find("canvas").get(0);
    const ctx = canvas.getContext('2d');
    const r = this.diagram.width() / 2;
    const pieces = this.diagram.find(".piechart__data figure");
    let totalCount = 0;
    let prevAngle = 0;

    canvas.width = this.diagram.width() * 1.5;
    canvas.height = this.diagram.width() * 1.5;
    const c = canvas.width / 2;

    pieces.map((index, node) => {
      totalCount += $(node).data('count');
    });

    pieces.map((index, node) => {
      const angle = prevAngle + $(node).data('count') * 2 * Math.PI / totalCount;
      ctx.beginPath();
      ctx.arc(c, c, r - 7.5, -Math.PI/2 + prevAngle, -Math.PI/2 + angle, false);
      ctx.fillStyle = 'transparent';
      ctx.fill();
      ctx.lineWidth = 15;
      ctx.strokeStyle = $(node).data("color");
      ctx.stroke();
      prevAngle = angle;
    }, this);
  }
}

$(() => {
  $('.js-piechart').map((index, node) => new Piechart(node));
})