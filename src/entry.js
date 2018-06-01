import 'normalize.css';
import './fonts/FontAwesome/font-awesome.min.css';
import './global/global.styl';
import 'jquery-pjax';

const scripts = {};

function importAllScripts(context) {
  context.keys().forEach(key => scripts[key] = context(key));
}

function importAllStyles(context) {
  context.keys().forEach(key => context(key));
}

importAllScripts(require.context('./components/', true, /^\.\/.*\.js$/));
importAllStyles(require.context('./components/', true, /^\.\/.*\.styl$/));

for (let key in scripts) {
  if (scripts[key].default) {
    scripts[key].default();
  }
}

$(document).pjax('a[data-pjax]', '.js-layout__pjax-container', {
  fragment: '.js-layout__pjax-container'
});

$(document).on('ready pjax:end', () => {
  for (let key in scripts) {
    if (scripts[key].default) {
      scripts[key].default(true);
    }
  }
});

if (module.hot) {
  module.hot.accept();
}
