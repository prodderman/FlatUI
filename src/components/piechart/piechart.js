import 'vendors/donut-pie-chart/donut-pie-chart.min.js';

class PieChart {
  constructor(diagram) {
    this.$diagram = $(diagram);
    this._render();
  }

  _render() {
    const pieces = this.$diagram
      .find('.js-piechart__data .js-piechart__data-item')
      .toArray();
    const totalCount = pieces.reduce(this._calcTotalCount, 0);
    const chartData = pieces.map(this._makeDataAttrsExtracting(totalCount));

    this.$diagram.empty().donutpie({
      radius: this.$diagram.width() * 1.25
    });
    this.$diagram.donutpie('update', chartData);
  }

  _makeDataAttrsExtracting(totalCount) {
    return (node) => {
      node.dataset.hvalue = node.dataset.hvalue * 100 / totalCount;
      return node.dataset;
    };
  }

  _calcTotalCount(totalCount, currentPiece) {
    return totalCount + parseInt(currentPiece.dataset.hvalue);
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-piechart' : '.js-piechart');
  if ($components.length > 0) {
    $components.map((index, node) => new PieChart(node));
  }
}

export default render;
