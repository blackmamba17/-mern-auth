import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: false,
  loading: false,
  error: false,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInBefore: (state) => {
      state.loading = false;
      state.error = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.success = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.success = false;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  signInStart,
  signInFailure,
  signInSuccess,
  signInBefore,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
} = userSlice.actions;

export default userSlice.reducer;
