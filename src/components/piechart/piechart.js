import 'vendors/donut-pie-chart/donut-pie-chart.min.js';
import { bind } from 'decko';

class PieChart {
  constructor(diagram) {
    this.$diagram = $(diagram);
    this._init();
    this._addEventHandlers();
  }

  _addEventHandlers() {
    $(window).resize(this._render);
  }

  _init() {
    this.pieces = this.$diagram
      .find('.js-piechart__data .js-piechart__data-item')
      .toArray();
    this.totalCount = this.pieces.reduce(this._calcTotalCount, 0);
    this.chartData = this.pieces.map(this._makeDataAttrsExtracting(this.totalCount));
    this._render();
  }

  @bind
  _render() {
    this.$diagram.empty().donutpie({
      radius: this.$diagram.width()
    });
    this.$diagram.donutpie('update', this.chartData);
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
