import 'jquery-ui/ui/widgets/slider.js';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/slider.css';

import './slider.styl';

export default class Slider {
  constructor(slider) {
    this.slider = $(slider);
    this.init();
  }

  init() {
    this.slider.slider();
  }
}