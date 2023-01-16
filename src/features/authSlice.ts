import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

export interface AuthState {
  email: string | null;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
  role: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; token: string; role: string }>) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: action.payload.email,
          token: action.payload.token,
          role: action.payload.role,
        }),
      );
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      localStorage.clear();
      state.email = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
