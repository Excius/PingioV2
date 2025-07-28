import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

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
  async (userId, { rejectWithValue }) => {
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
