const path = require('path');

module.exports = {
  entry: './oereb_client/static/js/oereb_client.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    jquery: 'jQuery'
  }
};
