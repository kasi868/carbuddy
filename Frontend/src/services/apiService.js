import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({
	    baseUrl: 'https://carsbuddy.net/backend/api/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: 'register',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
        }),


   
    getCustomers: builder.query({
      query: () => 'customers',
      providesTags: ['Customers'],
    }),
    addCustomer: builder.mutation({
      query: (customer) => ({
        url: 'customers',
        method: 'POST',
        body: customer,
      }),
      invalidatesTags: ['Customers'],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...customer }) => ({
        url: `customers/${id}`,
        method: 'PUT',
        body: customer,
      }),
      invalidatesTags: ['Customers'],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customers'],
    }),
addLead: builder.mutation({
  query: (lead) => ({
    url: 'contact',
    method: 'POST',
    body: lead,
  }),
  invalidatesTags: ['Leads'],
}),

    getLeads: builder.query({
  query: () => 'leads',
  providesTags: ['Leads'],
}),

deleteLead: builder.mutation({
  query: (id) => ({
    url: `leads/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Leads'],
}),

updateLead: builder.mutation({
  query: ({ id, ...lead }) => ({
    url: `leads/${id}`,
    method: 'PUT',
    body: lead,
  }),
  invalidatesTags: ['Leads'],
}),

getLoggedInUser: builder.query({
  query: () => '/profile',
  providesTags: ['User'],
}),
updateProfile: builder.mutation({
  query: (data) => ({
    url: '/profile',
    method: 'PUT',
    body: data,
  }),
}),

checkoutBasic: builder.mutation({
  query: (orderData) => ({
    url: 'checkoutBasic', 
    method: 'POST',
    body: orderData,
  }),
}),

checkoutPremium: builder.mutation({
  query: (orderData) => ({
    url: 'checkoutPremium', 
    method: 'POST',
    body: orderData,
  }),
}),

checkoutUltimate: builder.mutation({
  query: (orderData) => ({
    url: 'checkoutUltimate', 
    method: 'POST',
    body: orderData,
  }),
}),

getAllOrders: builder.query({
  query: () => "/allOrders"
}),
// 🔹 Fetch leads assigned to a specific employee
getEmployeeLeads: builder.query({
  query: (employeeId) => `register/employee/${employeeId}/leads`,
  providesTags: ['Leads'],
}),



  }),
});





export const {
  useRegisterMutation,
  useLoginMutation,
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetLeadsQuery,
  useDeleteLeadMutation,
  useUpdateLeadMutation,
  useAddLeadMutation,
useGetLoggedInUserQuery,
useUpdateProfileMutation,
useCheckoutBasicMutation,
useCheckoutPremiumMutation,
useCheckoutUltimateMutation,
useGetAllOrdersQuery,
// useForgotPasswordMutation,
useGetEmployeeLeadsQuery

} = apiService;
