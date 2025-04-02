import React from 'react';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import PopupWithForm from './components/PopupWithForm';

function ProfileApp() {
  return (
    <div>
      {/* Здесь можно настроить маршрутизацию, если это необходимо */}
      <EditProfilePopup />
      <EditAvatarPopup />
      <PopupWithForm />
    </div>
  );
}

export default ProfileApp;
