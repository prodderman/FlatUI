import './mpanel.styl';

import Slideout from 'slideout';

export class Mpanel {
  constructor(panel, menu, btn) {
    this.panel = panel.get(0);
    this.menu = menu.get(0);
    this.trigger = btn;
    this.slideout;
    this.init();
    this.addEventHandlers();
  }

  addEventHandlers() {
    this.trigger.on('click', () => {
      this.slideout.toggle();
    });
  }

  init() {
    if (!this.menu) return;
    this.slideout = new Slideout({
      panel: this.panel,
      menu: this.menu,
      padding: 300,
      duration : 300,
      tolerance : 70,
      side: 'right'
    });
  }
}

export default function render() {
  $( document ).ready(() => {
    new Mpanel ($('#page-id'), $('#mpanel-id'), $('.header__menu-trigger'));
  });
}