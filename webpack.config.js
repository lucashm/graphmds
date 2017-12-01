const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    fetchData: './src/fetchData.js',
    anotherNetwork : './src/another.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }
     ]
   }
};
