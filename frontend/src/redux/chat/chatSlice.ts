import { createSlice } from "@reduxjs/toolkit";
import { getMessages, getUsers, sendMessage } from "./chatThunks";

export type Message = {
  _id: string;
  senderId: string;
  recieverId: string;
  text: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  fullName: string;
  profilePic: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export interface ChatState {
  messages: Message[];
  users: User[];
  onlineUsers: User[];
  selectedUser: User;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
}

const initialState: ChatState = {
  messages: [],
  users: [
    {
      _id: "",
      fullName: "",
      profilePic: "",
      email: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
  onlineUsers: [
    {
      _id: "",
      fullName: "",
      profilePic: "",
      email: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
  selectedUser: {
    _id: "",
    fullName: "",
    profilePic: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  },
  isUsersLoading: false,
  isMessagesLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setNewMessage: (state, action) => {
      state.messages.push(action.payload as Message);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // get Users
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })

      // get Messages
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isMessagesLoading = false;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })

      // send Message
      .addCase(sendMessage.pending, () => {})
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload as Message);
      })
      .addCase(sendMessage.rejected, () => {});
  },
});

export const { setSelectedUser, setNewMessage, clearMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
