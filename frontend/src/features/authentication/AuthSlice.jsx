import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jwt: null,
    userId: null, // Store userId here
    firstName: null, // Add firstName
    lastName: null, // Add lastName
    email: null, // Add email
    imageUrl: null, // Add imageUrl
    role: null, // Add role
    isLogin: false,
    error: null,
    loading: false,
    expiresAt: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.jwt = action.payload.token;
      state.userId = action.payload.userId; // Update userId here
      state.firstName = action.payload.firstName; // Store firstName
      state.lastName = action.payload.lastName; // Store lastName
      state.email = action.payload.email; // Store email
      state.imageUrl = action.payload.imageUrl; // Store imageUrl
      state.role = action.payload.role; // Store role
      state.isLogin = true;
      state.loading = false;
      state.expiresAt = null; // You might want to handle expiration
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    logout(state) {
      state.jwt = null;
      state.userId = null; // Clear userId on logout
      state.firstName = null; // Clear firstName
      state.lastName = null; // Clear lastName
      state.email = null; // Clear email
      state.imageUrl = null; // Clear imageUrl
      state.role = null; // Clear role
      state.isLogin = false;
      state.expiresAt = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
