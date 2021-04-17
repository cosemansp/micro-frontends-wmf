const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const pkg = require('./package.json');

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: 'http://localhost:3000/',
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
          presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-typescript')],
        },
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    compress: true,

    // required to allow CORS on DevServer (see <script crossorigin ...></script>)
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: pkg.name,
      library: { type: 'var', name: pkg.name },
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1',
        app3: 'app3',
      },
      exposes: {},
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
