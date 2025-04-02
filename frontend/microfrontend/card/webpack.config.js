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
    port: 3003, // � ������� �������������� ������ ���� ���� ����
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
      name: 'card', // ���������� ��� ��������������
      filename: 'remoteEntry.js', // ��� �����, ������� ����� ����������� shell-�����������
      exposes: {
        './App': './src/App',  // ����� ���������� �� ������������
        './AddPlacePopup': './src/components/AddPlacePopup',
        './Card': './src/components/Card',
        './ImagePopup': './src/components/ImagePopup'
      },
      shared: {
        ...require('./package.json').dependencies, // ����� ����������� (react, react-dom, � �.�.)
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};