const rspack = require("@rspack/core");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(tsx?|jsx?)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "@babel/plugin-transform-class-properties",
              "@babel/plugin-syntax-dynamic-import",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          enforce: true,
        },
      },
    },
    runtimeChunk: "single",
    minimize: true,
    sideEffects: true,
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      filename: "index.html",
    }),
    new rspack.CssExtractRspackPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/",
    },
    compress: true,
    port: 9000,
    hot: true,
    liveReload: true,
    watchFiles: ["src/**/*"],
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
