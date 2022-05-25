import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Header from '../Components/Header';
import MainPost from '../Components/MainPost';
import Footer from '../Components/Footer';

const theme = createTheme();

const style = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={style}>
        <Header />
        <main>
          <MainPost />
        </main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default Home;
