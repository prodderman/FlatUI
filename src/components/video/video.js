import './video.styl';

class Video {
  constructor(video) {  
    this.video = $(video);
    this.Init();
    this.EventHandlers();
  }

  EventHandlers() {  
    $( window ).resize(() => {
      const size = this.SetSize();
      const frame = this.video.children("iframe");
      frame.width(size.width);
      frame.height(size.height);
    });
  }
  
  get options() {
    
  }

  static get snippets() {
    return {
      'youtube': "//www.youtube.com/embed/",
      'youtu': "//www.youtube.com/embed/",
      'vimeo': "//player.vimeo.com/video/",
      'rutube': "//rutube.ru/play/embed/",
      "vk": ""
    };
  }

  Init() {
    const url = this.video.data("src")
    const src = url.match(/https:|http:/) ? new URL(url) : new URL(`https:${url}`);
    const size = this.SetSize();
    const frame = $('<iframe/>', {
      width: size.width,
      height: size.height,
      src: this.CreateURL(src),
      allowfullscreen: "",
      frameborder: 0
    });
    this.SetSize(frame);
    this.video.append(frame);
  }

  SetSize() {
    const width = this.video.data('format').split(":")[0];
    const height = this.video.data('format').split(":")[1];
    const frameWidth = this.video.width();
    const frameHeight = height*frameWidth/width;
    return {width: frameWidth, height: frameHeight};
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
    return src.match(new RegExp(Object.keys(Video.snippets).join("|")))[0];
  }

  TestId(src) {
    return src.match(/([^\/=]+)(?:)/g);
  }
}

$(() => {
  const videos = $('.js-video').map((i, node) => new Video(node));
});