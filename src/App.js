import { useState } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MembershipPlans from './components/MembershipPlans';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MemberDashboard from './components/MemberDashboard';
import AdminDashboard from './components/AdminDashboard';
import PaymentPage from './components/PaymentPage';

export default function App() {
  const [page, setPage] = useState('landing');
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-white">
      {page === 'landing' && (
        <>
          <HeroSection onJoin={() => document.getElementById('membership').scrollIntoView({ behavior: 'smooth' })} setPage={setPage} />
          <AboutSection />
          <div id="membership">
            <MembershipPlans setPage={setPage} setSelectedPlan={setSelectedPlan} />
          </div>
          <ContactSection />
          <Footer />
        </>
      )}
      {page === 'member' && <MemberDashboard setPage={setPage} />}
      {page === 'admin' && <AdminDashboard setPage={setPage} />}
      {page === 'payment' && (
        <PaymentPage
          plan={selectedPlan}
          onBack={() => setPage('landing')}
        />
      )}
    </div>
  );
}
