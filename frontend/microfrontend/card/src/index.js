import React from 'react';
import Card from './components/Card';
import Main from './components/Main';
import AddPlacePopup from './components/AddPlacePopup';
import ImagePopup from './components/ImagePopup';
import PopupWithForm from './components/PopupWithForm';

function CardApp() {
  return (
    <div>
      {/* Здесь можно настроить маршрутизацию, если это необходимо */}
      <Card />
      <Main />
      <AddPlacePopup />
      <PopupWithForm />
      <ImagePopup />
    </div>
  );
}

export default CardApp;
