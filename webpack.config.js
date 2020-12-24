const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'lib/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: '$',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development'
}