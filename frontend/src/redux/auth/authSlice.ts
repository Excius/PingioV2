import { createSlice } from "@reduxjs/toolkit";

import { checkAuth, login, logout, signup, updateProfile } from "./authThunks";

interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
}
interface InitialState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatigngProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
}

const initialState: InitialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatigngProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // check authentication
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
        state.isLoggingIn = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoggingIn = false;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatigngProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isUpdatigngProfile = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatigngProfile = false;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
