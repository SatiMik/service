import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import type { UserLoginType } from '../../types/userTypes';
import { useAppDispatch } from '../../redux/hooks';
import { loginUserThunk } from '../../redux/thunks/UserThunks';

export default function LoginPage(): JSX.Element {
    const dispatch = useAppDispatch();

    const submitHandler: React.ChangeEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.currentTarget));

        void dispatch(loginUserThunk(formData as UserLoginType));
    };

    return (
        <Grid container direction="row" sx={{ minHeight: '90vh', marginTop: '10vh' }}>
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
                    sx={{
                        borderRadius: '8px',
                        boxShadow: '6px -2px 12px rgba(0.2, 0, 0.2, 0.2 )',
                        padding: '16px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Typography
                        marginBottom={2}
                        variant="h6"
                        sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#2e3b55',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        Введите данные пользователя
                    </Typography>
                    <TextField
                        variant="outlined"
                        name="email"
                        label="Email"
                        type="email"
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        variant="outlined"
                        name="password"
                        label="Password"
                        type="password"
                        sx={{ marginBottom: '16px' }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#2e3b55',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#ffffff',
                                color: '#2e3b55',
                            },
                        }}
                    >
                        Войти
                    </Button>

                </Box>
            </Grid>
        </Grid>
    );
}