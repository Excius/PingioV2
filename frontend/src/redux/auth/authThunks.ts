import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { connectSocket, disconnectSocket } from "../../lib/socket";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("auth/check");
      await connectSocket(response.data._id);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(
        err.response?.data?.message || "Failed to check authentication"
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to check authentication"
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    data: { email: string; password: string; fullName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("auth/signup", data);
      await connectSocket(response.data._id);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Signup failed");
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", data);
      await connectSocket(response.data._id);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Login failed");
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/logout");
      await disconnectSocket();
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Logout failed");
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updatProfile",
  async (data: { profilePic: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("auth/update-profile", data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Profile update failed");
      return rejectWithValue(
        err.response?.data?.message || "Profile update failed"
      );
    }
  }
);
