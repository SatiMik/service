import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkUser, userLogin, userLogout, userSignUp } from '../../services/userServices';
import type { UserLoginType, UserSignUpType, UserType } from '../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserType>('user/checkUserThunk', () => checkUser());

export const loginUserThunk = createAsyncThunk<UserType, UserLoginType>(
    'user/loginUserThunk',
    (formData) => userLogin(formData),
);

export const signUpUserThunk = createAsyncThunk<UserType, UserSignUpType>(
    'user/signUpUserThunk',
    (formData) => userSignUp(formData),
);

export const logoutUserThunk = createAsyncThunk('user/logoutUserThunk', () =>
    userLogout().then(() => undefined),
);

