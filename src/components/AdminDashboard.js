import { useState } from 'react';
// You may import chart lib like Recharts
import { Bar } from 'react-chartjs-2';

const dummyMembers = [
  {
    name: 'Rahul Sharma',
    contact: '+91 9812345678',
    plan: 'Yearly',
    status: 'Paid',
    lastPayment: '2025-10-01',
  },
  {
    name: 'Priya Singh',
    contact: '+91 9823456789',
    plan: 'Quarterly',
    status: 'Due',
    lastPayment: '2025-07-01',
  },
  {
    name: 'Amit Jain',
    contact: '+91 9834567890',
    plan: 'Monthly',
    status: 'Paid',
    lastPayment: '2025-09-01',
  },
];

export default function AdminDashboard({ setPage }) {
  const totalMembers = dummyMembers.length;
  const totalPaid = dummyMembers.filter(m => m.status === 'Paid').length;
  const totalDue = dummyMembers.filter(m => m.status === 'Due').length;
  const revenue = dummyMembers.reduce((sum, m) => sum + (m.plan === 'Yearly' ? 8999 : m.plan === 'Quarterly' ? 2499 : 999), 0);

  // Dummy chart example
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [4000, 7000, 8500, 9500, 10000, 12500, 11500, 14500, 15000, 17000],
        backgroundColor: 'rgba(34,197,94,0.8)',
      },
    ],
  };

  return (
    <section className="max-w-5xl mx-auto py-12 px-6">
      <button onClick={() => setPage('landing')} className="text-sm mb-6 underline">← Back to Home</button>
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded shadow text-center p-6">
          <div className="text-2xl font-bold">{totalMembers}</div>
          <div>Total Members</div>
        </div>
        <div className="bg-gray-800 rounded shadow text-center p-6">
          <div className="text-2xl font-bold text-green-400">{totalPaid}</div>
          <div>Paid this month</div>
        </div>
        <div className="bg-gray-800 rounded shadow text-center p-6">
          <div className="text-2xl font-bold text-red-400">{totalDue}</div>
          <div>Due Payments</div>
        </div>
      </div>

      <div className="mb-8">
        <Bar data={data} className="bg-white rounded" />
      </div>

      <div className="mb-6 font-semibold">Member List</div>
      <table className="min-w-full bg-gray-900 rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Plan</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Last Payment</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyMembers.map((m, i) => (
            <tr key={i}>
              <td className="px-4 py-2">{m.name}</td>
              <td className="px-4 py-2">{m.contact}</td>
              <td className="px-4 py-2">{m.plan}</td>
              <td className={`px-4 py-2 font-bold ${m.status === 'Paid' ? 'text-green-400' : 'text-red-400'}`}>{m.status}</td>
              <td className="px-4 py-2">{m.lastPayment}</td>
              <td className="px-4 py-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded text-xs mx-1">Mark Paid</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs mx-1">Mark Due</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
