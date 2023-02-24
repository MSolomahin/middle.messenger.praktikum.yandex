const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  watch: true,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    https: true,
    compress: true,
    port: 1234,
    hot: true,
    open: true,
    proxy: [
      {
        context: ['/proxy-api/**'],
        target: 'https://proxy-api/api/',
        pathRewrite: { '^/api/': '/' },
        secure: false,
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('Host', 'my-custom-host')
        }
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.tmpl$/i,
        loader: 'html-loader'
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './postcss.config.js')
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './static/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css'
    })
  ]
}
