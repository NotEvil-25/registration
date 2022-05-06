import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logOut } from '../../store/slices/sessionSlice';

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const buttons = () => {
    if (auth.isAuth) {
      return (
        <>
          <Typography
            variant="h5"
            color="inherit"
            noWrap
            sx={{ flex: 1 }}
          >
            Your email:
            {' '}
            {auth.yourEmail}
          </Typography>
          <Button variant="outlined" size="small" sx={{ marginLeft: 1 }} component={Link} to="/resetpass">
            Change password
          </Button>
          <Button variant="outlined" size="small" sx={{ marginLeft: 1 }} onClick={handleLogOut}>
            Log out
          </Button>
        </>
      );
    }

    return (
      <>
        <Button variant="outlined" size="small" component={Link} to="/login">
          Log in
        </Button>
        <Button variant="outlined" size="small" sx={{ marginLeft: 1 }} component={Link} to="/registration">
          Registration
        </Button>
      </>
    );
  };

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flex: 1 }}
        >
          Blog
        </Typography>
        { buttons() }
      </Toolbar>
      <div>
        <p>
          email:
          {' '}
          <strong>email@test.com</strong>
        </p>
        <p>
          password:
          {' '}
          <strong>Password1</strong>
        </p>
      </div>
    </>
  );
}

export default Header;
