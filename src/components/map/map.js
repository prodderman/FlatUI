import './map.styl';

export class Map {
  constructor(node) {
    this.$map = $(node);
    this._init();
  }

  _init() {
    const coord = this.$map.data('coord');
    const toMarker = this.$map.find('.map__to-marker');
    if (!(coord instanceof Array)) return;
    this.script('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(()=>{
      $('.js-map__location').empty();
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

        this.map.on('touchmove', (event) => {
          event.stopPropagation();
          event.preventDefault();
        });

        map.geoObjects.add(placemark);
        toMarker.click((e) => map.panTo(placemark.geometry.getCoordinates()));     
      });
    });
  }

  script(url) {  
    return new Promise((resolve, reject) => {
      let r = false;
      if ($(`script[src='${url}']`).length > 0) {
        r = true;
        resolve(this);
        return;
      }
      const place = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
  
      script.type = 'text/javascript';
      script.src = url;
      script.async = true;
      script.onload = script.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState === 'complete')) {
          r = true;
          resolve(this);
        }
      };
      script.onerror = script.onabort = reject;
      place.prepend(script);
    });
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-map' : '.js-map').map((index, node) => new Map(node));
  });
}