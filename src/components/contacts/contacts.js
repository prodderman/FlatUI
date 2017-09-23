import './contacts.styl';
import { User } from '../user-profile/user-profile';
import { Messenger } from '../messenger/messenger';
import data from './data.json';

export class Friend extends User {
  constructor(node, id) {
    super();
    this.friend = $(node);
    this.id = id;
    this.chat = null
    this.AddEventHandler();
  }

  destroy() {
    this.chat = null;
  }

  AddEventHandler() {
    const link = this.friend.find('a.user__link');
    link.click((e) => {
      e.preventDefault();
      if (!this.chat) {
        const userChat = $(Messenger.template(data[this.id]))
                          .addClass("messenger-resizable")
                          .addClass("messenger-draggable");
        $(userChat).insertBefore($('.page'));
        this.chat = new Messenger($(`#user_chat_${this.id}`), this);
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
    this.contacts = $(node);
    this.init();
  }

  init() {
    data.map((user, id) => {
      const userNode = $(Friend.template(user));
      const userInfo = userNode.find(".user__info").clone();
      userNode.find(".user__info").remove();
      this.contacts.find(".contacts__container").append(userNode);
      new Friend($(`#user_${id}`), id);
    })
  }
}

$(() => {
  new Contacts($('#contacts-id'));
});