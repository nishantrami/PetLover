import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Check,
  X,
  IndianRupee
} from 'lucide-react';

export const AdminPackages = () => {
  const { packages, addPackage, updatePackageData, deletePackageData } = useData();
  const { notifyError } = useNotification();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    tier: 'Standard',
    price: 69,
    billingPeriod: 'per session',
    badge: 'Popular Choice',
    isPopular: false,
    color: '#FF5A5F',
    description: '',
    featuresList: [
      { text: 'Warm Water Hydro Bath', included: true },
      { text: 'Blow Dry & Gentle Coat Brush', included: true },
      { text: 'Nail Trimming & Filing', included: true },
      { text: 'Ear Cleansing & Inspection', included: true },
      { text: 'Sanitary Area Trim', included: true },
      { text: 'Teeth Brushing & Breath Spray', included: false },
      { text: 'Paw Pad Herbal Butter Balm', included: false }
    ]
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pkgToDelete, setPkgToDelete] = useState(null);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      tier: 'Standard',
      price: 69,
      billingPeriod: 'per session',
      badge: '',
      isPopular: false,
      color: '#FF5A5F',
      description: '',
      featuresList: [
        { text: 'Hydrating Warm Water Bath', included: true },
        { text: 'Blow Dry & Gentle Coat Brush', included: true },
        { text: 'Nail Trimming & Filing', included: true },
        { text: 'Ear Cleansing & Inspection', included: true },
        { text: 'Sanitary Area Trim', included: true },
        { text: 'Teeth Brushing & Breath Spray', included: true },
        { text: 'Paw Pad Herbal Butter Balm', included: false },
        { text: 'Aromatherapy Coat Cologne', included: false }
      ]
    });
    setModalOpen(true);
  };

  const openEdit = (pkg) => {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      tier: pkg.tier || 'Standard',
      price: pkg.price,
      billingPeriod: pkg.billingPeriod || 'per session',
      badge: pkg.badge || '',
      isPopular: Boolean(pkg.isPopular),
      color: pkg.color || '#FF5A5F',
      description: pkg.description || '',
      featuresList: pkg.features || []
    });
    setModalOpen(true);
  };

  const handleToggleFeature = (index) => {
    const updated = [...form.featuresList];
    updated[index].included = !updated[index].included;
    setForm({ ...form, featuresList: updated });
  };

  const handleFeatureTextChange = (index, text) => {
    const updated = [...form.featuresList];
    updated[index].text = text;
    setForm({ ...form, featuresList: updated });
  };

  const handleAddFeatureLine = () => {
    setForm({
      ...form,
      featuresList: [...form.featuresList, { text: 'New Care Item', included: true }]
    });
  };

  const handleRemoveFeatureLine = (index) => {
    const updated = form.featuresList.filter((_, i) => i !== index);
    setForm({ ...form, featuresList: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      notifyError('Package name is required.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      tier: form.tier,
      price: Number(form.price) || 50,
      billingPeriod: form.billingPeriod.trim(),
      badge: form.badge.trim(),
      isPopular: Boolean(form.isPopular),
      color: form.color,
      description: form.description.trim(),
      features: form.featuresList
    };

    if (editingId) {
      updatePackageData(editingId, payload);
    } else {
      addPackage(payload);
    }

    setModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Grooming & Spa Packages
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px', margin: 0 }}>
            Manage pricing tiers, included treatments, and marketing badges.
          </p>
        </div>

        <button type="button" className="btn btn-primary" onClick={openAdd} style={{ gap: '8px' }}>
          <Plus size={16} /> Add New Package
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="card-solid"
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'white',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              border: pkg.isPopular ? '2px solid var(--primary)' : '1px solid var(--border-color)'
            }}
          >
            {pkg.isPopular && (
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                ★ {pkg.badge || 'Popular'}
              </span>
            )}

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: pkg.color || 'var(--primary)' }}>
                {pkg.tier}
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '4px 0' }}>{pkg.name}</h3>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                ₹{Number(pkg.price).toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{pkg.billingPeriod}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', minHeight: '36px' }}>
                {pkg.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginBottom: '20px', flex: 1 }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Included Features ({(pkg.features || []).filter(f => f.included).length}):
              </strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(pkg.features || []).slice(0, 4).map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: f.included ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {f.included ? <Check size={13} color="#10B981" /> : <X size={13} color="#EF4444" />}
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => openEdit(pkg)}
                style={{ gap: '4px' }}
              >
                <Edit2 size={13} /> Edit
              </button>
              <button
                type="button"
                className="btn btn-sm"
                style={{ backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)', border: 'none', gap: '4px' }}
                onClick={() => {
                  setPkgToDelete(pkg);
                  setDeleteModalOpen(true);
                }}
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Package' : 'Create New Package'}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">
                Package Name <span className="req">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Deluxe Pampering"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tier Name</label>
              <select
                className="form-control"
                value={form.tier}
                onChange={(e) => setForm({ ...form, tier: e.target.value })}
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="VIP Royal">VIP Royal</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Price (₹ INR)</label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Marketing Badge Label</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Most Popular"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Short description of this tier..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ minHeight: '60px' }}
            />
          </div>

          {/* Features check list builder */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" style={{ margin: 0 }}>Included & Excluded Treatments:</label>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleAddFeatureLine}
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
              >
                + Add Item
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
              {form.featuresList.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={feat.included}
                    onChange={() => handleToggleFeature(idx)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    title={feat.included ? 'Included in tier' : 'Excluded in tier'}
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={feat.text}
                    onChange={(e) => handleFeatureTextChange(idx, e.target.value)}
                    style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeatureLine(idx)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.isPopular}
                onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
              />
              Highlight as "Most Popular" Ribbon Card
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Package' : 'Create Package'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (pkgToDelete) {
            deletePackageData(pkgToDelete.id);
          }
        }}
        title="Delete Package"
        message={`Are you sure you want to delete package "${pkgToDelete?.name}"?`}
        confirmText="Delete Package"
      />
    </div>
  );
};

export default AdminPackages;
