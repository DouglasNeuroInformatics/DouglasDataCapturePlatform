const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const repoRootDir = path.resolve('..', '..');
const tsConfigFile = path.resolve(__dirname, 'tsconfig.build.json');

console.log(repoRootDir);

//process.exit(1)
/** @type {import('webpack').Configuration} */
module.exports = {
  //  entry: ['webpack/hot/poll?100', path.resolve(__dirname, 'src', 'main.ts')],
  entry: [path.resolve(__dirname, 'src', 'main.ts')],
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node',
  ignoreWarnings: [/^(?!CriticalDependenciesWarning$)/],
  externals: [nodeExternals()],
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: tsConfigFile
          //transpileOnly: true
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigFile
      })
    ]
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = ['@nestjs/microservices', 'cache-manager', 'class-validator', 'class-transformer'];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()]
          });
        } catch (err) {
          return true;
        }
        return false;
      }
    })
  ],
  /*&
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({ name: 'server.js', autoRestart: false })
  ],
  */
  output: {
    clean: true,
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  }
};
