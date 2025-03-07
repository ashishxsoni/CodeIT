// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  isProfilePanelOpen: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isProfilePanelOpen = false;
    },
    toggleProfilePanel: (state) => {
      state.isProfilePanelOpen = !state.isProfilePanelOpen;
    },
    closeProfilePanel: (state) => {
      state.isProfilePanelOpen = false;
    }
  }
});

export const { login, logout, toggleProfilePanel, closeProfilePanel } = authSlice.actions;
export default authSlice.reducer;