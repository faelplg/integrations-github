/**
 * @file webpack.serve.dev.config.js
 * @desc Serve development environment.
 */
const path = require('path');
const webpack = require('webpack');
/**
 * Html load strategies - [html-webpack-plugin template option]{@link https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md}.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Fiber = require('fibers');
const DashboardPlugin = require('webpack-dashboard/plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
    // print: './src/print.js'
  },
  /**
   * Use the code below for source-map debugging settings.
   */
  // devtool: 'cheap-eval-source-map',
  // devtool: 'inline-source-map',
  // devtool: 'eval-source-map',
  plugins: [
    /**
     * Html webpack template advanced config - [html-webpack-template]{@link https://github.com/jaketrent/html-webpack-template}
     */
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  /**
   * Use the code below for multiple pages website.
   */
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            require('autoprefixer')({flexbox: 'no-2009', grid: 'autoplace'})
          ]
        }
      },{
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          implementation: require('sass'),
          sassOptions: {
            fiber: Fiber
            // includePaths: ['./node_modules']
          }
        }
      }]
    }, {
      test: /\.html$/,
      use: [
        'html-loader'
      ]
    },
    /**
     * Use the code below for compiling Markdown files.
     */
    {
      test: /\.(md)$/,
      use: [{
        // loader: "markdown-loader"
        loader: 'raw-loader'
        // options: {
        //   name: '[name].[ext]'
        // }
      }]
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'layout/images/[name].[ext]'
        }
      }]
    }]
  },
  devServer: {
    // publicPath: '/',
    // contentBase: path.resolve(__dirname, 'public'),
    // watchContentBase: true,
    hot: true,
    open: true,
    port: 3000,
    // openPage: '/acesso',
    historyApiFallback: true
  }
};
