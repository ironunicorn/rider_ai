module.exports = {
  entry: './src/js/app.js',
  output: {
    path: '../server/client/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['babel?cacheDirectory'],
      }
    ]
  }
};
