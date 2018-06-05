import { bind } from 'decko';

/*global ymaps:true*/
class Map {
  constructor(node) {
    this.$ymap = $(node);
    this.$coord = this.$ymap.data('coord');
    this.$toMarkerButton = this.$ymap.find('.js-map__button-to-marker');
    this._init();
    this._addEventHandlers();
  }

  _addEventHandlers() {
    this.$ymap.on('touchmove', this._stopTouchEvent);
  }

  _init() {
    if (!(this.$coord instanceof Array)) return;
    $('.js-map__location').empty();
    ymaps.ready(this._initMap);
  }

  @bind
  _initMap() {
    const ymap = new ymaps.Map($('.js-map__location', this.$ymap)[0], {
      center: this.$coord,
      zoom: 17,
      controls: []
    });

    const placemark = new ymaps.Placemark(this.$coord, {}, {
      iconLayout: 'default#image',
      iconImageHref: require('./img/marker.png'),
      iconImageSize: [55, 55],
      iconImageOffset: [-19, -56]
    });

    ymap.geoObjects.add(placemark);
    this.$toMarkerButton.click(this._makeToMarkerTransition(ymap, placemark));
  }

  _makeToMarkerTransition(map, marker) {
    return function() {
      map.panTo(marker.geometry.getCoordinates());
    };
  }

  _stopTouchEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-map' : '.js-map');
  if ($components.length > 0) {
    $components.map((index, node) => new Map(node));
  }  
}

export default render;
