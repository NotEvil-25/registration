import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/login';
import Registration from './pages/registration';
import ResetPass from './pages/resetpass';
import Home from './pages/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/resetpass" element={<ResetPass />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
