import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  PawPrint,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Register = () => {
  const { register } = useAuth();
  const { notifyError } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    firstPetName: '',
    firstPetType: 'Dog',
    firstPetBreed: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      notifyError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notifyError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const initialPets = formData.firstPetName.trim()
      ? [
          {
            id: 'pet_' + Date.now().toString(36),
            name: formData.firstPetName.trim(),
            type: formData.firstPetType,
            breed: formData.firstPetBreed.trim() || 'Mixed',
            age: '1 Year',
            gender: 'Male',
            notes: 'Registered at signup'
          }
        ]
      : [];

    const result = register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      pets: initialPets
    });

    setLoading(false);

    if (result.success) {
      navigate('/profile');
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
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
          maxWidth: '560px',
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
              background: 'linear-gradient(135deg, #00A699 0%, #20C2B5 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 6px 18px rgba(0, 166, 153, 0.35)'
            }}
          >
            <PawPrint size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
            Create Your PetLover Account
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
            Join our pet family to schedule appointments and view medical records.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Full Name <span className="req">*</span>
            </label>
            <div className="input-icon-wrapper">
              <User size={18} className="icon" />
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="e.g. Sarah Jenkins"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">
                Email Address <span className="req">*</span>
              </label>
              <div className="input-icon-wrapper">
                <Mail size={18} className="icon" />
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-icon-wrapper">
                <Phone size={18} className="icon" />
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">
                Password <span className="req">*</span>
              </label>
              <div className="input-icon-wrapper">
                <Lock size={18} className="icon" />
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="At least 6 chars"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Confirm Password <span className="req">*</span>
              </label>
              <div className="input-icon-wrapper">
                <Lock size={18} className="icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Optional Pet Section */}
          <div
            style={{
              backgroundColor: 'var(--bg-alt)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              border: '1px solid var(--border-light)'
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PawPrint size={16} color="var(--primary)" /> Add Your First Pet (Optional):
            </div>
            <div className="grid grid-cols-3" style={{ gap: '10px' }}>
              <input
                type="text"
                name="firstPetName"
                className="form-control"
                placeholder="Pet Name"
                value={formData.firstPetName}
                onChange={handleInputChange}
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
              />
              <select
                name="firstPetType"
                className="form-control"
                value={formData.firstPetType}
                onChange={handleInputChange}
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
              </select>
              <input
                type="text"
                name="firstPetBreed"
                className="form-control"
                placeholder="Breed (e.g. Beagle)"
                value={formData.firstPetBreed}
                onChange={handleInputChange}
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-secondary btn-lg"
            style={{ width: '100%', gap: '8px', fontSize: '1rem' }}
            disabled={loading}
          >
            Complete Registration <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: 700 }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
