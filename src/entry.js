import 'normalize.css';
import './fonts/FontAwesome/font-awesome.min.css';
import './global/global.styl';

const cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}  
importAll(require.context('./components/', true, /^\.\/.*\.(jsx?)$/));
importAll(require.context('./pages/', true, /^\.\/.*\.(jsx?)$/));

if (module.hot) {
  module.hot.accept();
}