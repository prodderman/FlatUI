import './user.styl';
import userTemplate from './template.pug';

export class User {
  constructor() { }

  static template(options) {
    return userTemplate({options});
  }
}