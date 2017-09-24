import './mpanel.styl';

import Slideout from 'slideout';

export class Mpanel {
  constructor(panel, menu) {
    this.panel = panel.get(0);
    this.menu = menu.get(0);
    this.init();
  }

  init() {
    let slideout;
    setTimeout(() => {
      slideout = new Slideout({
        panel: this.panel,
        menu: this.menu,
        padding: this.menu.offsetWidth,
        duration : 300,
        tolerance : 70,
        side: 'right'
      });
    },100)
    document.querySelector('.toggle-button').addEventListener('click', function() {
      slideout.toggle();
    });
  }
}

export default function render() {
  $(() => {
    new Mpanel ($('#page-id'), $('#mpanel-id'));
  });
}