const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  // console.log('mode: ', argv.mode);
  return {
    entry: './src/index',
    cache: false,

    mode: 'production',
    devtool: 'source-map',

    optimization: {
      minimize: false,
      // moduleIds: 'deterministic',
      // chunkIds: 'deterministic',
    },

    output: {
      publicPath: 'auto',
      filename: isProduction ? '[name].[contenthash].js' : undefined,
      path: path.resolve(process.cwd(), 'dist'),
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
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

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-typescript')],
          },
        },
        {
          test: /\.png$/,
          type: 'asset/resource',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      isProduction &&
        new webpack.ids.DeterministicChunkIdsPlugin({
          maxLength: 5,
        }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new ModuleFederationPlugin({
        name: pkg.name,
        library: { type: 'var', name: pkg.name },
        filename: 'remoteEntry.js',
        exposes: {
          './UserList': './src/exposed/UserList',
          './QuickCreate': './src/exposed/quickCreate',
        },
        shared: {
          // ...pkg.dependencies,
          react: { singleton: true, strictVersion: true, requiredVersion: '>=17.0.0 <17.1.0' },
          'react-dom': { singleton: true, strictVersion: true, requiredVersion: '>=17.0.0 <17.1.0' },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ].filter(Boolean),
  };
};
