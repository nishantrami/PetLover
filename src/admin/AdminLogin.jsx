import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  Shield,
  PawPrint,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  KeyRound
} from 'lucide-react';

export const AdminLogin = () => {
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@petlover.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const result = adminLogin(email, password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@petlover.com');
    setPassword('admin123');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: '#171B21',
        backgroundImage: 'radial-gradient(circle at 50% 20%, #272C35 0%, #171B21 80%)'
      }}
    >
      <div
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '40px 36px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#1E2229',
          border: '1px solid #2E3642',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          color: 'white'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #7C4DFF 0%, #FF5A5F 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 20px rgba(124, 77, 255, 0.4)'
            }}
          >
            <Shield size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
            Staff & Admin Portal
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0 }}>
            PetLover Management System Control Center
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div
          style={{
            backgroundColor: '#272C35',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #3E4654',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: '#A78BFA', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🔑 Demo Admin Credentials
            </span>
            <button
              type="button"
              onClick={handleDemoFill}
              style={{
                background: 'none',
                border: 'none',
                color: '#FF5A5F',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Auto-Fill
            </button>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#CBD5E1', fontFamily: 'monospace' }}>
            <div>Email: <strong>admin@petlover.com</strong></div>
            <div>Password: <strong>admin123</strong></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ color: '#CBD5E1' }}>
              Administrator Email
            </label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="icon" style={{ color: '#64748B' }} />
              <input
                type="email"
                className="form-control"
                style={{ backgroundColor: '#272C35', borderColor: '#3E4654', color: 'white' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: '#CBD5E1' }}>
              Password
            </label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="icon" style={{ color: '#64748B' }} />
              <input
                type="password"
                className="form-control"
                style={{ backgroundColor: '#272C35', borderColor: '#3E4654', color: 'white' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-lg"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #7C4DFF 0%, #9066FF 100%)',
              color: 'white',
              boxShadow: '0 6px 20px rgba(124, 77, 255, 0.4)',
              gap: '8px',
              marginTop: '10px',
              fontSize: '1rem'
            }}
            disabled={loading}
          >
            Authenticate Admin <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>
            ← Return to Public Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
