import 'normalize.css';
import '../../global/global.styl';
import './UI-Kit.styl';

const cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../../components', true, /^\.\/.*\.(jsx?)$/));