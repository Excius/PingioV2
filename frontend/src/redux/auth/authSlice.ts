import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
