import './contacts.styl';
import { User } from '../user/user';
import { Messenger } from '../messenger/messenger';
import data from './data.json';
import $ from 'jquery';

export class Friend extends User {
  constructor(node, id) {
    super();
    this.$friend = $(node);
    this.id = id;
    this.chat = null;
    this._addEventHandler();
  }

  destroy() {
    this.chat = null;
  }

  _addEventHandler() {
    const $link = this.$friend.find('.js-user__link');
    $link.click((event) => {
      event.preventDefault();
      if (!this.chat) {
        const userChat = $(Messenger.template(data[this.id]))
          .addClass('messenger_resizable')
          .addClass('messenger_draggable');
        $(userChat).insertBefore($('.js-layout'));
        this.chat = new Messenger(userChat, this);
        this.chat.setFocus();
      } else {
        this.chat.setFocus();
      }
    });
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
    });
  }
}

$(() => {
  new Contacts($('.js-contacts'));
});
