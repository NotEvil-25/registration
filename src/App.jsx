import React from 'react';
import Login from './pages/login';
import Registration from './pages/registration';
import ResetPass from './pages/resetpass';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Login />
      <Registration />
      <ResetPass />
      <Home />
    </div>
  );
}

export default App;
