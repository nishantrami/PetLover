import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  Scissors,
  Plus,
  Search,
  Edit2,
  Trash2,
  Sparkles,
  Clock,
  IndianRupee,
  Check,
  Image as ImageIcon
} from 'lucide-react';

export const AdminServices = () => {
  const { services, categories, addService, updateServiceData, deleteServiceData } = useData();
  const { notifyError } = useNotification();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'grooming',
    categoryName: 'Pet Grooming & Spa',
    price: 50,
    duration: '60 mins',
    description: '',
    image: '',
    featuresText: '',
    isFeatured: false,
    petTypes: ['Dog', 'Cat'],
    status: 'active'
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const presetImages = [
    { label: 'Grooming Bath', url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80' },
    { label: 'De-Shedding', url: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80' },
    { label: 'Vet Exam', url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80' },
    { label: 'Boarding Hotel', url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80' },
    { label: 'Cat Grooming', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80' },
    { label: 'Puppy Training', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80' }
  ];

  const filteredServices = services.filter((s) => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAddModal = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: '',
      category: categories[0]?.slug || 'grooming',
      categoryName: categories[0]?.name || 'Pet Grooming & Spa',
      price: 50,
      duration: '60 mins',
      description: '',
      image: presetImages[0].url,
      featuresText: 'Warm Hydrotherapy Bath\nNail Trimming & Ear Cleansing\nBlow Dry & Gentle Brush',
      isFeatured: false,
      petTypes: ['Dog', 'Cat'],
      status: 'active'
    });
    setServiceModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title,
      category: service.category,
      categoryName: service.categoryName || service.category,
      price: service.price,
      duration: service.duration,
      description: service.description,
      image: service.image,
      featuresText: (service.features || []).join('\n'),
      isFeatured: Boolean(service.isFeatured),
      petTypes: service.petTypes || ['Dog', 'Cat'],
      status: service.status || 'active'
    });
    setServiceModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!serviceForm.title.trim()) {
      notifyError('Service title is required.');
      return;
    }

    const catObj = categories.find((c) => c.slug === serviceForm.category);

    const payload = {
      title: serviceForm.title.trim(),
      category: serviceForm.category,
      categoryName: catObj ? catObj.name : serviceForm.categoryName,
      price: Number(serviceForm.price) || 50,
      duration: serviceForm.duration.trim(),
      description: serviceForm.description.trim(),
      image: serviceForm.image.trim() || presetImages[0].url,
      features: serviceForm.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      isFeatured: Boolean(serviceForm.isFeatured),
      petTypes: serviceForm.petTypes,
      status: serviceForm.status
    };

    if (editingServiceId) {
      updateServiceData(editingServiceId, payload);
    } else {
      addService(payload);
    }

    setServiceModalOpen(false);
  };

  return (
    <div>
      {/* Top Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Services & Treatments Catalog
          </h1>
          <p className="admin-page-subtitle">
            Create, update, or remove services offered on the storefront.
          </p>
        </div>

        <button type="button" className="btn btn-primary" onClick={openAddModal} style={{ gap: '8px' }}>
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {/* Filter & Search */}
      <div
        className="admin-card"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div className="admin-filter-bar" style={{ marginBottom: 0 }}>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All Categories ({services.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`btn btn-sm ${selectedCategory === cat.slug ? 'btn-primary' : 'btn-outline'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="input-icon-wrapper admin-search-wrapper">
          <Search size={16} className="icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search service title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '6px 12px 6px 36px', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px' }}>
                    <div style={{ color: 'var(--text-muted)' }}>No services found.</div>
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={service.image}
                          alt={service.title}
                          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{service.title}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ID: {service.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          backgroundColor: 'var(--bg-alt)',
                          color: 'var(--text-primary)',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        {service.categoryName || service.category}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--primary)', fontSize: '1.05rem' }}>₹{Number(service.price).toLocaleString('en-IN')}</strong>
                    </td>
                    <td>{service.duration}</td>
                    <td>
                      {service.isFeatured ? (
                        <span style={{ color: '#FF5A5F', fontWeight: 700, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Sparkles size={13} /> Featured
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Standard</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${service.status === 'active' ? 'status-completed' : 'status-cancelled'}`}
                      >
                        {service.status === 'active' ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          onClick={() => openEditModal(service)}
                          title="Edit Service"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-icon"
                          style={{ width: '32px', height: '32px', backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' }}
                          onClick={() => {
                            setServiceToDelete(service);
                            setDeleteModalOpen(true);
                          }}
                          title="Delete Service"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Service Modal */}
      <Modal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        title={editingServiceId ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">
                Service Title <span className="req">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Signature Full Pet Grooming"
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={serviceForm.category}
                onChange={(e) => {
                  const cat = categories.find((c) => c.slug === e.target.value);
                  setServiceForm({
                    ...serviceForm,
                    category: e.target.value,
                    categoryName: cat ? cat.name : e.target.value
                  });
                }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">
                Price (₹ INR) <span className="req">*</span>
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={serviceForm.price}
                onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Duration <span className="req">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 90 mins or Per Night"
                value={serviceForm.duration}
                onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Detailed description of what this service offers..."
              value={serviceForm.description}
              onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
              style={{ minHeight: '80px' }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Inclusions / Features (One item per line):</label>
            <textarea
              className="form-control"
              placeholder="Warm Hydrotherapy Bath&#10;Nail Trimming & Ear Cleansing&#10;Custom Scissor Styling"
              value={serviceForm.featuresText}
              onChange={(e) => setServiceForm({ ...serviceForm, featuresText: e.target.value })}
              style={{ minHeight: '80px' }}
            />
          </div>

          {/* Image URL & Presets */}
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              value={serviceForm.image}
              onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
              required
            />
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Or pick a photo:</span>
              {presetImages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setServiceForm({ ...serviceForm, image: p.url })}
                  style={{
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: serviceForm.image === p.url ? 'var(--primary-light)' : 'white',
                    color: serviceForm.image === p.url ? 'var(--primary)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={serviceForm.isFeatured}
                onChange={(e) => setServiceForm({ ...serviceForm, isFeatured: e.target.checked })}
              />
              Show on Homepage Featured List
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={serviceForm.status === 'active'}
                onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.checked ? 'active' : 'hidden' })}
              />
              Visible & Active
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setServiceModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingServiceId ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Service Confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (serviceToDelete) {
            deleteServiceData(serviceToDelete.id);
          }
        }}
        title="Delete Service"
        message={`Are you sure you want to delete "${serviceToDelete?.title}"? This will immediately remove it from the customer storefront.`}
        confirmText="Delete Service"
      />
    </div>
  );
};

export default AdminServices;
