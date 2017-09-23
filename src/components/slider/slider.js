import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/slider.css';
import 'jquery-ui-slider-pips';
import 'jquery-ui-slider-pips/dist/jquery-ui-slider-pips.css';
import './slider.styl';

export class Slider {
  constructor(slider) {
    this.slider = $(slider);
    this.init();
  }

  init() {
    const slider = this.slider.slider({
      min: this.slider.data("min"),
      max: this.slider.data("max"),
      value: this.slider.data("value")
    });
    if (this.slider.hasClass("slider--fill")) {
      slider.slider({
        range: "min",
      });
    }
    if (this.slider.hasClass("slider--float")) {
      slider.slider("float");
    }
    if (this.slider.hasClass("slider--pips")) {
      slider.slider("pips", {
        rest: "label",
        step: slider.slider("option", "max")/4
      });
    }
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-slider' : '.js-slider').map((index, node) => new Slider(node));
  });
}
