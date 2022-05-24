import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
// import Login from './pages/login';
import Registration from './pages/registration';
// import ResetPass from './pages/resetpass';
import Home from './pages/home';
// import ForGuests from './helpers/Components/ForGuests';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/registration"
        element={(<Registration />)}
      />
      {/* <Route
        path="/login"
        element={(
          <ForGuests>
            <Login />
          </ForGuests>
        )}
      />
      <Route
        path="/resetpass"
        element={(
          <RequireAuth>
            <ResetPass />
          </RequireAuth>
        )}
      /> */}
    </Routes>
  );
}

export default App;
