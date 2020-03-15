const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
};

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
    // analytics: './analytics.js' - чтобы задавать несколько точек входа
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  // resolve: {
  //   extensions: ['.js', '.json', '.png'], - чтобы при импорте файлов в js, не писать их расширения
  //   alias: {
  //     '@components': path.resolve(__dirname, 'src/components'),
  //     '@assets': path.resolve(__dirname, 'src/assets')
  //   }
  // },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/favicon'),
        to: path.resolve(__dirname, 'dist/assets/favicon')
      },
      {
        from: path.resolve(__dirname, 'src/assets/fonts/css'),
        to: path.resolve(__dirname, 'dist/assets/fonts/css')
      },
      {
        from: path.resolve(__dirname, 'src/assets/fonts/font'),
        to: path.resolve(__dirname, 'dist/assets/fonts/font')
      },
      {
        from: path.resolve(__dirname, 'src/assets/icons'),
        to: path.resolve(__dirname, 'dist/assets/icons')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.scss$/,
      //   use: cssLoaders('sass-loader')
      // },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: '> 3%'
                }
              }]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      }
    ]
  }
}