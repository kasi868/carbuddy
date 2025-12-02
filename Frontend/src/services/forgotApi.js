// src/services/forgotApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forgotApi = createApi({
  reducerPath: "forgotApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://carsbuddy.net/backend/api/auth", // adjust if needed
  }),
  endpoints: (builder) => ({
    // Step 1: Request password reset (user enters email)
     requestPasswordReset: builder.mutation({
      query: ({ email, password }) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Step 2: Reset password (user clicks link with token)
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: { password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} = forgotApi;
