import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    authCheck: builder.query({
      query: () => "check",
    }),
    signup: builder.mutation({
      query: (signupData) => ({
        url: "signup",
        method: "POST",
        body: signupData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (updateData) => ({
        url: "update-profile",
        method: "PUT",
        body: updateData,
      }),
    }),
  }),
});

export const {
  useAuthCheckQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authApi;
