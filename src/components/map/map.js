import './map.styl';

export class Map {
  constructor(node) {
    this.$ymap = $(node);
    this._init();
  }

  _init() {
    const coord = this.$ymap.data('coord');
    const toMarker = this.$ymap.find('.js-map__btn_to-marker');
    if (!(coord instanceof Array)) return;
    $('.js-map__location').empty();

    ymaps.ready(() => {
      const ymap = new ymaps.Map($('.js-map__location', this.$ymap)[0], {
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

      this.$ymap.on('touchmove', (event) => {
        event.stopPropagation();
        event.preventDefault();
      });

      ymap.geoObjects.add(placemark);
      toMarker.click((e) => ymap.panTo(placemark.geometry.getCoordinates()));     
    });
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-map' : '.js-map').map((index, node) => new Map(node));
  });
}