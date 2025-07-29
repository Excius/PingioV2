import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { RootState } from "../store";

export interface SendMessagePayload {
  text: string;
  image: string | null;
}

export const getUsers = createAsyncThunk(
  "chat/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("message/users");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Failed to fetch users");
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`message/${userId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Failed to fetch messages");
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

export const sendMessage = createAsyncThunk<
  SendMessagePayload,
  SendMessagePayload
>("chat/sendMessage", async (message, { rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const selectedUser = state.chat.selectedUser;

  try {
    const response = await axiosInstance.post(
      `message/send/${selectedUser._id}`,
      message
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    toast.error(err.response?.data?.message || "Failed to send message");
    return rejectWithValue(
      err.response?.data?.message || "Failed to send message"
    );
  }
});
