import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import type { UserLoginType, UserSignUpType } from '../../types/userTypes';
import { useAppDispatch } from '../../redux/hooks';
import { loginUserThunk, signUpUserThunk } from '../../redux/thunks/UserThunks';
import { authTextFieldStyle, buttonStyle, postFormGridStyles } from '../ui/style';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();

  const submitHandler: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    auth === 'signup'
      ? void dispatch(signUpUserThunk(formData as UserSignUpType))
      : void dispatch(loginUserThunk(formData as UserLoginType));
  };

  return (
    <Grid container direction="row" sx={{ ...postFormGridStyles, minHeight: '80vh' }}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          py={5}
          onSubmit={submitHandler}
        >
          {auth === 'signup' && (
            <TextField
              variant="outlined"
              name="username"
              label="Username"
              sx={authTextFieldStyle}
            />
          )}
          <TextField
            variant="outlined"
            name="email"
            label="Email"
            type="email"
            sx={authTextFieldStyle}
          />
          <TextField
            variant="outlined"
            name="password"
            label="Password"
            type="password"
            sx={authTextFieldStyle}
          />
          <Button variant="outlined" type="submit" sx={buttonStyle}>
            {auth === 'signup' ? 'Sign Up' : 'Login'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
