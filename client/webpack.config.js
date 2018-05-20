const path = require('path');

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist/"),
    port: 3000
}
}
