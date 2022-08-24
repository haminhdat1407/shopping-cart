import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StorageKeys from 'constants/storage-keys';
import userApi from '../../api/userApi';

export const register = createAsyncThunk('users/register', async (payload) => {
  const data = await userApi.register(payload);

  //call API to register
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return use data
  return data.user;
});

export const login = createAsyncThunk('users/login', async (payload) => {
  const data = await userApi.login(payload);

  //call API to register
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return use data
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  },
  //use async action to call api
  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.USER);

      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
