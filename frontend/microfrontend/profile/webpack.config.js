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
    port: 3002, // У каждого микрофронтенда должен быть свой порт
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
      name: 'profile', // Уникальное имя микрофронтенда
      filename: 'remoteEntry.js', // Имя файла, который будет загружаться shell-приложением
      exposes: {
        './App': './src/App',  // Какие компоненты мы экспортируем
        './EditAvatarPopup': './src/components/EditAvatarPopup',
        './EditProfilePopup': './src/components/EditProfilePopup'
        './PopupWithForm': './src/components/PopupWithForm'
      },
      shared: {
        ...require('./package.json').dependencies, // Общие зависимости (react, react-dom, и т.д.)
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};