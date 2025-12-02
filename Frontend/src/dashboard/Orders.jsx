import AdminSidebar from "./AdminSidebar";
import React from "react";
// import { useGetAllOrdersQuery } from "../services/apiService";
// const Orders = () => {
//   const { data: orders = [], isLoading, isError, error } = useGetAllOrdersQuery();

//   if (isLoading) {
//     return <p className="text-center mt-4">Loading orders...</p>;
//   }

//   if (isError) {
//     return (
//       <p className="text-center mt-4 text-red-500">
//         Error loading orders: {error?.data?.message || error?.error}
//       </p>
//     );
//   }

//   return (
//         // <div className="flex min-h-screen bg-black text-white">
//             <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white font-sans">

//         <AdminSidebar />
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Orders</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-[#1a1a1a] rounded">
//           <thead className="bg-gray-800 text-gray-400">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Phone</th>
//               <th className="px-4 py-2 text-left">Address</th>
//               <th className="px-4 py-2 text-left">Time Slot</th>
//               <th className="px-4 py-2 text-left">Service</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">GST</th>
//               <th className="px-4 py-2 text-left">Total</th>
//               <th className="px-4 py-2 text-left">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order, idx) => (
//                 <tr key={idx} className="border-b border-gray-700">
//                   <td className="px-4 py-2">{order.name}</td>
//                   <td className="px-4 py-2">{order.email}</td>
//                   <td className="px-4 py-2">{order.phone}</td>
//                   <td className="px-4 py-2">{order.address}</td>
//                   <td className="px-4 py-2">{order.timeSlot}</td>
//                   <td className="px-4 py-2">{order.serviceType}</td>
//                   <td className="px-4 py-2">₹{order.price}</td>
//                   <td className="px-4 py-2">₹{order.gst}</td>
//                   <td className="px-4 py-2">₹{order.total}</td>
//                   <td className="px-4 py-2">
//                     {new Date(order.createdAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td className="border px-4 py-2 text-center" colSpan="10">
//                   No orders found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Orders;
import { useGetAllPlansQuery } from "../services/plansApi";

const Orders = () => {
  const { data: orders = [], isLoading, isError, error } = useGetAllPlansQuery();

  if (isLoading) return <p className="text-center mt-4">Loading orders...</p>;
  if (isError) return (
    <p className="text-center mt-4 text-red-500">
      Error loading orders: {error?.data?.message || error?.error}
    </p>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white font-sans">
      <AdminSidebar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1a1a1a] rounded">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Car Name</th>
                <th className="px-4 py-2 text-left">Car Type</th>
                <th className="px-4 py-2 text-left">Plan Duration</th>
                <th className="px-4 py-2 text-left">Time Slot</th>
                <th className="px-4 py-2 text-left">Parking</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">After Discount</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="px-4 py-2">{order.name}</td>
                    <td className="px-4 py-2">{order.email}</td>
                    <td className="px-4 py-2">{order.phone}</td>
                    <td className="px-4 py-2">{order.carName}</td>
                    <td className="px-4 py-2">{order.carType}</td>
                    <td className="px-4 py-2">{order.planDuration} Month(s)</td>
                    <td className="px-4 py-2">{order.timeSlot}</td>
                    <td className="px-4 py-2">{order.parking}</td>
                    <td className="px-4 py-2">₹{order.planAmount}</td>
                    <td className="px-4 py-2">₹{order.discountedAmount}</td>
                    <td className="px-4 py-2">{new Date(order.startDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{new Date(order.endDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="12">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
