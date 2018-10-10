const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: ['./src/scripts/index/index.js', './src/styles/index/index.scss'],
    second: [
      './src/scripts/second/second.js',
      './src/styles/second/second.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].min.js',
    library: 'name'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
    watchContentBase: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'import-glob-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false }
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].min.css'
    }),
    new CleanWebpackPlugin('dist'),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: path.resolve(__dirname, 'src/styles/'),
      files: '**/*.scss',
      failOnError: false,
      quiet: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: path.resolve(__dirname, 'src/views/index/index.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'second.html',
      chunks: ['second'],
      template: path.resolve(__dirname, 'src/views/second-page/second-page.pug')
    }),
    new WebpackBuildNotifierPlugin({
      title: 'Webeefy',
      logo: path.resolve(__dirname, 'src/images/logo45.png'),
      suppressSuccess: true
    })
    // new BundleAnalyzerPlugin(),
  ]
};
