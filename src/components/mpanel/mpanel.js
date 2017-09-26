import './mpanel.styl';
import Slideout from 'slideout';

export class Mpanel {
  constructor(panel, menu, trigger) {
    this.panel = $(panel).get(0);
    this.menu = $(menu).get(0);
    this.trigger = trigger;
    this.slideout;
    this.init();
    this.addEventHandlers();
  }

  addEventHandlers() {
    $('.page__header').on('click', this.trigger, (e) => {
      this.slideout.toggle();
    });

    $(window).resize((e) => {
      if (e.target.innerWidth > 1024) {
        this.slideout.close();
      }
    });

    $('#main-id').on('pjax:start', (e) => {
        this.slideout.close();
    });

    $('#main-id').on('pjax:end', (e) => {
      $.pjax({
        url: window.location.href,
        container: '#menu-id',
        fragment: '#menu-id',
        timeout: 5000
      })
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

$( document ).ready(() => {
  if ($('#mpanel-id').length) {
    new Mpanel ('#main-id', '#mpanel-id', '.header__menu-trigger');
  }
});
