import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import SectionHeader from '../components/common/SectionHeader';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  PawPrint,
  Edit2,
  Trash2,
  Plus,
  Save,
  CheckCircle2,
  Sparkles,
  Heart
} from 'lucide-react';

export const Profile = () => {
  const { currentUser, updateProfile, addPet, updatePet, deletePet } = useAuth();
  const { notifyError } = useNotification();

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    avatar: currentUser?.avatar || ''
  });

  // Pet Modal States
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [editingPetId, setEditingPetId] = useState(null);
  const [petForm, setPetForm] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    weight: '',
    notes: ''
  });

  // Delete Pet Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  if (!currentUser) return null;

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!profileForm.fullName.trim()) {
      notifyError('Full name is required.');
      return;
    }
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  const openAddPetModal = () => {
    setEditingPetId(null);
    setPetForm({
      name: '',
      type: 'Dog',
      breed: '',
      age: '',
      gender: 'Male',
      weight: '',
      notes: ''
    });
    setPetModalOpen(true);
  };

  const openEditPetModal = (pet) => {
    setEditingPetId(pet.id);
    setPetForm({
      name: pet.name,
      type: pet.type,
      breed: pet.breed || '',
      age: pet.age || '',
      gender: pet.gender || 'Male',
      weight: pet.weight || '',
      notes: pet.notes || ''
    });
    setPetModalOpen(true);
  };

  const handlePetFormSubmit = (e) => {
    e.preventDefault();
    if (!petForm.name.trim()) {
      notifyError('Pet name is required.');
      return;
    }

    if (editingPetId) {
      updatePet(editingPetId, petForm);
    } else {
      addPet(petForm);
    }
    setPetModalOpen(false);
  };

  const pets = currentUser.pets || [];

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '50px 0',
          background: 'linear-gradient(135deg, #FFF6F6 0%, #F5FBFB 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                alt={currentUser.fullName}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid white',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {currentUser.fullName}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
                  Member since {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2026'}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setProfileForm({
                  fullName: currentUser.fullName || '',
                  phone: currentUser.phone || '',
                  address: currentUser.address || '',
                  avatar: currentUser.avatar || ''
                });
                setIsEditingProfile(!isEditingProfile);
              }}
              style={{ gap: '8px' }}
            >
              <Edit2 size={16} /> {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {/* Left: Profile Info Card */}
            <div
              className="card-solid"
              style={{
                padding: '30px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'white'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} color="var(--primary)" /> Personal Information
              </h3>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="text" className="form-control" value={currentUser.email} disabled style={{ backgroundColor: 'var(--bg-alt)' }} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Home Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Avatar Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://images.unsplash.com/..."
                      value={profileForm.avatar}
                      onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, gap: '6px' }}>
                      <Save size={16} /> Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Mail size={18} color="var(--text-muted)" />
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Email:</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{currentUser.email}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={18} color="var(--text-muted)" />
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Phone:</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{currentUser.phone || 'Not provided'}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={18} color="var(--text-muted)" />
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Address:</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{currentUser.address || 'Not provided'}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Registered Pets Management */}
            <div
              className="card-solid"
              style={{
                padding: '30px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'white'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PawPrint size={20} color="var(--secondary)" /> My Registered Pets ({pets.length})
                </h3>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={openAddPetModal}
                  style={{ gap: '6px' }}
                >
                  <Plus size={15} /> Add Pet
                </button>
              </div>

              {pets.length === 0 ? (
                <div className="empty-state" style={{ padding: '30px 20px' }}>
                  <div className="empty-state-icon" style={{ width: '48px', height: '48px' }}>🐾</div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>No pets registered yet</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>
                    Add your furry friend so we can personalize their grooming and health appointments!
                  </p>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={openAddPetModal}>
                    + Add Your First Pet
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      style={{
                        padding: '16px 20px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-alt)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                        >
                          {pet.type === 'Cat' ? '🐈' : pet.type === 'Bird' ? '🦜' : pet.type === 'Rabbit' ? '🐇' : '🐕'}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                            {pet.name}
                          </h4>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            {pet.type} • {pet.breed || 'Mixed'} • {pet.age || '1 yr'}
                          </div>
                          {pet.notes && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', fontStyle: 'italic' }}>
                              "{pet.notes}"
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          onClick={() => openEditPetModal(pet)}
                          title="Edit pet details"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-icon"
                          style={{ width: '32px', height: '32px', backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' }}
                          onClick={() => {
                            setPetToDelete(pet);
                            setDeleteModalOpen(true);
                          }}
                          title="Remove pet"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Add / Edit Pet Modal */}
      <Modal
        isOpen={petModalOpen}
        onClose={() => setPetModalOpen(false)}
        title={editingPetId ? `Edit ${petForm.name}` : 'Add a New Pet'}
        size="md"
      >
        <form onSubmit={handlePetFormSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">
                Pet Name <span className="req">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Barnaby"
                value={petForm.name}
                onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pet Species</label>
              <select
                className="form-control"
                value={petForm.type}
                onChange={(e) => setPetForm({ ...petForm, type: e.target.value })}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Breed</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Golden Retriever"
                value={petForm.breed}
                onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age / Weight</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 3 Years, 25 kg"
                value={petForm.age}
                onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Temperament & Special Notes</label>
            <textarea
              className="form-control"
              placeholder="e.g. Shy around loud blow dryers, loves ear scratches..."
              value={petForm.notes}
              onChange={(e) => setPetForm({ ...petForm, notes: e.target.value })}
              style={{ minHeight: '70px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setPetModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-secondary">
              {editingPetId ? 'Update Pet' : 'Save Pet'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Pet Confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (petToDelete) {
            deletePet(petToDelete.id);
          }
        }}
        title="Remove Pet Profile"
        message={`Are you sure you want to remove ${petToDelete?.name} from your profile?`}
        confirmText="Remove Pet"
      />
    </div>
  );
};

export default Profile;
