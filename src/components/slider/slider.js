import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/slider.css';
import 'vendors/jquery-ui-slider-pips/jquery-ui-slider-pips.js';
import 'vendors/jquery-ui-slider-pips/jquery-ui-slider-pips.css';
import 'jquery-ui-touch-punch';

export class Slider {
  constructor(slider) {
    this.slider = $(slider);
    this.init();
  }

  init() {
    const $input = this.slider.find('.slider__hidden-input');
    const slider = this.slider.slider({
      min: this.slider.data('min'),
      max: this.slider.data('max'),
      value: this.slider.data('value'),
      change: ( event, ui ) => {
        $input.val(ui.value);
      }
    });

    if (this.slider.is('[data-fill]')) {
      slider.slider({
        range: 'min',
      });
    }
    if (this.slider.is('[data-float]')) {
      slider.slider('float');
    }
    if (this.slider.is('[data-pips]')) {
      slider.slider('pips', {
        rest: 'label',
        step: slider.slider('option', 'max')/4
      });
    }

  }
}

export default function render(isElementOnPage = false) {
  $(() => {
    $(isElementOnPage ? '.js-layout__pjax-container .js-slider' : '.js-slider').map((index, node) => new Slider(node));
  });
}
