const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const plugins = [
  new MiniCssExtractPlugin(),
  new htmlWebpackPlugin({
    template: './src/index.html',
  }),
];

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  let mode = isDevelopment ? 'development' : 'production';

  console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);
  console.log('mode :>> ', mode);
  console.log('isDevelopment :>> ', isDevelopment);

  console.log(
    'isDevelopment && env.WEBPACK_SERVE :>> ',
    isDevelopment && env.WEBPACK_SERVE
  );
  console.log('argv', argv);
  console.log('env', env);

  console.log('argv.mode', argv.mode);
  console.log('env.WEBPACK_SERVE', env.WEBPACK_SERVE);
  console.log('env.WEBPACK_BUNDLE', env.WEBPACK_BUNDLE);

  if (isDevelopment) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  return {
    mode: mode,
    entry: ['./src/index.js'],

    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: 'images/[hash][ext][query]',
    },

    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.s?css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: '' },
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },

    plugins: plugins,

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    devtool: 'source-map',
    devServer: {
      static: path.resolve(__dirname, 'dist'),
    },
  };
};
