import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: localStorage.getItem("chat-theme") || "dracula",
  },
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("chat-theme", action.payload);
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
