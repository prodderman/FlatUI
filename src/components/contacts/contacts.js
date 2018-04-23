import './contacts.styl';
import { User } from '../user-profile/user-profile';
import { Messenger } from '../messenger/messenger';
import data from './data.json';

export class Friend extends User {
  constructor(node, id) {
    super();
    this.$friend = $(node);
    this.id = id;
    this.chat = null
    this._addEventHandler();
  }

  destroy() {
    this.chat = null;
  }

  _addEventHandler() {
    const link = this.$friend.find('a.js-user__link');
    link.click((event) => {
      event.preventDefault();
      if (!this.chat) {
        const userChat = $(Messenger.template(data[this.id]))
                          .addClass('messenger-resizable')
                          .addClass('messenger-draggable');
        $(userChat).insertBefore($('.js-'));
        this.chat = new Messenger(userChat, this);
        this.chat.setFocus()
      }
      else {
        this.chat.setFocus();
      }
    })
  }
}

export class Contacts {
  constructor(node) {
    this.contacts = node;
    this._init();
  }

  _init() {
    data.map((user) => {
      const $userWrap = $('<div/>', { class: 'contacts__user-wrap' });
      const $userNode = $(Friend.template(user.userInfo));
      $userNode.find('.js-user__info').remove();
      $userWrap.append($userNode);
      this.contacts.find('.js-contacts__container').append($userWrap);
      new Friend($userNode, user.userInfo.id);
    })
  }
}

$(() => {
  new Contacts($('.js-contacts'));
});