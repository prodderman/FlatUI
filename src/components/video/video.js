import './video.styl';

export class Video {
  constructor(video) {  
    this.video = $(video);
    this.init();
    this.addEventHandlers();
  }

  addEventHandlers() {  
    $( window ).resize((e) => {
      const frame = this.video.children('iframe');
      frame.height(this.SetHeight());
    });
  }

  static get snippets() {
    return {
      'youtube': '//www.youtube.com/embed/',
      'youtu': '//www.youtube.com/embed/',
      'vimeo': '//player.vimeo.com/video/',
      'rutube': '//rutube.ru/play/embed/',
      'vk': ''
    };
  }

  init() {
    setTimeout(() => {
      this.video.empty();
      const url = this.video.data('src')
      const src = url.match(/https:|http:/) ? new URL(url) : new URL(`https:${url}`);
      const frame = $('<iframe/>', {
        height: this.setHeight(),
        src: this.createURL(src),
        allowfullscreen: '',
        frameborder: 0
      });
      this.video.append(frame);
    }, 100);
  }

  setHeight() {
    const width = this.video.data('format').split(':')[0];
    const height = this.video.data('format').split(':')[1];
    const frameWidth = this.video.width();
    const frameHeight = height*frameWidth/width;
    return frameHeight;
  }

  createURL(src) {
    for (let key in Video.snippets){
      if (key === this.testSrc(src.hostname)) {
        if (key === 'youtube')
          return `${Video.snippets[key]}${this.testId(src.search)[1]}`;
        else if (key === 'vk')
          return src;
        else
          return `${Video.snippets[key]}${this.testId(src.pathname).slice(-1)[0]}`;
      }
    }
  }

  testSrc(src) {
    return src.match(new RegExp(Object.keys(Video.snippets).join('|')))[0];
  }

  testId(src) {
    return src.match(/([^\/=]+)(?:)/g);
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.layout .js-video' : '.js-video').map((i, node) => new Video(node));
  });
}