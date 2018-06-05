import menuItems from '../../global/mocks/menu-items.json';

class Menu {
  constructor(node) {
    this.$menu = $(node);
    this._init();
  }

  _init() {
    const $menuItemsContainer = this.$menu.find('.menu__items').empty();
    const currentURL = window.location.pathname;
    const menuItemsList = menuItems.map(this._makeMenuItemRendering(currentURL));
    $menuItemsContainer.append(menuItemsList);
  }

  _makeMenuItemRendering(url) {
    return function (menuItem) {
      const $menuItem = $('<li />', { class: 'menu__item' });
      const $menuItemLink = $('<a />', { 
        class: 'menu__items-link',
        href: menuItem.href,
        text: menuItem.name,
        'data-pjax': true,
      }).appendTo($menuItem);
      if (url.indexOf(menuItem.href) !== -1) {
        $menuItemLink.addClass('menu__items-link_active');
      }
      return $menuItem;
    };
  }
}

function render() {
  $(() => {
    $('.js-menu').map((i, node) => new Menu(node));
  });
}

export default render;
