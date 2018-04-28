import 'normalize.css';
import './fonts/FontAwesome/font-awesome.min.css';
import './global/global.styl';
import 'jquery-pjax';

const cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}
importAll(require.context('./components/', true, /^\.\/.*\.(jsx?)$/));
importAll(require.context('./pages/', true, /^\.\/.*\.(jsx?)$/));

for (let key in cache) {
  try {cache[key].default();}
  catch (e){};
}

if (module.hot) {
  module.hot.accept();
}

$(document).pjax('a[data-pjax]', '.js-layout__pjax-container', {
  fragment: '.js-layout__pjax-container',
  timeout: 3000
});

$('.js-layout__pjax-container').on('ready pjax:end', () => {
  for (let key in cache) {
    try {cache[key].default(true);}
    catch (e){};
  }
});