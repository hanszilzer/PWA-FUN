const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [

      new HtmlWebpackPlugin({
        template: './index.html',

      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Contact Cards',
        short_name: 'Contact',
        description: 'Never forget your contacts!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
 
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
        exclude: [/\.map$/, /manifest\.json$/],
      })
    ],
    module: {
      rules: [
     
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
   
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
  };
};
