import { useState } from 'react';

const dummyMember = {
  name: 'Rahul Sharma',
  email: 'rahul@mail.com',
  plan: 'Yearly',
  status: 'Paid',
  nextPayment: '2026-10-01',
  totalPaid: '₹ 8999',
};

export default function MemberDashboard({ setPage }) {
  return (
    <section className="max-w-xl mx-auto py-16 px-6">
      <button onClick={() => setPage('landing')} className="text-sm mb-6 underline">← Back to Home</button>
      <h2 className="text-3xl font-bold mb-6">Welcome, {dummyMember.name}</h2>
      <div className="bg-gray-800 rounded-xl shadow p-8 mb-6">
        <div className="mb-3">Membership Plan: <span className="font-semibold">{dummyMember.plan}</span></div>
        <div className="mb-3">Payment Status: <span className={`font-semibold ${dummyMember.status === 'Paid' ? 'text-green-400' : 'text-red-400'}`}>{dummyMember.status}</span></div>
        <div className="mb-3">Next Payment Due: <span className="font-semibold">{dummyMember.nextPayment}</span></div>
        <div className="mb-3">Total Amount Paid: <span className="font-semibold">{dummyMember.totalPaid}</span></div>
        <a
          href="/dummy-invoice.pdf"
          className="bg-green-500 text-white px-4 py-2 rounded-full mt-4 inline-block"
          download
        >
          Download Invoice (PDF)
        </a>
      </div>
    </section>
  );
}
