import React, { Suspense, lazy } from 'react';

const AuthModule = lazy(() => import('auth')); // Импортируем AuthApp
const ProfileModule = lazy(() => import('profile')); // Импортируем ProfileApp
const CardModule = lazy(() => import('card')); // Импортируем CardApp

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
