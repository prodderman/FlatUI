import './user-profile.styl';
import userTemplate from './template.pug';

export default class User {
  constructor() { }

  static template(options) {
    return userTemplate({options});
  }
}