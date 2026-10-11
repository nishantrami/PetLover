import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import SectionHeader from '../components/common/SectionHeader';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const Contact = () => {
  const { addMessage } = useData();
  const { currentUser } = useAuth();
  const { notifyError } = useNotification();

  const [formData, setFormData] = useState({
    name: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      notifyError('Please fill out all required fields.');
      return;
    }

    addMessage({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim() || 'General Pet Inquiry',
      message: formData.message.trim()
    });

    setIsSubmitted(true);
    setFormData({
      name: currentUser?.fullName || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      subject: '',
      message: ''
    });
  };

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '70px 0',
          background: 'linear-gradient(135deg, #FFF8F0 0%, #F5FBFB 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Always Here For You & Your Pet"
            title="We’d Love to Hear From You –"
            highlight="Get in Touch"
            subtitle="Have questions regarding grooming treatments, boarding accommodations, or veterinary care? Reach our friendly staff anytime."
          />
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
            {/* Left: Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                className="card-solid"
                style={{
                  padding: '30px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'white'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>
                  Our Care Center Headquarters
                </h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <MapPin size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Physical Address:</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        124 Blossom Pet Lane, West Valley Center, CA 90210
                      </span>
                    </div>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--secondary-light)',
                        color: 'var(--secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Phone & WhatsApp:</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Direct: (555) 345-7890 • 24/7 Hotline: (800) 555-PETS
                      </span>
                    </div>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--accent-purple-light)',
                        color: 'var(--accent-purple)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Email Inquiries:</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        care@petlovercenter.com • emergency@petlovercenter.com
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Operating Hours Card */}
              <div
                className="card-solid"
                style={{
                  padding: '30px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #1E2229 0%, #2D3436 100%)',
                  color: 'white'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Clock size={20} color="#4ECDC4" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0 }}>
                    Opening Hours & Check-In
                  </h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #3E4654', fontSize: '0.9rem' }}>
                  <span style={{ color: '#94A3B8' }}>Monday – Friday:</span>
                  <strong>08:00 AM – 08:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #3E4654', fontSize: '0.9rem' }}>
                  <span style={{ color: '#94A3B8' }}>Saturday:</span>
                  <strong>09:00 AM – 06:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem' }}>
                  <span style={{ color: '#94A3B8' }}>Sunday & Holidays:</span>
                  <strong>10:00 AM – 04:00 PM</strong>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div
              className="card-solid"
              style={{
                padding: '36px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'white',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
                Send Us A Message
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                Our team responds to all questions within 2 to 4 business hours.
              </p>

              {isSubmitted && (
                <div
                  style={{
                    backgroundColor: '#D1FAE5',
                    color: '#065F46',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    fontSize: '0.9rem'
                  }}
                >
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>Thank you! Your message has been saved and our advisors will follow up shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">
                      Your Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="e.g. David Miller"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="david@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number:</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject:</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="e.g. Grooming Appointment Question"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Your Message <span className="req">*</span>
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    placeholder="Tell us how we can help you and your pet..."
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{ minHeight: '130px' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', gap: '8px', fontSize: '1rem' }}
                >
                  <Send size={16} /> Send Inquiry Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
