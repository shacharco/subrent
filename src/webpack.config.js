const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoader = require("vue-loader");


module.exports = {
    mode: process.env.NODE_ENV,

    entry: "./src/client/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist",
        filename: "build.js"
    },
    module: {
        rules: [
          {
            test: /\.pug$/,
            exclude: /node_modules/,
            use: ['html-loader', 'pug-plain-loader'],
          },
          {
            test: /\.vue$/,
            use: ['vue-loader']
            // options: {
            //   // vue-loader options go here
            // }
          },
          {
            test: /\.html$/, // tells webpack to use this loader for all ".html" files
            loader: 'html-loader'
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      resolve: {
        alias: {
          'public': path.resolve(__dirname, './src/client/public')
        },
        extensions: ['', '.js', '.pug', '.vue', '.css']
      },
      devServer: {
        historyApiFallback: true,
        noInfo: true
      },
      // devtool: '#eval-source-map',
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname, './client/public/views/index.pug'),
          favicon: path.resolve(__dirname, './client/public/static/icon.jpg'),
          inject: true
        }),
        // new VueLoader.VueLoaderPlugin()
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
      ]
    }
    
    if (process.env.NODE_ENV === 'production') {
      module.exports.devtool = '#source-map'
      // http://vue-loader.vuejs.org/en/workflow/production.html
      module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            warnings: false
          }
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
      ])
    }