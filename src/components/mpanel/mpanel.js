import './mpanel.styl';

import Slideout from 'slideout';

export class Mpanel {
  constructor(panel, menu) {
    this.panel = panel.get(0);
    this.menu = menu.get(0);
    this.init();
  }

  init() {
    setTimeout(() => {
      this.menu.style.display = "block";
      const width = this.menu.offsetWidth;
      this.menu.style = "";
      const slideout = new Slideout({
        panel: this.panel,
        menu: this.menu,
        padding: width,
        duration : 300,
        tolerance : 70,
        side: 'right'
      });
    }, 100);
  }
}

export default function render() {
  $( document ).ready(() => {
    new Mpanel ($('#page-id'), $('#mpanel-id'));
  });
}