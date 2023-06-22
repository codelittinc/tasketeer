import { createSlice } from '@reduxjs/toolkit';
import Alerts from '../constants/alerts';

const initialState = {
  message: '',
  type: '',
};

const authSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || Alerts.info;
    },
    closeSnackbar: (state, _action) => {
      state.message = initialState.message;
      state.type = initialState.type;
    },
  },
});

export const {
  showSnackbar,
  closeSnackbar,
} = authSlice.actions;
export default authSlice.reducer;
