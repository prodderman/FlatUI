const config = require('webpack-config');

config.environment.setAll({
    env: () => process.env.NODE_ENV
});

module.exports = new config.default().extend('webpack/webpack.[env].config.js');