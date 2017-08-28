import 'normalize.css';
import '../../global/global.styl';
import './UI-Kit.styl';
import '../../components/layout/layout';
import Button from '../../components/button/button';
import '../../components/arrow/arrow';
import Chart from '../../components/percentage/percentage';

$(() => {
  const buttons = $('.btn').map((index, node) => new Button(node));
  const charts = $('.js-percentage').map((index, node) => new Chart(node));
});