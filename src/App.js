import React, { useState, useEffect } from 'react';

// Mock data for the application
const mockMembers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', plan: 'Monthly', paymentStatus: 'Paid', lastPayment: '2024-01-15', joinDate: '2024-01-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', plan: 'Quarterly', paymentStatus: 'Due', lastPayment: '2023-12-15', joinDate: '2023-10-01' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+91 9876543212', plan: 'Yearly', paymentStatus: 'Paid', lastPayment: '2024-01-01', joinDate: '2024-01-01' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+91 9876543213', plan: 'Monthly', paymentStatus: 'Due', lastPayment: '2023-12-20', joinDate: '2023-11-01' },
];

const membershipPlans = [
  { id: 'monthly', name: 'Monthly', price: 999, duration: '1 month', features: ['Access to all equipment', 'Group classes', 'Locker room'] },
  { id: 'quarterly', name: 'Quarterly', price: 2499, duration: '3 months', features: ['Everything in Monthly', 'Personal trainer consultation', 'Nutrition guide'] },
  { id: 'yearly', name: 'Yearly', price: 8999, duration: '12 months', features: ['Everything in Quarterly', 'Premium locker', 'Complimentary supplements'] },
];

// Main App Component
const GymWebsite = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Mock login function
  const handleLogin = (role) => {
    setUser({ role, name: role === 'admin' ? 'Admin User' : 'John Member' });
    setCurrentView(role === 'admin' ? 'admin' : 'member');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    setSelectedPlan(null);
    setPaymentStatus(null);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCurrentView('payment');
  };

  const handlePayment = (status) => {
    setPaymentStatus(status);
    setTimeout(() => {
      if (status === 'success') {
        setCurrentView('member');
        setUser({ role: 'member', name: 'New Member' });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-500">Muscle Art Fitness</div>
          <div className="flex space-x-4">
            {!user ? (
              <>
                <button 
                  onClick={() => setCurrentView('landing')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-orange-500 transition-colors"
                >
                  Plans
                </button>
                <button 
                  onClick={() => setCurrentView('member-login')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Member Login
                </button>
                <button 
                  onClick={() => setCurrentView('admin-login')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Admin
                </button>
              </>
            ) : (
              <>
                <span>Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen">
        {currentView === 'landing' && <LandingPage onPlanSelect={handlePlanSelect} />}
        {currentView === 'member-login' && <LoginView onLogin={() => handleLogin('member')} type="member" />}
        {currentView === 'admin-login' && <LoginView onLogin={() => handleLogin('admin')} type="admin" />}
        {currentView === 'member' && <MemberDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'payment' && (
          <PaymentPage 
            plan={selectedPlan} 
            onPayment={handlePayment}
            paymentStatus={paymentStatus}
          />
        )}
      </div>
    </div>
  );
};

// Landing Page Component
const LandingPage = ({ onPlanSelect }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Muscle Art Fitness
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Transform your body. Build your strength. Join the fitness community that pushes you to be your best.
          </p>
          <button 
            onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
            className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
          >
            Join Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-white mb-6">Why Choose Us?</h2>
              <p className="text-gray-300 text-lg mb-6">
                At Muscle Art Fitness, we provide professional training, state-of-the-art equipment, 
                and personalized workout plans to help you smash your fitness goals.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Experienced trainers', 'Flexible timings', 'Modern equipment', 'Affordable membership plans'].map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-700 rounded-2xl p-4 shadow-2xl">
                <div className="w-full h-64 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">Modern Gym Facility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Membership Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div 
                key={plan.id}
                className="bg-gray-800 rounded-2xl p-8 text-white hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-gray-700 hover:border-orange-500"
                onClick={() => onPlanSelect(plan)}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="text-3xl font-bold text-orange-500 my-4">₹{plan.price}</div>
                  <p className="text-gray-400">{plan.duration}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-white">
              <div className="text-2xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-300">Muscle Art Fitness</p>
              <p className="text-gray-300">Fitness Street, Gym City</p>
            </div>
            <div className="text-white">
              <div className="text-2xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+91 7305508442</p>
            </div>
            <div className="text-white">
              <div className="text-2xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <button className="text-gray-300 hover:text-white transition-colors">Google Maps</button>
                <button className="text-gray-300 hover:text-white transition-colors">Instagram</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Muscle Art Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Login View Component
const LoginView = ({ onLogin, type }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app, this would validate against backend
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {type === 'admin' ? 'Admin Login' : 'Member Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <p className="text-gray-300 text-sm text-center">
            Demo Login: Use any email and password
          </p>
        </div>
      </div>
    </div>
  );
};

// Member Dashboard Component
const MemberDashboard = () => {
  const memberData = {
    name: 'John Doe',
    plan: 'Monthly',
    paymentStatus: 'Paid',
    nextPayment: '2024-02-15',
    totalPaid: 999,
    joinDate: '2024-01-01'
  };

  const invoices = [
    { id: 1, date: '2024-01-15', amount: 999, status: 'Paid' },
    { id: 2, date: '2023-12-15', amount: 999, status: 'Paid' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Member Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Membership Plan</h3>
            <p className="text-2xl font-bold text-orange-500">{memberData.plan}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Payment Status</h3>
            <p className={`text-2xl font-bold ${memberData.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
              {memberData.paymentStatus}
            </p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Next Payment</h3>
            <p className="text-2xl font-bold text-white">{new Date(memberData.nextPayment).toLocaleDateString()}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Paid</h3>
            <p className="text-2xl font-bold text-green-500">₹{memberData.totalPaid}</p>
          </div>
        </div>

        {/* Invoices Section */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 text-left">Invoice ID</th>
                  <th className="py-3 text-left">Date</th>
                  <th className="py-3 text-left">Amount</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-700">
                    <td className="py-4">INV-{invoice.id.toString().padStart(4, '0')}</td>
                    <td className="py-4">{new Date(invoice.date).toLocaleDateString()}</td>
                    <td className="py-4">₹{invoice.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        invoice.status === 'Paid' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const [members, setMembers] = useState(mockMembers);
  const [filter, setFilter] = useState('all');

  const handlePaymentStatusUpdate = (memberId, status) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, paymentStatus: status } : member
    ));
  };

  const filteredMembers = filter === 'all' 
    ? members 
    : members.filter(member => member.plan === filter);

  const stats = {
    totalMembers: members.length,
    totalPaid: members.filter(m => m.paymentStatus === 'Paid').length,
    totalDue: members.filter(m => m.paymentStatus === 'Due').length,
    totalRevenue: members.filter(m => m.paymentStatus === 'Paid')
      .reduce((sum, member) => sum + (member.plan === 'Monthly' ? 999 : member.plan === 'Quarterly' ? 2499 : 8999), 0)
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Members</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.totalMembers}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Paid Members</h3>
            <p className="text-3xl font-bold text-green-500">{stats.totalPaid}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Due Payments</h3>
            <p className="text-3xl font-bold text-red-500">{stats.totalDue}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-500">₹{stats.totalRevenue}</p>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Monthly Revenue</h2>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Revenue Chart Visualization</p>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Member Management</h2>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            >
              <option value="all">All Plans</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 text-left">Name</th>
                  <th className="py-3 text-left">Contact</th>
                  <th className="py-3 text-left">Plan</th>
                  <th className="py-3 text-left">Payment Status</th>
                  <th className="py-3 text-left">Last Payment</th>
                  <th className="py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-700">
                    <td className="py-4">{member.name}</td>
                    <td className="py-4">
                      <div>{member.email}</div>
                      <div className="text-sm text-gray-400">{member.phone}</div>
                    </td>
                    <td className="py-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                        {member.plan}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        member.paymentStatus === 'Paid' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {member.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4">{new Date(member.lastPayment).toLocaleDateString()}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handlePaymentStatusUpdate(member.id, 'Paid')}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          Mark Paid
                        </button>
                        <button 
                          onClick={() => handlePaymentStatusUpdate(member.id, 'Due')}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          Mark Due
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Page Component
const PaymentPage = ({ plan, onPayment, paymentStatus }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: plan?.name || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock payment processing
    onPayment('success');
  };

  if (paymentStatus) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12">
        <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md text-center">
          {paymentStatus === 'success' ? (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
              <p className="text-gray-300 mb-6">Welcome to Muscle Art Fitness!</p>
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-2">Transaction Summary</h3>
                <p className="text-gray-300">Amount: ₹{plan?.price}</p>
                <p className="text-gray-300">Status: Completed</p>
                <p className="text-gray-300">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-3xl font-bold text-white mb-4">Payment Failed</h2>
              <p className="text-gray-300 mb-6">Please try again or contact support.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Complete Your Membership</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input 
                    type="tel"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Membership Plan</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    required
                  >
                    <option value="">Select a plan</option>
                    {membershipPlans.map(plan => (
                      <option key={plan.id} value={plan.name}>{plan.name} - ₹{plan.price}</option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
                >
                  Pay Now - ₹{plan?.price || ''}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              {plan && (
                <div className="bg-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{plan.name} Plan</h3>
                  <div className="text-3xl font-bold text-orange-500 mb-4">₹{plan.price}</div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">What's Next?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Complete your profile after payment</li>
                  <li>• Schedule your first training session</li>
                  <li>• Get your membership card at the front desk</li>
                  <li>• 24/7 gym access starts immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymWebsite;