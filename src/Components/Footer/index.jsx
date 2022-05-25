import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Footer title
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Footer block
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          {' '}
          {new Date().getFullYear()}
          .
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
