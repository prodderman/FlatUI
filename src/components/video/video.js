import './video.styl';

export class Video {
  constructor(video) {  
    this.video = $(video);
    this.Init();
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

  Init() {
    setTimeout(() => {
      this.video.empty();
      const url = this.video.data('src')
      const src = url.match(/https:|http:/) ? new URL(url) : new URL(`https:${url}`);
      const frame = $('<iframe/>', {
        height: this.SetHeight(),
        src: this.CreateURL(src),
        allowfullscreen: '',
        frameborder: 0
      });
      this.video.append(frame);
    }, 100);
  }

  SetHeight() {
    const width = this.video.data('format').split(':')[0];
    const height = this.video.data('format').split(':')[1];
    const frameWidth = this.video.width();
    const frameHeight = height*frameWidth/width;
    return frameHeight;
  }
  
  CreateURL(src) {
    for (let key in Video.snippets){
      if (key === this.TestSrc(src.hostname)) {
        if (key === 'youtube')
          return `${Video.snippets[key]}${this.TestId(src.search)[1]}`;
        else if (key === 'vk')
          return src;
        else
          return `${Video.snippets[key]}${this.TestId(src.pathname).slice(-1)[0]}`;
      }
    }
  }

  TestSrc(src) {
    return src.match(new RegExp(Object.keys(Video.snippets).join('|')))[0];
  }

  TestId(src) {
    return src.match(/([^\/=]+)(?:)/g);
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.layout .js-video' : '.js-video').map((i, node) => new Video(node));
  });
}