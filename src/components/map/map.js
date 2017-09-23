import './map.styl';

export class Map {
  constructor(node) {
    this.map = $(node);
    this.init();
  }

  init() {
    const coord = this.map.data('coord');
    const toMarker = this.map.find('.map__to-marker');
    if (!(coord instanceof Array)) return;
    
    this.script("https://api-maps.yandex.ru/2.1/?lang=ru_RU").then(()=>{
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
        map.geoObjects.add(placemark);
        toMarker.click((e) => map.panTo(placemark.geometry.getCoordinates()));     
      });
    });
  }

  script(url) {  
    return new Promise((resolve, reject) => {
      let r = false;
      const place = $(document).find('script').get(0);
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
      place.parentNode.insertBefore(script, place);
    });
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.page .js-map' : '.js-map').map((index, node) => new Map(node));
  });
}