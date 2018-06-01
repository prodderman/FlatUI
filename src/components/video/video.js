import { bind } from 'decko';

class Video {
  constructor(video) {  
    this.$video = $(video);
    this.$frame = this.$video.children('.video__frame');
    this._init();
    this._addEventHandlers();
  }

  _addEventHandlers() {  
    $(window).resize(this._handleWindowResize);
  }

  static get hosts() {
    return {
      youtube: '//www.youtube.com/embed/',
      youtu: '//www.youtube.com/embed/',
      vimeo: '//player.vimeo.com/video/',
      rutube: '//rutube.ru/play/embed/',
      vk: ''
    };
  }

  _init() {
    const url = this.$video.data('src');
    const src = url.match(/https:|http:/) ? new URL(url) : new URL(`https:${url}`);
    this.$frame.height(this._setHeight());
    this.$frame.attr('src', this._createURL(src));
  }

  _setHeight() {
    const width = this.$video.data('format').split(':')[0];
    const height = this.$video.data('format').split(':')[1];
    const frameWidth = this.$video.width();
    const frameHeight = height*frameWidth/width;
    return frameHeight;
  }

  _createURL(src) {
    const host = this._ejectHost(src.hostname);
    switch (host) {
    case 'youtube':
      return `${Video.hosts[host]}${this._ejectId(src.search)[1]}`;
    case 'vk':
      return src;
    case 'youtu':
    case 'vimeo':
    case 'rutube':
    default:
      return `${Video.hosts[host]}${this._ejectId(src.pathname).slice(-1)[0]}`;
    }
  }

  _ejectHost(hostname) {
    return hostname.match(new RegExp(Object.keys(Video.hosts).join('|')))[0];
  }

  _ejectId(src) {
    return src.match(/([^/=]+)(?:)/g);
  }

  @bind
  _handleWindowResize() {
    this.$frame.height(this._setHeight());
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-video' : '.js-video');
  if ($components.length > 0) {
    $components.map((index, node) => new Video(node));
  }
}

export default render;
