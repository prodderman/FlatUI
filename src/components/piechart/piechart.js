import './piechart.styl';

export default class Piechart {
  constructor(diagram) {
    this.diagram = $(diagram);
    this.render();
  }

  render() {
    let data = new Map();
    let totalCount = 0;
    let totalAngle = 0;
    let pieces = this.diagram.find("circle.piechart__piece");
    pieces.map((index, node) => {
      data.set($(node).data('name'), $(node).data('count'));
    });
    for (let count of data.values()) {
      totalCount += count;
    }
    pieces.map((index, node) => {
      let angle = 100 - data.get($(node).data('name')) * 100 / totalCount;
      $(node).css({
        'stroke-dashoffset': angle,
        'transform': `rotate(${totalAngle}deg)`
      });
      totalAngle += (100-angle)*360/100;
    });
  }
}