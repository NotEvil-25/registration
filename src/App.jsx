import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/login';
import Registration from './pages/registration';
// import ResetPass from './pages/resetpass';
import Home from './pages/home';
import ForGuests from './helpers/Components/ForGuests';

function App() {
  return (
    <div className="page">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/registration"
          element={(
            <ForGuests>
              <Registration />
            </ForGuests>
          )}
        />
        <Route
          path="/login"
          element={(
            <ForGuests>
              <Login />
            </ForGuests>
          )}
        />
        {/* <Route
        path="/resetpass"
        element={(
          <RequireAuth>
            <ResetPass />
          </RequireAuth>
        )}
      /> */}
      </Routes>
    </div>
  );
}

export default App;
