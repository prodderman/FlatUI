import 'normalize.css';
import '../../global/global.styl';
import './UI-Kit.styl';
import '../../components/layout/layout';
import Button from '../../components/button/button';
import '../../components/arrow/arrow';
import Chart from '../../components/percentage/percentage';
import Piechart from '../../components/piechart/piechart';
import '../../components/stages/stages';
import Slider from '../../components/slider/slider';

$(() => {
  const buttons = $('.btn').map((index, node) => new Button(node));
  const charts = $('.js-percentage').map((index, node) => new Chart(node));
  const pieChrarts = $('.js-piechart').map((index, node) => new Piechart(node));
  const sliders = $('.js-slider').map((index, node) => new Slider(node));
});