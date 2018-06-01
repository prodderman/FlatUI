import userTemplate from './template.pug';

class User {
  constructor() { }

  static template(options) {
    return userTemplate({options});
  }
}

export { User };
