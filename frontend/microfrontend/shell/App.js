import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth.js'; // Убедитесь, что путь правильный

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [tooltipStatus, setTooltipStatus] = useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({}); // Добавляем состояние для данных пользователя

  const history = useHistory();

  // useEffect для проверки токена при загрузке
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => {
          localStorage.removeItem('jwt');
          console.error('Ошибка при проверке токена:', err); // Более информативный вывод ошибки
        });
    }
  }, [history]);

  function onLogin({ email, password }) {
    auth.login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch((err) => {
        console.error('Ошибка при входе:', err); // Логируем ошибку
        setTooltipStatus('fail');
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail(''); // Сбрасываем email при выходе
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={isLoggedIn}
            component={() => {
              const Main = React.lazy(() => import('card/Main'));
              return (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Main
                    onEditProfile={/* ... */}
                    onAddPlace={/* ... */}
                    onEditAvatar={/* ... */}
                  />
                </React.Suspense>
              );
            }}
          />
          <Route path="/signup">
            <Register onRegister={/* ... */} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} /> {/* Передаем onLogin через props */}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={/* ... */}
          onUpdateUser={/* ... */}
          onClose={/* ... */}
        />
        {/* ... другие попапы ... */}
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;