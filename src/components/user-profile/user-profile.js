import './user-profile.styl';
import userTemplate from './template.pug';

export default class User {
  constructor(node, info) {
    this.user = $(user);
    this.info = info;
  }

  static template(options) {
    return userTemplate(options);
  }
}