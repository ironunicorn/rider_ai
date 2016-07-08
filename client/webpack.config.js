module.exports = {
  entry: './src/js/app.js',
  output: {
    path: '../server/client/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?cacheDirectory'],
      }
    ]
  }
};
