import './map.styl'; 

class Map {
  constructor(node) {
    this.map = $(node);
    this.init();
  }

  init() {
    const coord = this.map.data('coord');
    const toMarker = this.map.find('.map__to-marker');
    if (!(coord instanceof Array)) return;
    ymaps.ready(() => {
      const map = new ymaps.Map($('.js-map__location', this.map)[0], {
        center: coord,
        zoom: 17,
        controls: []
      });

      const placemark = new ymaps.Placemark(coord, {}, {
        iconLayout: 'default#image',
        iconImageHref: require('./img/marker.png'),
        iconImageSize: [55, 55],
        iconImageOffset: [-19, -56]
      });
      map.geoObjects.add(placemark);
      toMarker.click((e) => map.panTo(placemark.geometry.getCoordinates()));     
    });
  }
}

$(() => {
  const maps = $('.js-map').map((index, node) => new Map(node));
});