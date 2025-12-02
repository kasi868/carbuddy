
// import { configureStore } from "@reduxjs/toolkit";
// import { apiService } from "../services/apiService";
// import { forgotApi } from "../services/forgotApi";
// import { plansApi } from "../services/plansApi"; // <-- import plansApi
// import { setupListeners } from "@reduxjs/toolkit/query";

// export const store = configureStore({
//   reducer: {
//     [apiService.reducerPath]: apiService.reducer,
//     [forgotApi.reducerPath]: forgotApi.reducer,
//     [plansApi.reducerPath]: plansApi.reducer, // <-- add plansApi reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(apiService.middleware)
//       .concat(forgotApi.middleware)
//       .concat(plansApi.middleware), // <-- add plansApi middleware
// });

// // Enable refetchOnFocus/refetchOnReconnect
// setupListeners(store.dispatch);



import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";
import { forgotApi } from "../services/forgotApi";
import { plansApi } from "../services/plansApi";
import { checkoutApi } from "../services/checkoutApi"; // <-- import checkoutApi
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    [forgotApi.reducerPath]: forgotApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer, // <-- add checkoutApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiService.middleware)
      .concat(forgotApi.middleware)
      .concat(plansApi.middleware)
      .concat(checkoutApi.middleware), // <-- add checkoutApi middleware
});

// Enable refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);
