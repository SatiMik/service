import type { UserLoginType, UserSignUpType, UserType } from '../types/userTypes';
import apiService from './config';

export const checkUser = async (): Promise<UserType> => {
  const { data } = await apiService<UserType>('/api/user/check');
  return data;
};

export const userSignUp = async (formData: UserSignUpType): Promise<UserType> => {
  const { data } = await apiService.post<UserType>('/api/user/signup', formData);
  return { ...data };
};

export const userLogin = async (formData: UserLoginType): Promise<UserType> => {
  const { data } = await apiService.post<UserType>('/api/user/login', formData);
  return { ...data };
};

export const userLogout = async (): Promise<UserType> => apiService('/api/user/logout');

