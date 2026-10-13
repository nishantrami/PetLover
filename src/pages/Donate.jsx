import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import SectionHeader from '../components/common/SectionHeader';
import RescueImpactSection from '../components/common/RescueImpactSection';
import confetti from 'canvas-confetti';
import {
  Heart,
  AlertCircle,
  Users,
  IndianRupee
} from 'lucide-react';

export const Donate = () => {
  const { donations, addDonation } = useData();
  const { currentUser } = useAuth();
  const { notifyError } = useNotification();

  const [selectedPreset, setSelectedPreset] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('Emergency Medical & Surgery Fund');
  const [donorName, setDonorName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const presetAmounts = [250, 500, 1000, 2500, 5000];

  const effectiveAmount = customAmount ? Number(customAmount) : selectedPreset;
  const totalDonated = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  const handlePresetClick = (amount) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!effectiveAmount || effectiveAmount <= 0) {
      notifyError('Please specify a valid donation amount.');
      return;
    }

    if (!isAnonymous && !donorName.trim()) {
      notifyError('Please enter your name or check "Donate Anonymously".');
      return;
    }

    const donationData = {
      donorName: isAnonymous ? 'Anonymous Angel' : donorName.trim(),
      email: email.trim() || 'supporter@rescue.org',
      phone: phone.trim(),
      amount: effectiveAmount,
      cause: selectedCause,
      message: message.trim() || 'Wishing all rescue animals safety and love!',
      isAnonymous
    };

    addDonation(donationData);

    // Reset fields
    setMessage('');
    setCustomAmount('');
    setSelectedPreset(1000);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '70px 0',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFFDF9 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="PetLover Rescue Mission"
            title="Make a Loving Difference for"
            highlight="Rescue & Stray Animals"
            subtitle="Every contribution provides critical veterinary emergency surgery, nutritious food, and warm shelter for homeless pets."
          />

          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 20px',
              maxWidth: '750px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#B91C1C',
              fontSize: '0.88rem'
            }}
          >
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>
              <strong>Demonstration Notice:</strong> This is a simulation environment. No real money or credit card transactions are processed. Records are securely stored in your browser’s localStorage.
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px'
            }}
          >
            {/* Left: Donation Form */}
            <div
              className="card-solid"
              style={{
                padding: '36px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'white',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={22} color="var(--primary)" fill="var(--primary)" /> Choose Your Donation Amount
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Amount presets */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Select Demonstration Amount (₹ INR):</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '12px' }}>
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handlePresetClick(amt)}
                        style={{
                          padding: '12px 4px',
                          borderRadius: 'var(--radius-md)',
                          border: selectedPreset === amt ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                          backgroundColor: selectedPreset === amt ? 'var(--primary-light)' : 'white',
                          color: selectedPreset === amt ? 'var(--primary)' : 'var(--text-primary)',
                          fontWeight: 800,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'var(--transition)'
                        }}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  <div className="input-icon-wrapper">
                    <IndianRupee size={18} className="icon" />
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      placeholder="Or enter custom amount in INR (₹)..."
                      value={customAmount}
                      onChange={handleCustomChange}
                    />
                  </div>
                </div>

                {/* Cause Picker */}
                <div className="form-group">
                  <label className="form-label">Designate Contribution To:</label>
                  <select
                    className="form-control"
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                  >
                    <option value="Emergency Medical & Surgery Fund">Emergency Medical & Surgery Fund</option>
                    <option value="Winter Stray Warmth & Shelter Drive">Winter Stray Warmth & Shelter Drive</option>
                    <option value="Community Stray Feeding Initiative">Community Stray Feeding Initiative</option>
                    <option value="Puppy & Kitten Foster Care Packs">Puppy & Kitten Foster Care Packs</option>
                  </select>
                </div>

                {/* Donor Name & Contact */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="form-label" style={{ margin: 0 }}>
                      Donor Name {!isAnonymous && <span className="req">*</span>}
                    </label>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      Make Anonymous
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Liam & Olivia Johnson"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    disabled={isAnonymous}
                    required={!isAnonymous}
                  />
                </div>

                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Email (For receipt):</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="supporter@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone:</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">Loving Dedication / Message:</label>
                  <textarea
                    className="form-control"
                    placeholder="Leave a heartfelt note for our shelter volunteers and rescue pets..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ minHeight: '80px' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', gap: '8px', fontSize: '1.05rem' }}
                >
                  <Heart size={18} fill="white" /> Record ₹{Number(effectiveAmount || 1000).toLocaleString('en-IN')} Donation
                </button>
              </form>
            </div>

            {/* Right: Impact & Live Donor Roll */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Total Raised Widget */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1E2229 0%, #2D3436 100%)',
                  color: 'white',
                  padding: '30px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                  Total Community Fund Raised
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FFD166', marginTop: '6px', lineHeight: 1 }}>
                  ₹{totalDonated.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#CBD5E1', marginTop: '12px' }}>
                  From <strong>{donations.length}</strong> generous animal supporters across the community.
                </div>
              </div>

              {/* Recent Supporters Wall */}
              <div
                className="card-solid"
                style={{
                  padding: '28px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'white'
                }}
              >
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} color="var(--secondary)" /> Recent Community Donors
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '360px', overflowY: 'auto' }}>
                  {donations.map((don) => (
                    <div
                      key={don.id}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-alt)',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{don.donorName}</strong>
                        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
                          ₹{Number(don.amount).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '6px' }}>
                        {don.cause}
                      </div>
                      {don.message && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                          "{don.message}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rescue Foundation Impact Breakdown */}
      <RescueImpactSection
        showSecondaryBtn={true}
        secondaryBtnText="Explore Our Story"
        secondaryBtnLink="/about"
      />
    </div>
  );
};

export default Donate;
