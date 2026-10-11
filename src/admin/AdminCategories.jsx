import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Scissors,
  HeartPulse,
  Home,
  GraduationCap,
  Footprints
} from 'lucide-react';

export const AdminCategories = () => {
  const { categories, services, addCategory, updateCategoryData, deleteCategoryData } = useData();
  const { notifyError } = useNotification();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'Sparkles',
    badgeColor: '#FF5A5F'
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      icon: 'Sparkles',
      badgeColor: '#FF5A5F'
    });
    setModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      icon: cat.icon || 'Sparkles',
      badgeColor: cat.badgeColor || '#FF5A5F'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      notifyError('Category name is required.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || form.name.toLowerCase().replace(/\s+/g, '-'),
      description: form.description.trim(),
      icon: form.icon,
      badgeColor: form.badgeColor
    };

    if (editingId) {
      updateCategoryData(editingId, payload);
    } else {
      addCategory(payload);
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
            Service Categories
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px', margin: 0 }}>
            Organize pet treatments and spa services into intuitive customer categories.
          </p>
        </div>

        <button type="button" className="btn btn-primary" onClick={openAdd} style={{ gap: '8px' }}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-3">
        {categories.map((cat) => {
          const linkedCount = services.filter((s) => s.category === cat.slug).length;
          return (
            <div
              key={cat.id}
              className="card-solid"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'white',
                borderLeft: `5px solid ${cat.badgeColor || 'var(--primary)'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{cat.name}</h3>
                <span
                  style={{
                    backgroundColor: 'var(--bg-alt)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {linkedCount} Services
                </span>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Slug: <code>{cat.slug}</code>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px', minHeight: '40px' }}>
                {cat.description || 'No description provided.'}
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => openEdit(cat)}
                  style={{ gap: '4px' }}
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{ backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)', border: 'none', gap: '4px' }}
                  onClick={() => {
                    setCategoryToDelete(cat);
                    setDeleteModalOpen(true);
                  }}
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Category' : 'Create New Category'}
        size="sm"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Category Name <span className="req">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Pet Grooming & Spa"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category Slug (URL Identifier)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. grooming"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Summary of services in this category..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ minHeight: '70px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Badge Color Accent</label>
            <input
              type="color"
              value={form.badgeColor}
              onChange={(e) => setForm({ ...form, badgeColor: e.target.value })}
              style={{ width: '100%', height: '40px', padding: '2px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Category' : 'Save Category'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (categoryToDelete) {
            deleteCategoryData(categoryToDelete.id);
          }
        }}
        title="Delete Category"
        message={`Are you sure you want to delete category "${categoryToDelete?.name}"?`}
        confirmText="Delete Category"
      />
    </div>
  );
};

export default AdminCategories;
