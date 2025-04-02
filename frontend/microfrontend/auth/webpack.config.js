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
    port: 3001, // � ������� �������������� ������ ���� ���� ����
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
      name: 'auth', // ���������� ��� ��������������
      filename: 'remoteEntry.js', // ��� �����, ������� ����� ����������� shell-�����������
      exposes: {
        './App': './src/App',  // ����� ���������� �� ������������
        './Login': './src/components/Login',
        './Register': './src/components/Register',
        './ProtectedRoute': './src/components/ProtectedRoute'
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