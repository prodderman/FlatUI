import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/slider.css';
import 'jquery-ui-slider-pips';
import 'jquery-ui-slider-pips/dist/jquery-ui-slider-pips.css';
import 'jquery-ui-touch-punch';
import './slider.styl';

export class Slider {
  constructor(slider) {
    this.slider = $(slider);
    this.init();
  }

  init() {
    const input = this.slider.find('input[type="hidden"]');
    const slider = this.slider.slider({
      min: this.slider.data('min'),
      max: this.slider.data('max'),
      value: this.slider.data('value'),
      change: ( event, ui ) => {
        input.val(ui.value);
      }
    });
    if (this.slider.hasClass('slider_fill')) {
      slider.slider({
        range: 'min',
      });
    }
    if (this.slider.hasClass('slider_float')) {
      slider.slider('float');
    }
    if (this.slider.hasClass('slider_pips')) {
      slider.slider('pips', {
        rest: 'label',
        step: slider.slider('option', 'max')/4
      });
    }

  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-slider' : '.js-slider').map((index, node) => new Slider(node));
  });
}
