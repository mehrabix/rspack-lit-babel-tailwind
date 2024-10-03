const rspack = require('@rspack/core');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(tsx?|jsx?)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-transform-class-properties"
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new rspack.HotModuleReplacementPlugin(),
    new rspack.CssExtractRspackPlugin({
      filename: 'global.css',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    compress: true,
    port: 9000,
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
