class Video {
  constructor(video) {  
    this.$video = $(video);
    this.$frame = this.$video.children('.video__frame');
    this.init();
    this.addEventHandlers();
  }

  addEventHandlers() {  
    $(window).resize(() => {
      this.$frame.height(this.setHeight());
    });
  }

  static get snippets() {
    return {
      youtube: '//www.youtube.com/embed/',
      youtu: '//www.youtube.com/embed/',
      vimeo: '//player.vimeo.com/video/',
      rutube: '//rutube.ru/play/embed/',
      vk: ''
    };
  }

  init() {
    const url = this.$video.data('src');
    const src = url.match(/https:|http:/) ? new URL(url) : new URL(`https:${url}`);
    this.$frame.height(this.setHeight());
    this.$frame.attr('src', this.createURL(src));
  }

  setHeight() {
    const width = this.$video.data('format').split(':')[0];
    const height = this.$video.data('format').split(':')[1];
    const frameWidth = this.$video.width();
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
    return src.match(/([^/=]+)(?:)/g);
  }
}

function render(isElementOnPage = false) {
  $(() => {
    $(isElementOnPage ? '.js-layout__pjax-container .js-video' : '.js-video').map((i, node) => new Video(node));
  });
}

export default render;
