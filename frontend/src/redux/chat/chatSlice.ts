import { createSlice } from "@reduxjs/toolkit";
import { getMessages, getUsers } from "./authThunks";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
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
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
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
      });
  },
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
