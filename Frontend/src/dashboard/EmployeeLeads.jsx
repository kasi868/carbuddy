// import React from "react";
// import { useGetEmployeeLeadsQuery } from "../services/apiService";
// import EmployeeSidebar from "./EmployeeSidebar";

// export default function EmployeeLeads() {
//   // const { data: leads, error, isLoading } = useGetEmployeeLeadsQuery(employeeId, {
//   //   skip: !employeeId, // Skip query if no employee selected
//   // });
//    const employeeId = localStorage.getItem("userId");
//   const { data: leads, error, isLoading } = useGetEmployeeLeadsQuery(employeeId, {
//     skip: !employeeId,
//   });

// //   if (!employeeId) return <p>Please select an employee or wait for user data...</p>;
// //   if (isLoading) return <p>Loading leads...</p>;
// //   if (error) return <p>Error loading leads</p>;
// if (isLoading) return <p>Loading leads...</p>;
// if (error) return <p>Error loading leads</p>;

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       {/* Sidebar */}
//       <EmployeeSidebar />

//       {/* Main content */}
//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-bold mb-4 text-yellow-500">Leads Assigned</h2>

//         <div className="overflow-x-auto bg-gray-800 p-4 rounded-lg">
//           <table className="w-full border-collapse border border-gray-700">
//             <thead className="bg-gray-700 text-gray-300">
//               <tr>
//                 <th className="border px-4 py-2 text-left">Name</th>
//                 <th className="border px-4 py-2 text-left">Email</th>
//                 <th className="border px-4 py-2 text-left">Phone</th>
//                 <th className="border px-4 py-2 text-left">Address</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads?.map((lead) => (
//                 <tr key={lead._id} className="border-b border-gray-700 hover:bg-gray-700">
//                   <td className="border px-4 py-2">{lead.name}</td>
//                   <td className="border px-4 py-2">{lead.email}</td>
//                   <td className="border px-4 py-2">{lead.phone}</td>
//                   <td className="border px-4 py-2">{lead.carDetails?.address}</td>
//                 </tr>
//               ))}
//               {leads?.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center py-4 text-gray-400">
//                     No leads assigned.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

import React from "react";
import { useGetEmployeeLeadsQuery } from "../services/apiService";
import EmployeeSidebar from "./EmployeeSidebar";

export default function EmployeeLeads() {
  const employeeId = localStorage.getItem("userId");
  const { data: leads, error, isLoading } = useGetEmployeeLeadsQuery(employeeId, {
    skip: !employeeId,
  });

  if (isLoading) return <p className="p-4 text-center">Loading leads...</p>;
  if (error) return <p className="p-4 text-center text-red-500">Error loading leads</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <EmployeeSidebar />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-yellow-500">
          Leads Assigned
        </h2>

        {/* Table wrapper */}
        <div className="overflow-x-auto bg-gray-800 rounded-xl shadow">
          <table className="w-full min-w-[600px] border-collapse border border-gray-700 text-sm sm:text-base">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="border px-3 sm:px-4 py-2 text-left">Name</th>
                <th className="border px-3 sm:px-4 py-2 text-left">Email</th>
                <th className="border px-3 sm:px-4 py-2 text-left">Phone</th>
                <th className="border px-3 sm:px-4 py-2 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {leads?.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="border px-3 sm:px-4 py-2">{lead.name}</td>
                  <td className="border px-3 sm:px-4 py-2">{lead.email}</td>
                  <td className="border px-3 sm:px-4 py-2">{lead.phone}</td>
                  <td className="border px-3 sm:px-4 py-2">
                    {lead.carDetails?.address}
                  </td>
                </tr>
              ))}
              {leads?.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
                    No leads assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
