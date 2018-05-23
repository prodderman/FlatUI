import './mpanel.styl';
import $ from 'jquery';
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
    $(document).on('click', this.trigger, () => {
      this.slideout.toggle();
    });

    $(window).resize((event) => {
      if (event.target.innerWidth > 1024) {
        this.slideout.close();
      }
    });

    $('.js-layout__pjax-container').on('pjax:start', () => {
      this.slideout.close();
    });
  }
}

$( document ).ready(() => {
  if ($('.js-mpanel').length) {
    new Mpanel('.js-layout__main', '.js-mpanel', '.js-header__menu-trigger');
  }
});
