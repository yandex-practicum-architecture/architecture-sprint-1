***Задание 1***

**Условие:**
    
Вам нужно разделить проект Mesto на несколько микрофронтендов. Самостоятельно решите, какой фреймворк будете использовать, — Module Federation или Single SPA.

    Уровень 1. Проектирование
    Выберите фреймворк для создания микрофронтендов и опишите решение в удобном вам виде.

    Уровень 2. Планирование изменений
    Предоставьте структуру кода и обоснуйте своё решение в Readme.md. Вы можете создать необходимые проекты, добавить в них подкаталоги для контролов и логики, разложить код исходного проекта по ним, но запускать проекты не нужно.
    Главное — верно определить, какие компоненты в какой микрофронтенд пойдут.

    Уровень 3. Запуск готового кода
    Настройте маршрутизацию и убедитесь, что все компоненты работают корректно.

**Решение:**

* Уровень 1,2

Разбиваем монолитный фронтенд на микрофронтенды с использованием Module Federation.

Module Federation — это функция Webpack 5, которая позволяет динамически загружать и использовать модули из разных, независимо развернутых приложений, для реализации микрофронтенд-архитектуры.

Аргументы в пользу выбора Module Federation:

* Module Federation позволяет загружать только те модули, которые необходимы в данный момент, что может значительно улучшить производительность приложения.
* С помощью Module Federation можно легко управлять зависимостями и версиями библиотек, что позволяет избежать конфликтов и проблем совместимости.
* С помощью Module Federation можно легко делиться общими библиотеками или компонентами между различными частями приложения. Это снижает дублирование кода и облегчает поддержку.
* Module Federation позволяет каждому модулю (или микрофронту) развиваться независимо. Это значит, что команды могут обновлять свои части приложения без необходимости пересборки всего проекта, что особенно важно для больших команд.
* Поскольку каждая команда может разрабатывать и развертывать свою часть приложения независимо, это упрощает процессы CI/CD и DevOps.

**Реализация:**

Учитывая структуру нашего приложения, возможны несколько кандидатов на выделение в отдельные микрофронтенды:

1.  **`auth` (Аутентификация):**  Обработка логина, регистрации, восстановления пароля и т.д. (компоненты `Login`, `Register`, `ProtectedRoute`, `InfoTooltip`).
2.  **`profile` (Профиль пользователя):** Отображение и редактирование информации о пользователе (компоненты `Profile`, `EditProfilePopup`, `EditAvatarPopup`).
3.  **`card` (Карточки):**  Отображение, добавление, удаление и лайки карточек (компоненты `Card`, `AddPlacePopup`, `ImagePopup`).

**Структура каталогов (после рефакторинга):**

```
project-root/
├── auth/                # Микрофронтенд аутентификации
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── InfoTooltip.js
│   │   │   └── ProtectedRoute.js
│   │   ├── blocks/
│   │   │   ├── auth-form
│   │   │   │   └── ...
│   │   │   └── login
│   │   │   │   └── ...
│   │   ├── images/
│   │   │   │   └── ...
│   │   ├── utils/         # Функции для работы с аутентификацией (auth.js)
│   │   │   └── auth.js
│   │   ├── App.js         # Корневой компонент auth (можно переиспользовать существующий)
│   │   ├── index.js       # Точка входа для микрофронтенда
│   │   └── ... (другие файлы и зависимости)
│   ├── webpack.config.js  # Webpack config для Module Federation
│   └── package.json
├── profile/             # Микрофронтенд профиля
│   ├── src/
│   │   ├── components/
│   │   │   ├── PopupWithForm.js
│   │   │   ├── EditProfilePopup.js
│   │   │   └── EditAvatarPopup.js
│   │   ├── blocks/
│   │   │   └── profile
│   │   │   │   └── ...
│   │   ├── images/
│   │   │   │   └── ...
│   │   ├── App.js         # Корневой компонент profile
│   │   ├── index.js       # Точка входа для микрофронтенда
│   │   └── ... (другие файлы и зависимости)
│   ├── webpack.config.js
│   └── package.json
├── card/                # Микрофронтенд карточек
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card.js
│   │   │   ├── AddPlacePopup.js
│   │   │   ├── Main.js
│   │   │   ├── PopupWithForm.js
│   │   │   ├── ImagePopup.js
│   │   ├── blocks/
│   │   │   ├── card
│   │   │   │   └── ...
│   │   │   ├── popup
│   │   │   │   └── ...
│   │   │   └── places
│   │   │   │   └── ...
│   │   ├── images/
│   │   │   │   └── ...
│   │   ├── App.js         # Корневой компонент card
│   │   ├── index.js       # Точка входа для микрофронтенда
│   │   └── ... (другие файлы и зависимости)
│   ├── webpack.config.js
│   └── package.json
├── shell/               # Shell-приложение (контейнер)
│   ├── src/
│   │   ├── App.js         # Главный компонент, который собирает микрофронтенды
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── Main.js    # Содержит контейнеры для карточек и профиля
│   │   ├── blocks/
│   │   │   ├── content
│   │   │   │   └── ...
│   │   │   ├── footer
│   │   │   │   └── ...
│   │   │   ├── header
│   │   │   │   └── ...
│   │   │   └── page
│   │   │   │   └── ...
│   │   ├── images/
│   │   │   │   └── ...
│   │   ├── contexts/
│   │   │   │   └── CurrentUserContext.js
│   │   ├── index.js       # Точка входа для shell
│   │   └── ... (другие файлы и зависимости)
│   ├── public/           # Статические ресурсы (index.html, favicon.ico, и т.д.)
│   ├── webpack.config.js
│   └── package.json
└── ... (другие файлы проекта)
```

**Перемещение файлов:**

1.  **`auth`:**
    *   Перемещаем компоненты `Login.js`, `Register.js`, `InfoTooltip.js`, `ProtectedRoute.js` и `auth.js` (из `src/utils`) в директорию `auth/src/components` и `auth/src/utils` соответственно.
    *   Создаем `auth/src/index.js`, который будет экспортировать компоненты для использования в shell-приложении.
    *   Копируем стили, специфичные для этих компонентов, из `src/blocks` в `auth/src/blocks`.
2.  **`profile`:**
    *   Перемещаем компоненты `EditAvatarPopup.js`, `EditProfilePopup.js`, `PopupWithForm.js` в директорию `profile/src/components`.
    *   Копируем стили, специфичные для этих компонентов, из `src/blocks` в `profile/src/blocks`.
    *   Создаем `profile/src/index.js`, который будет экспортировать компоненты для использования в shell-приложении.
3.  **`card`:**
    *   Перемещаем компоненты `Card.js`, `AddPlacePopup.js`, `ImagePopup.js`, `Main.js`, `PopupWithForm`  в директорию `card/src/components`.
    *   Перемещаем изображения карточек из `src/images` в `card/src/images`.
    *   Копируем стили, специфичные для этих компонентов, из `src/blocks` в `card/src/blocks`.
    *   Создаем `card/src/index.js`, который будет экспортировать компоненты для использования в shell-приложении.
4.  **`shell`:**
    *   В `shell/src/App.js` импортируем компоненты из микрофронтендов:

    ```javascript
    import React, { Suspense, lazy } from 'react';

    const AuthModule = lazy(() => import('auth/App')); // 'auth' - имя, указанное в webpack.config.js для микрофронтенда auth
    const ProfileModule = lazy(() => import('profile/App'));
    const CardModule = lazy(() => import('card/App'));

    function App() {
      return (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <AuthModule />
            <ProfileModule />
            <CardModule />
          </Suspense>
        </div>
      );
    }

    export default App;
    ```

    *   Компоненты `Header.js`, `Footer.js`, `Main.js`, а также общие стили и контексты (`src/index.css`, `src/contexts`) остаются в `shell/src`.
    *   `shell/public` содержит статические ресурсы.

**Настройка Webpack для Module Federation:**

В каждом микрофронтенде (auth, profile, card) и в shell-приложении настраиваем Webpack.  Пример конфигурации для одного из микрофронтендов (например, `auth/webpack.config.js`):

```javascript
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
    port: 3001, // У каждого микрофронтенда должен быть свой порт
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
      name: 'auth', // Уникальное имя микрофронтенда
      filename: 'remoteEntry.js', // Имя файла, который будет загружаться shell-приложением
      exposes: {
        './App': './src/App',  // Какие компоненты мы экспортируем
        './Login': './src/components/Login',
        './Register': './src/components/Register',
        './InfoTooltip': './src/components/InfoTooltip',
        './ProtectedRoute': './src/components/ProtectedRoute'
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
```

**Конфигурация Webpack для shell-приложения (`shell/webpack.config.js`):**

```javascript
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
    port: 3000, // Shell-приложение на своем порту
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
      name: 'shell', // Уникальное имя shell-приложения
      remotes: {
        auth: 'auth@http://localhost:3001/remoteEntry.js',  // Где искать микрофронтенд auth
        profile: 'profile@http://localhost:3002/remoteEntry.js',  // Где искать микрофронтенд profile
        card: 'card@http://localhost:3003/remoteEntry.js'  // Где искать микрофронтенд card
      },
      shared: {
        ...require('./package.json').dependencies, // Общие зависимости
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
```

**Важные моменты:**

*   **Уникальные имена:** Каждый микрофронтенд и shell должны иметь уникальное имя в `ModuleFederationPlugin`.
*   **Порты:**  Каждый микрофронтенд должен работать на своем порту (например, 3001, 3002, 3003).
*   **`publicPath: 'auto'`:**  Позволяет Webpack автоматически определять базовый URL для загрузки чанков.
*   **`exposes`:**  В микрофронтендах указываем, какие модули мы хотим сделать доступными для других приложений.
*   **`remotes`:**  В shell-приложении указываем, где искать удаленные модули (микрофронтенды).
*   **`shared`:** Важно правильно настроить `shared`, чтобы не дублировать зависимости (React, React DOM и т.д.).  Используем `eager: true` для критически важных общих зависимостей в shell-приложении.
*   **Динамический импорт:** Используем `React.lazy` и `Suspense` для динамической загрузки микрофронтендов.  Это улучшит производительность.
*   **CORS:** Проверяем, что CORS настроен правильно, чтобы микрофронтенды могли загружаться из shell-приложения.

**API (backend):**

Также требуется настроить backend так, чтобы он мог обрабатывать запросы от разных микрофронтендов.  Проверяем, что CORS настроен правильно, и что API ключи и токены передаются безопасно.  Backend не должен знать, что его используют микрофронтенды – он должен просто предоставлять API.

**Обновление `package.json`:**

1.  **Добавляем `@babel/plugin-transform-runtime` и `@babel/runtime` в `devDependencies` каждого микрофронтенда и shell-приложения:**

   ```bash
   npm install --save-dev @babel/plugin-transform-runtime
   npm install --save @babel/runtime
   ```

2.  **Обновляем `.babelrc` или `babel.config.js` (если есть), чтобы добавить плагин:**

   ```json
   {
     "presets": ["@babel/preset-env", "@babel/preset-react"],
     "plugins": ["@babel/plugin-transform-runtime"]
   }
   ```

3.  **Установливаем webpack и webpack-cli как dev-зависимости в каждом микрофронтенде и shell:**

   ```bash
   npm install webpack webpack-cli --save-dev
   ```

**Пример `package.json` для микрофронтенда `auth`:**

```json
{
  "name": "auth",
  "version": "1.0.0",
  "description": "Authentication microfrontend",
  "main": "src/index.js",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.15.0",
    "@babel/preset-env": "^7.15.0",
    "@babel/preset-react": "^7.14.5",
    "@babel/plugin-transform-runtime": "^7.15.0",
    "@babel/runtime": "^7.15.0",
    "babel-loader": "^8.2.2",
    "webpack": "^5.52.0",
    "webpack-cli": "^4.8.0",
    "webpack-dev-server": "^4.0.0"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

**Последовательность действий:**

1.  Создаём структуру каталогов, как описано выше.
2.  Перемещаем файлы в соответствующие директории.
3.  Настраиваем Webpack для каждого микрофронтенда и shell-приложения.
4.  Обновляем `package.json` и установливаем необходимые зависимости.

5.  Запускаем все микрофронтенды и shell-приложение.
6.  Проверяем, что все работает правильно.
7.  Далее настраиваем CI/CD для независимого деплоя микрофронтендов (за рамками проектного задания).

* Уровень 3

    В процессе...

***Задание 2***

**Условие:**

В этом задании вам нужно декомпозировать веб-приложения на Django на микросервисы. Кодить не придётся: в этот раз вы будете работать в онлайн-редакторе draw.io.

🔹 Мы подготовили схему архитектуры монолитного решения

Вам нужно разбить эту систему на сервисы, используя подход Domain-Driven Design.

**Решение:**

Разобьем монолит на микросервисы, используя Domain-Driven Design (DDD).

Шаг 1: Понимание бизнес-процессов (высокоуровнево)

Какие бизнес-процессы присутствуют? 

В первую очередь это торговая площадка с рядом ключевых процессов, таких как:

•  Управление пользователями: Регистрация, аутентификация, профили.  
•  Управление торговой площадкой: (предполагаю) Создание/управление площадками (возможно, для разных клиентов).  
•  Управление товарами и услугами: Размещение, редактирование, удаление.  
•  Аукционы: Создание, участие, обновление ставок, обработка заявок.  
•  Заказы: Создание, подтверждение, изменение статуса.  
•  Платежи: Инициация, подтверждение, отмена, запрос статуса.  
•  Отчетность и статистика: Генерация отчетов, отображение статистики.  
•  Поддержка: Заявки, изменение статуса.  

Шаг 2: Определение предметных областей (Bounded Contexts) и сервисов.

Применим DDD, чтобы определить предметные области и соответствующие им микросервисы. Ключевой принцип: каждый сервис должен отвечать за одну хорошо определенную бизнес-область.

Исходя из вышеперечисленных процессов, можно выделить следующие предметные области:

•  Identity & Access Management (IAM): Управление пользователями, ролями, аутентификацией, авторизацией (JWT).  
•  Marketplace Management: Управление торговыми площадками.  
•  Catalog: Управление товарами и услугами (создание, редактирование, удаление, поиск, фильтрация).  
•  Auction: Управление аукционами (создание, участие, обработка заявок, обновление ставок).  
•  Order Management: Управление заказами (создание, подтверждение, изменение статуса, отображение).  
•  Payment: Управление платежами (инициация, подтверждение, отмена, запрос статуса). Интеграция с платежными системами (TurboPay, FastMoney, Яндекс.Pay).  
•  Reporting: Генерация отчетов, отображение статистики.  
•  Support: Обработка заявок в службу поддержки и управление ими.

Шаг 3: Схема Декомпозиции (Draw.io)

Схему Draw.io декомпозиции см. в соответствующем файле в каталоге документации.

[docs/arch_task2.drawio](docs/arch_task2.drawio)

Схема выше:

•  Client (Portal): Представляет пользовательский интерфейс (UI), через который пользователи взаимодействуют с системой. Может быть веб-приложением, мобильным приложением или другим типом интерфейса.  
•  Microservices: Прямоугольники голубого цвета с закругленными углами представляют микросервисы, каждый из которых соответствует предметной области, перечисленной выше. Например, "Identity and Access Management", "Catalog", "Order Management" и т.д.  
•  External Systems: Прямоугольники серого цвета с закругленными углами представляют внешние системы, с которыми взаимодействует система. Например, "TurboPay", "FastMoney", "Яндекс.Pay" (платежные шлюзы).  
•  Связи: Стрелки показывают, какие сервисы с какими взаимодействуют.  
•  СУБД: Все сервисы взаимодействуют с базой данных. В реальности, возможно, нужно будет разбить БД на несколько, принадлежащих каждому микросервису.  

Шаг 4: Описание Компонентов (Сервисов):

1. Identity & Access Management (IAM):  
  •  Функции: Управление пользователями, ролями, аутентификация (логин, JWT generation/validation), авторизация (определение прав доступа).  
  •  Данные: Пользователь.ID, Пользователь.Имя, Пользователь.Фамилия, Пользователь.Адрес, Пользователь.Дата регистрации, Пользователь.Статус, Пользователь.Электронная почта, Пользователь.Номер телефона, Пользователь.Активен, Пользователь.Роль, JWT.  
2. Marketplace Management:  
  •  Функции: Управление торговыми площадками (создание, редактирование, удаление).  
  •  Данные: Торговая площадка.ID, Торговая площадка.Наименование.  
3. Catalog:  
  •  Функции: Управление товарами и услугами (создание, редактирование, удаление), поиск товаров и услуг, фильтрация и сортировка результатов.  
  •  Данные: Товар.ID, Товар.Название, Товар.Описание, Услуга.ID, Услуга.Название, Услуга.Описание.  
4. Auction:  
  •  Функции: Управление аукционами (создание, редактирование, обработка заявок, обновление ставок, уведомления участникам).  
  •  Данные: Заявка на аукцион.ID.  
5. Order Management:  
  •  Функции: Управление заказами (создание, подтверждение, изменение статуса, отображение деталей заказа), уведомления об изменении состояния заказа.  
  •  Данные: Заказ.ID, Заказ.Сумма.  
6. Payment:  
  •  Функции: Инициация платежа, подтверждение платежа, отмена платежа, запрос статуса платежа, взаимодействие с платежными системами (TurboPay, FastMoney, Яндекс.Pay).  
  •  Данные: Транзакция.ID, Транзакция.Статус, [Пользователь.ID], [Заказ.ID], [Заказ.Сумма], [Транзакция.ID].  
7. Reporting:  
  •  Функции: Генерация отчетов по продажам, отображение статистики заказов, обновление статистики.  
  •  Данные: Данные о заказах, товары, пользователи и т.д. (зависит от типа отчетов).  
8. Support:  
  •  Функции: Обработка заявок в службу поддержки, изменение статуса заявки.  
  •  Данные: Заявка на поддержку (ID, описание, статус и т.д.).  

Шаг 5: Межсервисные Взаимодействия:

•  IAM -> Другие сервисы: Другие сервисы (например, Catalog, Order Management) используют IAM для аутентификации и авторизации пользователей. Обычно через JWT.  
•  Order Management -> Payment: Order Management инициирует платеж в Payment.  
•  Payment -> Order Management: Payment уведомляет Order Management об изменении статуса платежа (успех, отмена).  
•  Catalog -> Другие сервисы: Другие сервисы (например, Auction, Order Management) запрашивают информацию о товарах и услугах из Catalog.  
•  Auction -> Catalog: Auction запрашивает информацию о товарах, выставленных на аукцион, из Catalog.  
•  Reporting -> Другие сервисы: Reporting собирает данные из других сервисов (IAM, Catalog, Order Management, Payment) для генерации отчетов.  

Пример потока (Размещение заказа):

1. Client -> Order Management: Клиент размещает заказ через Portal.  
2. Order Management -> IAM: Order Management проверяет авторизацию пользователя через IAM.  
3. Order Management -> Catalog: Order Management запрашивает информацию о товарах из Catalog.  
4. Order Management -> Payment: Order Management инициирует платеж в Payment.  
5. Payment -> (TurboPay/FastMoney/Яндекс.Pay): Payment взаимодействует с платежной системой.  
6. (TurboPay/FastMoney/Яндекс.Pay) -> Payment: Платежная система отправляет подтверждение платежа в Payment.  
7. Payment -> Order Management: Payment обновляет статус заказа в Order Management.  
8. Order Management -> Client: Order Management уведомляет клиента о статусе заказа.  

Технологии:

•  API Gateway: Для маршрутизации запросов от клиента к нужным микросервисам.  
•  Message Queue (RabbitMQ, Kafka): Для асинхронного взаимодействия между сервисами (например, для уведомлений об изменении статуса заказа). (Не отображено на схеме, но важный компонент)  
•  REST API: Для синхронного взаимодействия между сервисами.  
•  gRPC: Альтернатива REST, особенно для высокопроизводительных внутренних сервисов.  
•  Базы данных: Каждый микросервис может иметь свою собственную базу данных (или схему в общей базе данных), чтобы обеспечить независимость и масштабируемость.  

Следующие шаги:

•  Более детальное описание API каждого сервиса.  
•  Определение событий предметной области (Domain Events) и их использование для асинхронного взаимодействия.  
•  Детальнеое проектирование баз данных для каждого сервиса.  
•  Выбор технологий для реализации каждого сервиса.  

Это начальная декомпозиция. 

В реальности потребуется более глубокий анализ и итеративный процесс проектирования.
