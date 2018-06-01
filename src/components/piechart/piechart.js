class PieChart {
  constructor(diagram) {
    this.$diagram = $(diagram);
    this._render();
  }

  _render() {
    const canvas = this.$diagram.find('canvas').get(0);
    const ctx = canvas.getContext('2d');
    const radius = this.$diagram.width() / 2;
    const pieces = this.$diagram.find('.js-piechart__data .js-piechart__data-item').toArray();
    const totalCount = pieces.reduce(this._calcTotalCount, 0);
    canvas.width = this.$diagram.width() * 1.5;
    canvas.height = this.$diagram.width() * 1.5;
    const center = canvas.width / 2;

    pieces.reduce((prevAngle, currentPiece) => {
      const angle = prevAngle + currentPiece.dataset.count * 2 * Math.PI / totalCount;
      this._renderPieceWithAngle(ctx, center, radius, prevAngle, angle, currentPiece.dataset.color);
      return angle;
    }, 0);
  }

  _renderPieceWithAngle(context, center, radius, startAngle, endAngle, color) {
    context.beginPath();
    context.arc(center, center, radius - 7.5, -Math.PI/2 + startAngle, -Math.PI/2 + endAngle, false);
    context.fillStyle = 'transparent';
    context.fill();
    context.lineWidth = 15;
    context.strokeStyle = color;
    context.stroke();
  }

  _calcTotalCount(totalCount, currentPiece) {
    return totalCount + parseInt(currentPiece.dataset.count);
  }
 
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-piechart' : '.js-piechart');
  if ($components.length > 0) {
    $components.map((index, node) => new PieChart(node));
  }
}

export default render;
