// src/services/plansApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL (update if needed)
const BASE_URL = 'https://carsbuddy.net/backend/api';

export const plansApi = createApi({
  reducerPath: 'plansApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Plans'],
  endpoints: (builder) => ({
    // Get all plans of a user
    getUserPlans: builder.query({
      query: (userId) => `/plans/${userId}`,
      providesTags: ['Plans'],
    }),
    
    // Fetch all plans (for Orders page)
getAllPlans: builder.query({
  query: () => '/plans',   // hits the new endpoint
  providesTags: ['Plans'],
}),

    // Add a new plan for a user
    addUserPlan: builder.mutation({
      query: ({ userId, planData }) => ({
        url: `/plans/${userId}`,
        method: 'POST',
        body: planData,
      }),
      invalidatesTags: ['Plans'],
    }),

    // Update plan status
    updatePlanStatus: builder.mutation({
      query: ({ userId, planId, status }) => ({
        url: `/plans/${userId}/${planId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Plans'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUserPlansQuery,
  useAddUserPlanMutation,
  useUpdatePlanStatusMutation,
   useGetAllPlansQuery,  
} = plansApi;
