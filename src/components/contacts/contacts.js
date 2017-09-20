import './contacts.styl';
import User from '../user-profile/user-profile';
import Messenger from '../messenger/messenger';
import data from './data.json';

class Friend extends User {
  constructor(node, id, data) {
    super();
    this.friend = $(node);
    this.id = id;
    this.data = data;
    this.chatActive = false
    this.AddEventHandler();
  }

  set active(bool) {
    this.chatActive = bool;
  }

  AddEventHandler() {
    const link = this.friend.find('a.user__link');
    link.click((e) => {
      e.preventDefault();
      if (!this.chatActive) {
        const userChat = $(Messenger.template(data[this.id]))
                          .addClass("messenger-resizable")
                          .addClass("messenger-draggable");
        $(userChat).insertBefore($('.page'));
        new Messenger($(`#user_chat_${this.id}`), this);
        this.chatActive = true;
      }
    })
  }
}

class Contacts {
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