const path = require("path");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const { ESBuildMinifyPlugin } = require("esbuild-loader");

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  output: {
    path: path.resolve(__dirname, `dist`),
    clean: true,
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "esnext",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: "./dist",
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "esnext",
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "theme",
      filename: "remoteEntry.js",
      library: { type: "window", name: "theme" },
      exposes: {
        "./Home": "./src/pages/Home",
        "./NFT": "./src/pages/NFT",
        "./NFTContract": "./src/pages/NFTContract",
        "./Post": "./src/pages/Post",
        "./artiva.config": "./artiva.config",
      },
      shared: {
        react: {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "react-dom": {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "next/router": {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "next/link": {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "next/future/image": {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        lodash: {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "@artiva/shared": {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        wagmi: {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "@headlessui/react": {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "@rainbow-me/rainbowkit": {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
      },
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
