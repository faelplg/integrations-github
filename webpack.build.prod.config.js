/**
 * @file webpack.build.prod.config.js
 * @desc Build production environment.
 */
const path = require('path');
/**
 * Html load strategies - [html-webpack-plugin template option]{@link https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md}.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Fiber = require('fibers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/** PRODUCTION ONLY! */
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  entry: {
    app: './portfolio/index.js'
    // print: './portfolio/print.js'
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
      // chunks: ['app', 'print']
    }),
    /** Compile into ./styles.css file. */
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    /** Call the css optimizer (minification). */
    /** PRODUCTION ONLY! */
    new OptimizeCSSAssets()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    /** Removed '.bundle' file suffix. */
    filename: '[name].js'
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
        loader: MiniCssExtractPlugin.loader,
        options: {
          sourceMap: true
        }
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
            fiber: Fiber,
            includePaths: ['./node_modules']
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
    // {
    //   test: /\.(md)$/,
    //   use: [{
    //     loader: "file-loader",
    //     options: {
    //       name: '[name].[ext]'
    //     }
    //   }]
    // },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'layout/images/[name].[ext]'
        }
      }]
    }]
  }
};
