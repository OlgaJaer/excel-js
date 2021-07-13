const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// try favicon-webpack-plagin
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ]

  return loaders
}

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  const filename = (ext) => (isDev
    ? `[name].bundle.${ext}`
    : `[name].bundle.[hash].${ext}`)

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: {
          collapseWhitespace: isProd,
          removeComments: isProd,
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
        // filename: '[name].bundle.css'
      }),
    ]

    if (isDev) {
      base.push(new ESLintPlugin())
    }

    return base
  }

  return {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: 3000,
      // open: true,
      hot: isDev,
      // watchContentBase: true
    },
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: jsLoaders,
        },
      ],
    },
  }
}
