/* global process */
const webpack = require('webpack');
const Path = require('path');

const paths = {
  srcJs: Path.resolve('src'),
  dist: Path.resolve('dist'),
};

module.exports = {
  entry: {
    main: Path.join(paths.srcJs, 'boot', 'index.js'),
  },
  output: {
    path: paths.dist,
    filename: Path.join('[name].js'),
  },
  target: 'node',
  externals: {
    sequelize: 'require("sequelize")',
  },
  resolve: {
    modules: [
      paths.srcJs,
      'node_modules',
    ],

    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'react',
          ],
          plugins: ['transform-object-rest-spread'],
          comments: false,
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
