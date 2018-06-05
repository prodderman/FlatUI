import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/draggable';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';
import 'jquery-ui/themes/base/resizable.css';
import 'jquery-ui/themes/base/draggable.css';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import 'jquery-ui-touch-punch';
import msgTemplate from './template.pug';
import { bind } from 'decko';

class Messenger {
  constructor({node, isDraggable = false, isResizable = false,  destroyInstance}) {
    this.$messenger = $(node);
    this.destroyInstance = destroyInstance;
    this.isDraggable = isDraggable;
    this.isResizable = isResizable;
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

    if (this.isResizable) {
      this.$messenger.addClass('messenger_resizable');
      this.$messenger.resizable({
        minHeight: 429,
        minWidth: this.$messenger.width()
      });
    }

    if (this.isDraggable) {
      this.$messenger.addClass('messenger_draggable');
      this.$messenger.draggable({
        handle: this.$messenger.find('.js-messenger__name'),
        containment: 'window',
        scroll: false
      });
    }
  }

  _addEventHandlers() {
    const $btnClose = this.$messenger.find('.js-messenger__close-button');
    const $formSend = this.$messenger.find('.js-messenger__send-button');
    $formSend.submit(this._makeMessageSending(this.$messenger));
    $btnClose.click(this._closeChat);
  }

  _placeCaretAtEnd(node) {
    node.focus();
    if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
      const range = document.createRange();
      range.selectNodeContents(node);
      range.collapse(false);
      const select = window.getSelection();
      select.removeAllRanges();
      select.addRange(range);
    }
    
    if (typeof document.body.createTextRange != 'undefined') {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(node);
      textRange.collapse(false);
      textRange.select();
    }
  }

  @bind
  _makeMessageSending($messenger) {
    return (event) => {
      const $input = $messenger.find('.js-messenger__input');
      const $msgContainer = $messenger.find('.js-messenger__tape');
      const $scrollContainer = $messenger.find('.js-messenger__chat');
      event.preventDefault();
      if ($input.text()) {
        $.ajax({
          complete: () => {
            this._renderMessage($input.text(), $msgContainer);
            this._scrollDown($scrollContainer);
            $input.empty();
          }
        });
      }
    };
  }

  _scrollDown($container) {
    $container.mCustomScrollbar('scrollTo', 'last');
  }

  _renderMessage(text, $container) {
    const msgWrap = $('<li/>', { class: 'messenger__msg-wrap messenger__msg-wrap_outcoming' });
    const msg = $('<div/>', { class: 'messenger__msg messenger__msg_outcoming' });
    msgWrap.append(msg.text(text));
    $container.append(msgWrap);
  }

  @bind
  _closeChat() {
    if (this.destroyInstance && typeof this.destroyInstance === 'function') {
      this.destroyInstance();
    }
    this.$messenger.remove();
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-messenger' : '.js-messenger');
  if ($components.length > 0) {
    $components.map((index, node) => new Messenger({node}));
  }
}

export { Messenger };
export default render;
