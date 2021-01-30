import path from 'path';

import webpack from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import WebpackShellPlugin from 'webpack-shell-plugin-next';

export const ROOT_PATH = __dirname;

const DIST_PATH = path.resolve(__dirname, 'dist');
const SRC_PATH = path.resolve(__dirname, 'src');
const LIBS_PATH = path.resolve(__dirname, '../');

const PUBLIC_PATH = path.resolve(DIST_PATH, 'public');
export const SERVER_PATH = path.resolve(DIST_PATH, 'server');

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT || '8016', 0);


const config = {
  context: SRC_PATH,
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  module: {
    // @ts-ignore
    rules: [],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          filename: 'js/static.js',
          name: 'static',
          test: /node_modules/,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.PORT': JSON.stringify(PORT),
    }),
  ],
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
    alias: {
      '@reactblog/core': path.resolve(LIBS_PATH, 'reactblog-core', 'src'),
      '@reactblog/ui': path.resolve(LIBS_PATH, 'reactblog-ui', 'src'),
      '@reactblog/node': path.resolve(LIBS_PATH, 'reactblog-node', 'src'),
      'Application': path.resolve(ROOT_PATH, 'src', 'application'),
      'Services': path.resolve(ROOT_PATH, 'src', 'application', 'services'),
    },
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
};

module.exports = [
  {
    devtool: NODE_ENV === 'development' ? 'source-map' : null,
    ...config,
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
        },
      ],
    },
    entry: {
      web: [ path.join(SRC_PATH, 'browser', 'browser.tsx') ],
    },
    output: {
      filename: 'js/[name].js',
      path: PUBLIC_PATH,
      publicPath: '/',
    },
    plugins: [
      ...config.plugins,
      new HtmlWebpackPlugin({
        filename: '../server/views/index.html',
        template: 'server/views/index.html',
        mobile: true,
      }),
      new webpack.DefinePlugin({
        'global.IS_BROWSER': true,
      }),
    ],
    target: 'web',
  },
  {
    ...config,
    devtool: NODE_ENV === 'development' ? 'source-map' : null,
    entry: {
      server: path.join(SRC_PATH, 'server', 'server.tsx'),
    },
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.(ts|tsx)?$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.server.json',
            },
          },
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: SERVER_PATH,
    },
    externals: [
      nodeExternals(),
    ],
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        'global.ROOT_PATH': JSON.stringify(ROOT_PATH),
      }),
      // @ts-ignore
      new WebpackShellPlugin({
        onBuildEnd: {
          scripts: [ 'node dist/server/server.js' ],
          blocking: false,
          parallel: true,
        },
      }),
    ],
    target: 'node',
  }
]
