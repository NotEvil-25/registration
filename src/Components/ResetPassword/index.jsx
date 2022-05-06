/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkTo } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validatePassword } from '../../helpers/validation';
import {
  resetPassword,
  selectResetPassHelpers,
  resetPassValues,
  selectResetPassVals,
} from '../../store/slices/sessionSlice';

const theme = createTheme();

function ResetPassword() {
  const dispatch = useDispatch();
  const status = useSelector(selectResetPassHelpers);
  const value = useSelector(selectResetPassVals);
  const newPasswordErr = status.typeErr === 'NEW_PASSWORD';
  const oldPasswordErr = status.typeErr === 'OLD_PASSWORD';
  const [isDifferentVal, setDifferentVal] = useState(false);
  const [helperText, setHelperText] = useState(null);
  const [isPasswordErr, setPasswordErr] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = {
      new: data.get('newPassword'),
      repeated: data.get('repeatedPassword'),
    };
    if (password.new !== password.repeated) {
      setDifferentVal(true);
      setHelperText('Passwords are different');
      return;
    }
    setPasswordErr(false);
    const newPassword = data.get('newPassword');
    if (!validatePassword(newPassword)) {
      setPasswordErr(true);
      return;
    }
    setDifferentVal(false);
    setHelperText(null);
    dispatch(resetPassword(newPassword));
  };

  const handleInputs = () => {
    const form = document.forms.resetPass;
    const data = new FormData(form);
    const values = {
      old: data.get('oldPassword'),
      new: data.get('newPassword'),
      repeated: data.get('repeatedPassword'),
    };
    dispatch(resetPassValues(values));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset
          </Typography>
          <Box component="form" name="resetPass" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={value.old}
                  error={oldPasswordErr}
                  required
                  fullWidth
                  name="oldPassword"
                  label="Old password"
                  type="password"
                  id="oldPassword"
                  autoComplete="new-password"
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={value.new}
                  error={isPasswordErr || isDifferentVal || newPasswordErr}
                  helperText={helperText}
                  required
                  fullWidth
                  name="newPassword"
                  label="New password"
                  type="password"
                  id="NewPassword"
                  autoComplete="new-password"
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={value.repeated}
                  error={isPasswordErr || isDifferentVal || newPasswordErr}
                  helperText={helperText}
                  required
                  fullWidth
                  name="repeatedPassword"
                  label="Repeat new password"
                  type="password"
                  id="repeatedPassword"
                  autoComplete="new-password"
                  onChange={handleInputs}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" component={LinkTo} to="/">
                  Go to home
                </Link>
              </Grid>
            </Grid>
            {status.isError
              && <Alert severity="error">{status.message}</Alert>}
            {isPasswordErr
              && <Alert severity="error">Password must have at least capital letter, a number and length from 4 to 10!</Alert>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResetPassword;
