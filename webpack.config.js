const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const jsSourcePath = path.join(__dirname, './pkg');
const buildPath = path.join(__dirname, './build');

const entrys = {};

function setEntry(src) {
  fs.readdirSync(src).forEach((dirItem) => {
    const entryPath = path.join(jsSourcePath, dirItem, 'lib/main.js');
    if (dirItem.indexOf('weexpack') >= 0 && fs.existsSync(entryPath)) {
      entrys[dirItem] = entryPath;
    }
  });
}
setEntry(jsSourcePath);
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
];
// Common rules
const rules = [{
  test: /\.(js|jsx)$/,
  exclude: path.resolve(__dirname, "node_modules"),
  use: [
    'babel-loader',
  ],
}];
// Development rules
rules.push(
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
    ],
  }
);

// Development plugins
plugins.push(
  new DashboardPlugin()
);


console.log(entrys);

module.exports = {
  context: jsSourcePath,
  entry: entrys,
  output: {
    path: buildPath,
    filename: '[name]/main.js',
  },
  module: {
    rules,
  },
  plugins,
  target: 'node',
  externals: [nodeExternals()], 
};
