import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import chatReducer from "./chat/chatSlice";
import authReducer from "./auth/authSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
