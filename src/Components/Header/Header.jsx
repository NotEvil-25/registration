import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Header() {
  return (
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
      <Button variant="outlined" size="small">
        Log in
      </Button>
      <Button variant="outlined" size="small" sx={{ marginLeft: 1 }}>
        Registration
      </Button>
    </Toolbar>
  );
}

export default Header;
