import { useState } from 'react';

export default function PaymentPage({ plan, onBack }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', plan: plan?.name || '', status: '' });
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setSuccess(Math.random() > 0.2); // random mock success/fail
    setForm({ ...form, status: Math.random() > 0.2 ? 'Paid' : 'Failed' });
  }

  return (
    <section className="max-w-md mx-auto py-16 px-6">
      <button onClick={onBack} className="text-sm mb-6 underline">← Back</button>
      <h2 className="text-2xl font-bold mb-6">Payment</h2>
      {!submitted ? (
        <form className="bg-gray-800 p-8 rounded-xl shadow flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" required className="py-2 px-4 rounded bg-gray-700" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" required className="py-2 px-4 rounded bg-gray-700" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="tel" placeholder="Phone" required className="py-2 px-4 rounded bg-gray-700" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <select className="py-2 px-4 rounded bg-gray-700" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition">Pay Now</button>
        </form>
      ) : (
        <div className={`p-8 rounded-xl shadow text-center ${success ? 'bg-green-800' : 'bg-red-800'}`}>
          <h3 className="text-xl font-bold mb-4">{success ? 'Payment Successful' : 'Payment Failed'}</h3>
          <div className="mb-2">Name: <span className="font-semibold">{form.name}</span></div>
          <div className="mb-2">Email: <span className="font-semibold">{form.email}</span></div>
          <div className="mb-2">Phone: <span className="font-semibold">{form.phone}</span></div>
          <div className="mb-2">Plan: <span className="font-semibold">{form.plan}</span></div>
          <div className="mb-2">Status: <span className="font-semibold">{form.status}</span></div>
          <div className="mb-2">Amount: <span className="font-semibold">
            {form.plan === 'Monthly' && '₹999'}
            {form.plan === 'Quarterly' && '₹2499'}
            {form.plan === 'Yearly' && '₹8999'}
          </span></div>
          <div>Date: {new Date().toLocaleDateString()}</div>
        </div>
      )}
    </section>
  );
}
