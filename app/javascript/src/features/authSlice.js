import { createSlice } from '@reduxjs/toolkit';
import SessionService from '../services/session.service';

const initialState = {
  user: SessionService.getCachedUser() || {},
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state, _action) => {
      state.user = null;
    },
  },
});

export const { login, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
