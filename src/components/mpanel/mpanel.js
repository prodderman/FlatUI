import Slideout from 'slideout';
import { bind } from 'decko';

class MPanel {
  constructor(panel, menu, trigger) {
    this.$panel = panel.get(0);
    this.$menu = menu.get(0);
    this.$trigger = trigger;
    this.slideout;
    this._init();
    this._addEventHandlers();
  }

  _init() {
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
    this.$trigger.on('click', this._togglePanelOnTriggerClick);
    $(window).resize(this._closePanelOnResize);
    $('.js-layout__pjax-container').on('pjax:start', this._closePanelOnRelocation);
  }

  @bind
  _togglePanelOnTriggerClick() {
    this.slideout.toggle();
  }

  @bind
  _closePanelOnRelocation() {
    this.slideout.close();
  }

  @bind
  _closePanelOnResize(event) {
    if (event.target.innerWidth > 1024) {
      this.slideout.close();
    }
  }
}

function render() {
  const $menuPanel = $('.js-mpanel');
  const $main = $('.js-layout__main');
  const $menuButton = $('.js-header__menu-trigger');
  if ($menuPanel.length > 0 && $main.length > 0)
    new MPanel($main, $menuPanel, $menuButton);
}

$( document ).ready(render);
