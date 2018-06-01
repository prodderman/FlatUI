/*global ymaps:true*/
class Map {
  constructor(node) {
    this.$ymap = $(node);
    this._init();
  }

  _init() {
    const $coord = this.$ymap.data('coord');
    const $toMarker = this.$ymap.find('.js-map__button-to-marker');
    if (!($coord instanceof Array)) return;
    $('.js-map__location').empty();

    ymaps.ready(() => {
      const ymap = new ymaps.Map($('.js-map__location', this.$ymap)[0], {
        center: $coord,
        zoom: 17,
        controls: []
      });

      const placemark = new ymaps.Placemark($coord, {}, {
        iconLayout: 'default#image',
        iconImageHref: require('./img/marker.png'),
        iconImageSize: [55, 55],
        iconImageOffset: [-19, -56]
      });

      this.$ymap.on('touchmove', (event) => {
        event.stopPropagation();
        event.preventDefault();
      });

      ymap.geoObjects.add(placemark);
      $toMarker.click(() => ymap.panTo(placemark.geometry.getCoordinates()));     
    });
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-map' : '.js-map');
  if ($components.length > 0) {
    $components.map((index, node) => new Map(node));
  }  
}

export default render;
