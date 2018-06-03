import { User } from '../user/user';
import { Messenger } from '../messenger/messenger';
import data from './data.json';
import { bind } from 'decko';

class Friend extends User {
  constructor(node, id) {
    super();
    this.$friend = $(node);
    this.id = id;
    this.chat = null;
    this._addEventHandler();
  }

  _addEventHandler() {
    const $link = this.$friend.find('.js-user__link');
    $link.click(this._mountChat);
  }
  
  @bind
  _mountChat(event) {
    event.preventDefault();
    if (!this.chat) {
      const userChat = $(Messenger.template(data[this.id]))
        .addClass('messenger_resizable')
        .addClass('messenger_draggable');
      $(userChat).insertBefore($('.js-layout'));
      this.chat = new Messenger({ node: userChat, isDraggable: true, isResizable: true, destroyInstance: this._destroyInstance });
      this.chat.setFocus();
    } else {
      this.chat.setFocus();
    }
  }

  @bind
  _destroyInstance() {
    this.chat = null;
  }
}

class Contacts {
  constructor(node) {
    this.contacts = node;
    this._init();
  }

  _init() {
    data.forEach(this._renderUser);
  }

  @bind
  _renderUser(user) {
    const $userWrap = $('<div/>', { class: 'contacts__user-wrap' });
    const $userNode = $(Friend.template(user.userInfo));
    $userNode.find('.js-user__info').remove();
    $userWrap.append($userNode);
    this.contacts.find('.js-contacts__container').append($userWrap);
    new Friend($userNode, user.userInfo.id);
  }
}

function render() {
  new Contacts($('.js-contacts'));
}

$( document ).ready(render);
