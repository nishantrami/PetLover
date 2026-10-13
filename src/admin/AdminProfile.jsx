import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useData } from '../context/DataContext';
import { useNotification } from '../context/NotificationContext';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  UserCheck,
  Shield,
  Save,
  RotateCcw,
  Mail,
  Lock,
  Key,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const AdminProfile = () => {
  const { adminUser, updateAdminProfile } = useAdminAuth();
  const { resetAllDataToDemo } = useData();
  const { notifySuccess, notifyError } = useNotification();

  const [form, setForm] = useState({
    fullName: adminUser?.fullName || 'PetLover Head Administrator',
    email: adminUser?.email || 'admin@petlover.com',
    avatar: adminUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    newPassword: '',
    confirmPassword: ''
  });

  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      notifyError('New passwords do not match.');
      return;
    }

    const updates = {
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      avatar: form.avatar.trim()
    };

    if (form.newPassword) {
      updates.password = form.newPassword;
    }

    updateAdminProfile(updates);
    setForm({ ...form, newPassword: '', confirmPassword: '' });
  };

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Admin Profile & System Settings
          </h1>
          <p className="admin-page-subtitle">
            Manage administrative credentials and restore demonstration sample datasets.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* Left: Admin Settings Form */}
        <div className="admin-card card-solid">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <img
              src={form.avatar}
              alt="Admin Avatar"
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #7C4DFF' }}
            />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{adminUser?.fullName}</h3>
              <span className="badge badge-pill-purple" style={{ marginTop: '4px' }}>
                <Shield size={12} /> {adminUser?.role || 'Super Admin'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Administrator Display Name</label>
              <input
                type="text"
                className="form-control"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Administrator Email (Login ID)</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Avatar Photo URL</label>
              <input
                type="url"
                className="form-control"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              />
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px', marginTop: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Change Admin Password (Optional):</h4>
              <div className="grid grid-cols-2" style={{ gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Leave blank to keep current"
                    value={form.newPassword}
                    onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repeat new password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '8px', marginTop: '10px' }}>
              <Save size={16} /> Save Admin Settings
            </button>
          </form>
        </div>

        {/* Right: Storage & Demo Reset Operations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="admin-card card-solid">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <RotateCcw size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                Reset & Re-Seed Demonstration Data
              </h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              If you’d like to restore the application back to its pristine default seed state (default services, packages, initial bookings, demo user accounts, and test donations), click below.
            </p>

            <button
              type="button"
              className="btn btn-outline"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                gap: '8px'
              }}
              onClick={() => setResetModalOpen(true)}
            >
              <RotateCcw size={16} /> Restore Default Demo Data
            </button>
          </div>

          <div
            className="card-solid"
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-alt)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
              Client-Side Persistence Architecture:
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>✓ Data stored across partitioned <code>localStorage</code> keys</li>
              <li>✓ 0% backend or external API dependency</li>
              <li>✓ Fully responsive across desktop, tablet, and mobile devices</li>
              <li>✓ Real-time state synchronization via React Context</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={resetAllDataToDemo}
        title="Restore Default Demo Dataset"
        message="Are you sure you want to reset all data back to the default sample dataset? This will replace current custom bookings and services."
        confirmText="Yes, Reset Data"
      />
    </div>
  );
};

export default AdminProfile;
