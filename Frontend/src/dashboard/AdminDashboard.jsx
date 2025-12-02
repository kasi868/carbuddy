

import { useGetCustomersQuery, useGetLeadsQuery } from "../services/apiService";
import { useGetAllPlansQuery } from "../services/plansApi";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const { data: orders = [], isLoading: ordersLoading, isError: ordersError } = useGetAllPlansQuery();
  const { data: customers = [], isLoading: customersLoading, isError: customersError } = useGetCustomersQuery();
  const { data: leads = [], isLoading: leadsLoading, isError: leadsError } = useGetLeadsQuery();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Admin <span className="text-[#FFD700]">Dashboard</span>
        </h1>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Total Orders</h4>
            <p className="text-xl sm:text-2xl font-bold text-[#FFD700]">
              {ordersLoading ? "Loading..." : ordersError ? "Error" : orders.length}
            </p>
          </div>

          {/* <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Revenue</h4>
            <p className="text-xl sm:text-2xl font-bold text-[#FFD700]">₹ 705</p>
          </div> */}
          <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Revenue</h4>
            <p className="text-xl sm:text-2xl font-bold text-[#FFD700]">
              {ordersLoading
                ? "Loading..."
                : ordersError
                ? "Error"
                : `₹${Math.round(orders.reduce((sum, order) => sum + (order.discountedAmount || 0), 0))}`}

            </p>
          </div>


          <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Customers</h4>
            <p className="text-xl sm:text-2xl font-bold text-[#FFD700]">
              {customersLoading ? "Loading..." : customersError ? "Error" : customers.length}
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Leads</h4>
            <p className="text-xl sm:text-2xl font-bold text-[#FFD700]">
              {leadsLoading ? "Loading..." : leadsError ? "Error" : leads.length}
            </p>
          </div>
        </div>

      
      </main>
    </div>
  );
};

export default AdminDashboard;
