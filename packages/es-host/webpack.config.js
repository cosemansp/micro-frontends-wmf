const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    library: 'mfLoader',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    filename: 'mfLoader.js',
    globalObject: "typeof self !== 'undefined' ? self : this",
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@babel/preset-typescript'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      scriptLoading: 'blocking',
      inject: 'head',
    }),
  ],
};
