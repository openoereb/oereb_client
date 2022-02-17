const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './oereb_client/static/src/oereb_client.js',
  mode: 'production',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'oereb_client', 'static', 'build'),
    library: 'oerebClient',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
        type: 'asset/resource'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),
    new webpack.SourceMapDevToolPlugin({})
  ],
  watchOptions: {
    ignored: '**/node_modules'
  }
};
