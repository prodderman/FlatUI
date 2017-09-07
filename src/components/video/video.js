import './video.styl';

class Video {
  constructor(video) {  
    this.video = $(video);
    this.Init();
  }
  
  get options() {
    
  }

  static get snippets() {
    return {
      'youtube': "https://www.youtube.com/embed/",
      'youtu': "https://www.youtube.com/embed/",
      'vimeo': "https://player.vimeo.com/video/",
      'rutube': "https://rutube.ru/play/embed/"
    };
  }

  Init() {
    const src = new URL(this.video.data("src"));
    const width = this.video.data('format').split(":")[0];
    const height = this.video.data('format').split(":")[1];
    const frameWidth = this.video.width();
    const frameHeight = height*frameWidth/width;
    const frame = $('<iframe/>', {
      width: frameWidth,
      height: frameHeight,
      src: this.CreateURL(src),
      allowfullscreen: "",
      frameborder: 0
    });
    this.video.append(frame);
  }
  
  CreateURL(src) {
    for (let key in Video.snippets){
      if (key === this.TestSrc(src.hostname)) {
        if (key === 'youtube')
          return `${Video.snippets[key]}${this.TestId(src.search)[1]}`;
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