import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  PawPrint,
  Mail,
  Lock,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const { notifyError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const handleQuickDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    const result = login(demoEmail, demoPassword);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px',
        background: 'radial-gradient(circle at 50% 30%, #FFF5F5 0%, #FAFAFC 70%)'
      }}
    >
      <div
        className="card-solid"
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '40px 36px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'white',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #FF5A5F 0%, #FC642D 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 6px 18px rgba(255, 90, 95, 0.35)'
            }}
          >
            <PawPrint size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
            Welcome Back!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
            Sign in to manage your bookings and pet profiles.
          </p>
        </div>

        {/* Demo Quick-Fill Buttons */}
        <div
          style={{
            backgroundColor: 'var(--bg-alt)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '24px'
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="var(--primary)" /> 1-Click Demo Accounts:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => handleQuickDemoLogin('sarah.jenkins@example.com', 'password123')}
              style={{ fontSize: '0.78rem', padding: '6px 8px', justifyContent: 'flex-start' }}
            >
              🐕 Sarah (Golden)
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => handleQuickDemoLogin('alex.morris@example.com', 'password123')}
              style={{ fontSize: '0.78rem', padding: '6px 8px', justifyContent: 'flex-start' }}
            >
              🐈 Alex (British Cat)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="icon" />
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" style={{ margin: 0 }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                Forgot Password?
              </Link>
            </div>
            <div className="input-icon-wrapper">
              <Lock size={18} className="icon" />
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', gap: '8px', marginTop: '10px', fontSize: '1rem' }}
            disabled={loading}
          >
            Sign In to Account <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer info */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Register Now
          </Link>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '24px', paddingTop: '16px', textAlign: 'center' }}>
          <Link to="/admin/login" style={{ fontSize: '0.82rem', color: '#7C4DFF', fontWeight: 600 }}>
            Looking for Staff / Admin Portal? Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
