import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import themeReducer from "./theme/themeSlice";
import chatReducer from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
