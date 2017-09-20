import './messenger.styl';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/draggable';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';
import 'jquery-ui/themes/base/resizable.css';
import 'jquery-ui/themes/base/draggable.css';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import msgTemplate from './template.pug';

export default class Messenger {
  constructor(node, target) {
    this.messenger = $(node);
    this.tagert = target;
    this.init();
    this.addEventHandlers();
  }

  static template(options) {
    return msgTemplate({ options });
  }

  addEventHandlers() {
    const btnClose = this.messenger.find(".js-messenger__close");
    const btnSend = this.messenger.find(".js-messenger__btn");
    const input = this.messenger.find(".messenger__input");
    const msgContainer = this.messenger.find("ul.messenger__tape");

    btnSend.click((e) => {
      if (input.text()) {
        $.ajax({
          type: "POST",
          url: "",
          data: input.text(),
          succes: () => {

          },
          complete: () => {
            const msgWrap = $('<div/>', {
              class: "messenger__msg-wrap messenger__msg-wrap--out"
            });
            const msg = $('<div/>', {
              class: "messenger__msg messenger__msg--out"
            });
            msgWrap.append(msg.text(input.text()));
            msgContainer.append(msgWrap);
            this.messenger.find('.messenger__chat').mCustomScrollbar("scrollTo", "last");
            input.empty();
          }
        });
      };
    });

    btnClose.click((e) => {
      if (this.tagert) {
        this.tagert.destroy();
        this.tagert = null;
      }
      this.messenger.remove();
    });
  };

  init() {
    this.messenger.find('.messenger__chat').mCustomScrollbar({
      axis: "y",
      scrollInertia: 7,
      theme: "dark"
    }).mCustomScrollbar("scrollTo", "last");

    if (this.messenger.hasClass("messenger-resizable")) {
      this.messenger.resizable({
        minHeight: 429,
        minWidth: this.messenger.width()
      });
    }

    if (this.messenger.hasClass("messenger-draggable")) {
      this.messenger.draggable({
        handle: this.messenger.find(".messenger__name"),
        containment: "window",
        zIndex: 100,
        scroll: false
      });
    }
  };

  setFocus() {
    this.messenger.find(".messenger__input").focus();
    this.placeCaretAtEnd(this.messenger.find(".messenger__input").get(0));
  }

  placeCaretAtEnd(node) {
    node.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(node);
        range.collapse(false);
        const select = window.getSelection();
        select.removeAllRanges();
        select.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(node);
        textRange.collapse(false);
        textRange.select();
    }
}
}

$(() => {
  $('.js-messenger').map((index, node) => new Messenger(node));
})