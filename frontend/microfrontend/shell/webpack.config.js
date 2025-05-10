const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000, // Shell-���������� �� ����� �����
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell', // ���������� ��� shell-����������
      remotes: {
        auth: 'auth@http://localhost:3001/remoteEntry.js',  // ��� ������ ������������� auth
        profile: 'profile@http://localhost:3002/remoteEntry.js',
        card: 'card@http://localhost:3003/remoteEntry.js',
      },
      shared: {
        ...require('./package.json').dependencies, // ����� �����������
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
