/** @type {import('webpack').Configuration} */
module.exports = {
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  module: {
    rules: [
      
    ]
  }
};
