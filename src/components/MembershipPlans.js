const plans = [
    { name: 'Monthly', price: 999, period: '/month', icon: '💪', duration: 'Monthly' },
    { name: 'Quarterly', price: 2499, period: '/3 months', icon: '🏋️‍♂️', duration: 'Quarterly' },
    { name: 'Yearly', price: 8999, period: '/year', icon: '🏆', duration: 'Yearly' },
  ];
  
  export default function MembershipPlans({ setPage, setSelectedPlan }) {
    return (
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Membership Plans</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-gray-800 rounded-xl shadow-xl p-8 w-72 transform hover:scale-105 transition cursor-pointer"
            >
              <div className="text-5xl mb-2">{plan.icon}</div>
              <div className="text-xl font-semibold mb-2">{plan.name}</div>
              <div className="text-2xl font-bold mb-2">₹{plan.price}</div>
              <div className="mb-4 text-sm text-gray-400">{plan.period}</div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition"
                onClick={() => {
                  setSelectedPlan(plan);
                  setPage('payment');
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }
  