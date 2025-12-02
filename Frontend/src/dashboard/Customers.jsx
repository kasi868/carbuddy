import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from './AdminSidebar';
import {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from '../services/apiService';

const Customers = () => {
  const { data: customers = [], isLoading } = useGetCustomersQuery();
  const [addCustomer] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    carName: '',
    carNumber: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteCustomer(id).unwrap();
      toast.success('User deleted');
    } catch (err) {
      toast.error('Error deleting user');
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer._id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      role: customer.role,
      carName: customer.carDetails?.carName || '',
      carNumber: customer.carDetails?.carNumber || '',
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      // Find the existing customer from query data
      const existingCustomer = customers.find(c => c._id === editingId);

      // Merge updated fields with existing fields
      const updatedData = {
        ...existingCustomer, // keep everything else
        ...formData, // overwrite top-level fields like name, email, phone, role
        carDetails: {
          ...existingCustomer.carDetails, // keep existing carDetails fields
          carName: formData.carName,
          carNumber: formData.carNumber
        }
      };

      await updateCustomer({ id: editingId, ...updatedData }).unwrap();
      toast.success('User updated');
    } else {
      // Adding a new customer
      await addCustomer({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        carDetails: {
          carName: formData.carName,
          carNumber: formData.carNumber
        }
      }).unwrap();
      toast.success('User added');
    }

    setFormData({ name: '', email: '', phone: '', role: 'user', carName: '', carNumber: '' });
    setEditingId(null);
  } catch (err) {
    toast.error('Error saving user');
  }
};


  return (
    // <div className="flex min-h-screen bg-[#0f0f0f] text-white font-sans">
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white font-sans">

      <AdminSidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customers</h2>
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded"
            onClick={() => {
              setEditingId(null);
              setFormData({ name: '', email: '', phone: '', role: 'user', carName: '', carNumber: '' });
            }}
          >
            + Add New User
          </button>
        </div>

        {/* Add/Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] p-4 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="text"
            placeholder="Car Name"
            value={formData.carName}
            onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="Car Number"
            value={formData.carNumber}
            onChange={(e) => setFormData({ ...formData, carNumber: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
          />
          
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="user">User</option>
            <option value="employee">Employee</option> {/* 👈 Added */}
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">
            {editingId ? 'Update' : 'Add'} User
          </button>
        </form>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center text-gray-400">Loading customers...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#1a1a1a] rounded">
              <thead className="bg-gray-800 text-gray-400">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone Number</th>
                  <th className="px-4 py-2 text-left">Car</th>
                  <th className="px-4 py-2 text-left">Car No.</th>
                   <th className="px-4 py-2 text-left">Address</th>
                  <th className="px-4 py-2 text-left">Parking</th>
                  <th className="px-4 py-2 text-left">Role</th>
                 
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust) => (
                  <tr key={cust._id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{cust.name}</td>
                    <td className="px-4 py-2">{cust.email}</td>
                    <td className="px-4 py-2">{cust.phone}</td>
                    <td className="px-4 py-2">{cust.carDetails?.carName || '-'}</td>
                    <td className="px-4 py-2">{cust.carDetails?.carNumber || '-'}</td>
                    <td className="px-4 py-2">{cust.carDetails?.address || '-'}</td>
                    <td className="px-4 py-2">{cust.carDetails?.parking || '-'}</td>


                    <td className="px-4 py-2">{cust.role}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        className="bg-yellow-500 px-3 py-1 rounded text-black"
                        onClick={() => handleEdit(cust)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 px-3 py-1 rounded text-white"
                        onClick={() => handleDelete(cust._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </main>
    </div>
  );
};

export default Customers;


