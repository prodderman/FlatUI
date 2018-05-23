import './menu.styl';
import $ from 'jquery';
import menuItems from '../../global/mocks/menu-items.json';

export class Menu {
  constructor(node) {
    this.$menu = $(node);
    this._init();
  }

  _init() {
    const $menuItemList = this.$menu.find('.menu__items').empty();
    $menuItemList.append(menuItems.map(menuItem => {
      const $menuItem = $('<li />', { class: 'menu__item' });
      const $menuItemLink = $('<a />', { 
        class: 'menu__items-link',
        href: menuItem.href,
        text: menuItem.name,
        'data-pjax': true,
      }).appendTo($menuItem);
      if (window.location.pathname.indexOf(menuItem.href) !== -1) {
        $menuItemLink.addClass('menu__items-link_active');
      }
      return $menuItem;
    }));
    
  }
}

export default function render() {
  $(() => {
    $('.js-menu').map((i, node) => new Menu(node));
  });
}