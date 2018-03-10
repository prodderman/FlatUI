import './mpanel.styl';
import Slideout from 'slideout';

export class Mpanel {
  constructor(panel, menu, trigger) {
    this.$panel = $(panel).get(0);
    this.$menu = $(menu).get(0);
    this.trigger = trigger;
    this.slideout;
    this._init();
    this._addEventHandlers();
  }

  _init() {
    if (!this.$menu) return;
    this.slideout = new Slideout({
      panel: this.$panel,
      menu: this.$menu,
      padding: 300,
      duration : 300,
      tolerance : 70,
      side: 'right'
    });
  }

  _addEventHandlers() {
    $('.js-page__header').on('click', this.trigger, (event) => {
      this.slideout.toggle();
    });

    $(window).resize((event) => {
      if (event.target.innerWidth > 1024) {
        this.slideout.close();
      }
    });

    $('.js-page__main').on('pjax:start', (event) => {
        this.slideout.close();
    });

    $('.js-page__main').on('pjax:end', (event) => {
      $.pjax({
        url: window.location.href,
        container: '#menu-id',
        fragment: '#menu-id',
        timeout: 5000
      });
    });  
  }
}

$( document ).ready(() => {
  if ($('.js-mpanel').length) {
    new Mpanel ('.js-page__main', '.js-mpanel', '.header__menu-trigger');
  }
});
