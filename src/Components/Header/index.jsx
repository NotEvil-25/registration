import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/slices/loginSlice';

function Header() {
  const isAuth = useSelector(selectAuth);

  return (
    <Toolbar disableGutters sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        noWrap
        sx={{ flex: 1 }}
      >
        Blog
      </Typography>
      {!isAuth && (
        <>
          <Button variant="outlined" size="small" component={Link} to="/login">
            Log in
          </Button>
          <Button variant="outlined" size="small" sx={{ marginLeft: 1 }} component={Link} to="/registration">
            Registration
          </Button>
        </>
      )}
      {isAuth && (
        <Button
          variant="outlined"
          size="small"
          sx={{ marginLeft: 1 }}
          component={Link}
          to="/user-settings"
        >
          User settings
        </Button>
      )}
    </Toolbar>
  );
}

export default Header;
