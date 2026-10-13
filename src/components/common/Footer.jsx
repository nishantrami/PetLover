import React from 'react';
import { Link } from 'react-router-dom';
import {
  PawPrint,
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: '#E2E8F0',
        paddingTop: '70px',
        paddingBottom: '30px',
        borderTop: '1px solid #334155'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '50px'
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FF5A5F 0%, #FC642D 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <PawPrint size={22} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'white'
                }}
              >
                Pet<span style={{ color: 'var(--primary)' }}>Lover</span>
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
              Dedicated to delivering world-class compassionate grooming, veterinary wellness, luxury boarding, and loving pet care since 2018.
            </p>

            <div
              style={{
                backgroundColor: 'rgba(255, 90, 95, 0.1)',
                border: '1px solid rgba(255, 90, 95, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Phone size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#CBD5E1', textTransform: 'uppercase', fontWeight: 600 }}>
                  24/7 Pet Emergency Line
                </div>
                <div style={{ fontSize: '0.95rem', color: 'white', fontWeight: 700 }}>
                  +1 (800) 555-PETS
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                color: 'white',
                fontSize: '1.05rem',
                fontWeight: 700,
                marginBottom: '20px',
                position: 'relative'
              }}
            >
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/', label: 'Home Page' },
                { to: '/about', label: 'About Our Team & Facility' },
                { to: '/services', label: 'All Pet Services' },
                { to: '/grooming', label: 'Spa & Grooming' },
                { to: '/pricing', label: 'Transparent Pricing' },
                { to: '/donate', label: 'Pet Rescue Donations' },
                { to: '/feedback', label: 'Client Testimonials' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    style={{
                      color: '#94A3B8',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF5A5F')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    <ArrowRight size={13} color="var(--primary)" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Working Hours & Care */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>
              Opening Hours
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
                <Clock size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'white' }}>Monday – Friday:</strong>
                  <div>08:00 AM – 08:00 PM</div>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
                <Clock size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'white' }}>Saturday:</strong>
                  <div>09:00 AM – 06:00 PM</div>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
                <Clock size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'white' }}>Sunday & Holidays:</strong>
                  <div>10:00 AM – 04:00 PM</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>
              Center Location
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
                <MapPin size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>124 Blossom Pet Lane, West Valley Center, CA 90210</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
                <Mail size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>care@petlovercenter.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
                <Phone size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>+1 (800) 555-PETS (7387)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid #334155',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#64748B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>© {new Date().getFullYear()} PetLover Care Center. Crafted with</span>
            <Heart size={14} color="#FF5A5F" fill="#FF5A5F" />
            <span>for happy pets worldwide.</span>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ color: '#94A3B8' }}>Pure Client-Side React + LocalStorage Persistent Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
