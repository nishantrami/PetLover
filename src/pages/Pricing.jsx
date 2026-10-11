import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SectionHeader from '../components/common/SectionHeader';
import PackageCard from '../components/common/PackageCard';
import {
  Check,
  HelpCircle,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Pricing = () => {
  const { packages } = useData();
  const navigate = useNavigate();

  // Interactive Add-On Calculator state
  const [selectedBasePkg, setSelectedBasePkg] = useState(packages[1]?.id || 'pkg_standard');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  const addonsList = [
    { id: 'add_face', name: 'Blueberry Tear-Stain Facial Scrub', price: 299 },
    { id: 'add_paw', name: 'Organic Paw Pad Herbal Butter Balm', price: 249 },
    { id: 'add_teeth', name: 'Ultrasonic Plaque Scaling & Breath Gel', price: 599 },
    { id: 'add_shed', name: 'Extra 30-min Undercoat FURminator De-Shed', price: 499 },
    { id: 'add_mud', name: 'Dead Sea Mineral Itch-Relief Mud Mask', price: 449 }
  ];

  const currentPkg = packages.find((p) => p.id === selectedBasePkg) || packages[0];
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const item = addonsList.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const grandTotal = (currentPkg?.price || 0) + addonsTotal;

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookWithCustomConfig = () => {
    navigate('/booking', {
      state: {
        selectedPackageId: currentPkg?.id,
        packageName: currentPkg?.name,
        estimatedPrice: grandTotal
      }
    });
  };

  const faqs = [
    {
      q: 'How are prices calculated for different pet sizes and coat conditions?',
      a: 'Our standard package prices cover small to medium breeds with normal coat conditions. Extra large breeds (over 30kg) or heavily matted coats that require gentle de-tangling may have a modest ₹300–₹500 sizing adjustment discussed at check-in.'
    },
    {
      q: 'Do I need to show proof of vaccinations before my appointment?',
      a: 'Yes, for the health and safety of all furry guests, we require up-to-date Rabies and DHPP (for dogs) or FVRCP (for cats) vaccinations. You can bring the certificate or upload it in your customer profile.'
    },
    {
      q: 'Can I stay with my pet during their grooming or spa session?',
      a: 'You are welcome to relax in our lobby viewing area with glass windows! Often, pets stay calmer when they cannot see their owners in the room, but we always accommodate special nervous pet accommodations.'
    },
    {
      q: 'What is your cancellation or rescheduling policy?',
      a: 'You can reschedule or cancel any appointment directly from your "My Bookings" page up to 2 hours before the scheduled time with zero cancellation penalty fees.'
    }
  ];

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '70px 0',
          background: 'linear-gradient(135deg, #FFF5F5 0%, #FAF5FF 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Clear & Honest Pricing"
            title="Simple, Transparent Packages with"
            highlight="Zero Hidden Fees"
            subtitle="Choose a curated full-care package or customize your pet’s exact pampering session with our live price calculator below."
          />
        </div>
      </section>

      {/* Package Cards */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid grid-cols-3" style={{ alignItems: 'stretch' }}>
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Spa Estimator */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <SectionHeader
            badge="Custom Estimator"
            title="Interactive Spa Treatment"
            highlight="Calculator"
            subtitle="Select a base package and check desired wellness add-ons to calculate your instant price."
          />

          <div
            className="card-solid"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {/* Step 1: Base Tier */}
            <div style={{ marginBottom: '28px' }}>
              <label className="form-label" style={{ fontSize: '1rem', fontWeight: 700 }}>
                1. Select Base Spa Package:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedBasePkg(pkg.id)}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      border: selectedBasePkg === pkg.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: selectedBasePkg === pkg.id ? 'var(--primary-light)' : 'white',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{pkg.name}</div>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', marginTop: '4px' }}>
                      ₹{Number(pkg.price).toLocaleString('en-IN')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Add-Ons */}
            <div style={{ marginBottom: '32px' }}>
              <label className="form-label" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px' }}>
                2. Select Add-On Treatments (Optional):
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 18px',
                        borderRadius: 'var(--radius-md)',
                        border: isChecked ? '1.5px solid var(--secondary)' : '1px solid var(--border-color)',
                        backgroundColor: isChecked ? 'var(--secondary-light)' : 'white',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          style={{ width: '18px', height: '18px', accentColor: 'var(--secondary)' }}
                        />
                        <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {addon.name}
                        </span>
                      </div>
                      <span style={{ fontWeight: 800, color: 'var(--secondary)', fontSize: '0.95rem' }}>
                        +₹{Number(addon.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Summary Bar */}
            <div
              style={{
                backgroundColor: 'var(--bg-alt)',
                padding: '20px 24px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Estimated Package Total ({selectedAddons.length} add-ons):
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.2 }}>
                  ₹{Number(grandTotal).toLocaleString('en-IN')}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleBookWithCustomConfig}
                style={{ gap: '8px' }}
              >
                Book This Combination <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Accordion */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <SectionHeader
            badge="Got Questions?"
            title="Frequently Asked"
            highlight="Questions"
            subtitle="Everything you need to know about our services, safety protocols, and appointments."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="card-solid"
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 22px 20px', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
