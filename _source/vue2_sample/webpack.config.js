const webpack           = require("webpack");
const LiveReload        = require("webpack-livereload-plugin");
const UglifyJsPlugin    = require('uglifyjs-webpack-plugin');
const config            = require("./config.js");
const buildPath         = "./dist";

// --------------------------------------------------------------------------------
//  env
// --------------------------------------------------------------------------------
// const ENV = process.env.npm_lifecycle_event;
// const isTraining = ENV === 'dev';
// const isProduction = process.env.NODE_ENV === "production";


// --------------------------------------------------------------------------------
//  start
// --------------------------------------------------------------------------------
module.exports = {
  entry: {
    'app': [
        './src/index.js',
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    public: config.host,
    hot: true,
    port: 8080,
    inline: true,
    compress: true,
    https: config.is_ssl,
  },
  node: {
    fs: 'empty',    // 讓 webpack 可以使用 fs library
  },
  module: {
    rules: [
      //
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      //
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      // yarn add --dev css-loader style-loader
      {
        test: /\.css$/,
        use: [
                                        // {loader: "vue-style-loader"},
            {loader: "style-loader"},   // creates style nodes from JS strings
            {loader: "css-loader"}      // translates CSS into CommonJS
        ]
      },
      // url-loader file-loader
      // font to fonts/
      // image to images/
      // [hash:7] 的作用是防快取
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }]
      }
      //
      //{ test: /\.(png|gif|jpe?g|svg)$/i,  loader: 'url-loader?limit=8192' },
      //{ test: /\.(png|gif|jpe?g)$/i,      loader: "file-loader?name=" + buildPath + "/static/[name]-[hash].[ext]" },
    ]
  },
  plugins: [
    new LiveReload(),
    //new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),   // --hot
    new UglifyJsPlugin({
      uglifyOptions: {
        sourceMap: false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
  ],
  output: {
    filename: buildPath + '/[name].js',
    publicPath: config.host_url,
  }
};




// --------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------

/*

    file-loader example
        require("file-loader?name=[name].[ext]");

    examplePlugins
        是用來拓展 Webpack 的功能
        它們會在整個構建過程中生效

    Loaders
        在打包構建過程中用來處理源文件的 (JSX，Scss，Less..)
        一次處理一個
        插件並不直接操作單個文件
        它直接對整個構建過程其作用

    devServer 參數請查閱
        https://github.com/webpack/docs/wiki/webpack-dev-server

*/

