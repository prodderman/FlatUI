import 'normalize.css';
import './fonts/FontAwesome/font-awesome.min.css';
import './global/global.styl';
import 'jquery-pjax';
import $ from 'jquery';

const cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}
importAll(require.context('./components/', true, /^\.\/.*\.js$/));
importAll(require.context('./components/', true, /^\.\/.*\.styl$/));

for (let key in cache) {
  try {
    cache[key].default();
  }
  catch (error) {
    console.log(error);
  }
}

if (module.hot) {
  module.hot.accept();
}

$(document).pjax('a[data-pjax]', '.js-layout__pjax-container', {
  fragment: '.js-layout__pjax-container'
});

$(document).on('ready pjax:end', () => {
  for (let key in cache) {
    try {cache[key].default(true);}
    catch (error) {
      console.log(error);
    }
  }
});