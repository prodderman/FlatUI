import 'normalize.css';
import './fonts/FontAwesome/font-awesome.min.css';
import './global/global.styl';

const cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key.match(/([^\/]+)(?=\.)/g)] = r(key));
}  

importAll(require.context('./pages/', true, /^\.\/.*\.(jsx?)$/));
importAll(require.context('./components/', true, /^\.\/.*\.(jsx?)$/));

if (module.hot) {
  module.hot.accept();
}

export default cache;