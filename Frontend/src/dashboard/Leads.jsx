
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import {
  useGetLeadsQuery,
  useDeleteLeadMutation,
  useUpdateLeadMutation,
} from "../services/apiService";

const Leads = () => {
  const { data: leads = [], isLoading, isError } = useGetLeadsQuery();
  const [deleteLead] = useDeleteLeadMutation();
  const [updateLead] = useUpdateLeadMutation();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    
    message: "",
  });

  // Delete Lead
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteLead(id).unwrap();
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  // Edit Lead
  const handleEdit = (lead) => {
    setEditingId(lead._id);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
    });
  };

  // Update Lead
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateLead({ id: editingId, ...formData }).unwrap();
      setEditingId(null);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white font-sans">
        <AdminSidebar />
        <main className="flex-1 p-6">Loading leads...</main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white">
        <AdminSidebar />
        <main className="flex-1 p-6">Error loading leads.</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white font-sans">
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          <span className="text-[#FFD700]">Leads</span>
        </h1>

        {/* Edit Form */}
        {editingId && (
          <form
            onSubmit={handleUpdate}
            className="bg-[#1a1a1a] p-4 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
            />
            
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white md:col-span-2"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 rounded text-white md:col-span-2"
            >
              Update Lead
            </button>
          </form>
        )}

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1a1a1a] rounded text-sm md:text-base">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Message</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-gray-700">
                  <td className="px-3 py-2">{lead.name}</td>
                  <td className="px-3 py-2">{lead.email}</td>
                  <td className="px-3 py-2">{lead.phone}</td>
                  <td className="px-3 py-2">{lead.message}</td>
                  <td className="px-3 py-2 space-x-2">
                    <button
                      className="bg-yellow-500 px-3 py-1 rounded text-black"
                      onClick={() => handleEdit(lead)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 px-3 py-1 rounded text-white"
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-4">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Leads;
