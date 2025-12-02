import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://carsbuddy.net/backend/api/checkout" }),
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    addUserPlan: builder.mutation({
      query: ({ userId, planData }) => ({
        url: "/add",
        method: "POST",
        body: { userId, planData },
      }),
      invalidatesTags: ["Checkout"],
    }),
    getUserOrders: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["Checkout"],
    }),
  }),
});

export const { useAddUserPlanMutation, useGetUserOrdersQuery } = checkoutApi;
