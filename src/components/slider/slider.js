import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/slider.css';
import 'vendors/jquery-ui-slider-pips/jquery-ui-slider-pips.js';
import 'vendors/jquery-ui-slider-pips/jquery-ui-slider-pips.css';
import 'jquery-ui-touch-punch';
import { bind } from 'decko';

class Slider {
  constructor(slider) {
    this.$slider = $(slider);
    this.$input = this.$slider.find('.slider__hidden-input');
    this._init();
  }

  _init() {
    const slider = this.$slider.slider({
      min: this.$slider.data('min'),
      max: this.$slider.data('max'),
      value: this.$slider.data('value'),
      change: this._writeInInput
    });

    if (this.$slider.is('[data-fill]')) {
      slider.slider({
        range: 'min',
      });
    }
    if (this.$slider.is('[data-float]')) {
      slider.slider('float');
    }
    if (this.$slider.is('[data-pips]')) {
      slider.slider('pips', {
        rest: 'label',
        step: slider.slider('option', 'max')/4
      });
    }
  }

  @bind
  _writeInInput(event, data) {
    this.$input.val(data.value);
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-slider' : '.js-slider');
  if ($components.length > 0) {
    $components.map((index, node) => new Slider(node));
  }
}

export default render;
