import './messenger.styl';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/draggable';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';
import 'jquery-ui/themes/base/resizable.css';
import 'jquery-ui/themes/base/draggable.css';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import 'jquery-ui-touch-punch';
import msgTemplate from './template.pug';

export class Messenger {
  constructor(node, target) {
    this.$messenger = $(node);
    this.target = target;
    this._init();
    this._addEventHandlers();
  }

  static template(options) {
    return msgTemplate({ options });
  }

  setFocus() {
    this.$messenger.find('.js-messenger__input').focus();
    this._placeCaretAtEnd(this.$messenger.find('.js-messenger__input').get(0));
  }

  _init() {
    this.$messenger.find('.js-messenger__chat').mCustomScrollbar({
      axis: 'y',
      scrollInertia: 7,
      theme: 'dark'
    }).mCustomScrollbar('scrollTo', 'last');

    if (this.$messenger.hasClass('messenger-resizable')) {
      this.$messenger.resizable({
        minHeight: 429,
        minWidth: this.$messenger.width()
      });
    }

    if (this.$messenger.hasClass('messenger-draggable')) {
      this.$messenger.draggable({
        handle: this.$messenger.find('.js-messenger__name'),
        containment: 'window',
        scroll: false
      });
    }
  };

  _addEventHandlers() {
    const btnClose = this.$messenger.find('.js-messenger__close');
    const btnSend = this.$messenger.find('.js-messenger__btn');
    const input = this.$messenger.find('.js-messenger__input');
    const msgContainer = this.$messenger.find('ul.js-messenger__tape');

    btnSend.click((e) => {
      if (input.text()) {
        $.ajax({
          type: 'POST',
          url: '',
          data: input.text(),
          success: () => {

          },
          complete: () => {
            const msgWrap = $('<div/>', {
              class: 'messenger__msg-wrap messenger__msg-wrap_out'
            });
            const msg = $('<div/>', {
              class: 'messenger__msg messenger__msg_out'
            });
            msgWrap.append(msg.text(input.text()));
            msgContainer.append(msgWrap);
            this.$messenger.find('.js-messenger__chat').mCustomScrollbar('scrollTo', 'last');
            input.empty();
          }
        });
      };
    });

    btnClose.click((e) => {
      if (this.target) {
        this.target.destroy();
        this.target = null;
      }
      this.$messenger.remove();
    });
  };

  _placeCaretAtEnd(node) {
    node.focus();
    if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
        const range = document.createRange();
        range.selectNodeContents(node);
        range.collapse(false);
        const select = window.getSelection();
        select.removeAllRanges();
        select.addRange(range);
    } else if (typeof document.body.createTextRange != 'undefined') {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(node);
        textRange.collapse(false);
        textRange.select();
    }
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.layout .js-messenger' : '.js-messenger').map((index, node) => new Messenger(node));
  })
}