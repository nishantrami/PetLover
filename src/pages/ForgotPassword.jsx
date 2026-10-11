import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  PawPrint,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound
} from 'lucide-react';

export const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const { notifyError } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: identify email, 2: set new password

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      notifyError('Please enter your account email.');
      return;
    }
    setStep(2);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      notifyError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      notifyError('Passwords do not match.');
      return;
    }

    const result = resetPassword(email, newPassword);
    if (result.success) {
      navigate('/login');
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
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <KeyRound size={26} />
          </div>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '6px' }}>
            Reset Your Password
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            {step === 1
              ? 'Enter the email address associated with your PetLover account.'
              : 'Choose a new secure password for your account.'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleVerifyEmail}>
            <div className="form-group">
              <label className="form-label">Registered Account Email</label>
              <div className="input-icon-wrapper">
                <Mail size={18} className="icon" />
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. sarah.jenkins@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', gap: '8px', marginTop: '10px' }}>
              Verify Email <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <div className="form-group">
              <label className="form-label">Account:</label>
              <input type="text" className="form-control" value={email} disabled style={{ backgroundColor: 'var(--bg-alt)' }} />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-icon-wrapper">
                <Lock size={18} className="icon" />
                <input
                  type="password"
                  className="form-control"
                  placeholder="At least 6 chars"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <div className="input-icon-wrapper">
                <Lock size={18} className="icon" />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', gap: '8px', marginTop: '10px' }}>
              Save New Password <CheckCircle2 size={16} />
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem' }}>
          Remembered your password?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
