import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  Users,
  Search,
  Eye,
  Trash2,
  PawPrint,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ClipboardList
} from 'lucide-react';

export const AdminCustomers = () => {
  const { users, bookings, deleteUserData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.phone && u.phone.includes(searchTerm))
  );

  const getCustomerBookings = (userId, email) => {
    return bookings.filter(
      (b) => b.userId === userId || (b.email && b.email.toLowerCase() === email.toLowerCase())
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Customer Management
          </h1>
          <p className="admin-page-subtitle">
            View registered pet parents, their pets, and their booking histories.
          </p>
        </div>

        {/* Search */}
        <div className="input-icon-wrapper admin-search-wrapper">
          <Search size={16} className="icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px 8px 38px', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact Email</th>
                <th>Phone</th>
                <th>Registered Pets</th>
                <th>Total Bookings</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px' }}>
                    <div style={{ color: 'var(--text-muted)' }}>No customers found matching search criteria.</div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((customer) => {
                  const custBookings = getCustomerBookings(customer.id, customer.email);
                  const pets = customer.pets || [];
                  return (
                    <tr key={customer.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={customer.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                            alt={customer.fullName}
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{customer.fullName}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ID: {customer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{customer.email}</td>
                      <td>{customer.phone || 'N/A'}</td>
                      <td>
                        <span
                          style={{
                            backgroundColor: 'var(--secondary-light)',
                            color: 'var(--secondary)',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            fontWeight: 700
                          }}
                        >
                          {pets.length} Pet{pets.length !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          {custBookings.length}
                        </span>
                      </td>
                      <td>
                        {customer.createdAt
                          ? new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Jan 2026'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            className="btn btn-outline btn-icon"
                            style={{ width: '32px', height: '32px' }}
                            onClick={() => setSelectedCustomer(customer)}
                            title="View Customer Profile"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-icon"
                            style={{ width: '32px', height: '32px', backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' }}
                            onClick={() => {
                              setCustomerToDelete(customer);
                              setDeleteModalOpen(true);
                            }}
                            title="Delete Customer Account"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Customer Details Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title="Customer Profile & Pets"
        size="lg"
      >
        {selectedCustomer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Top Overview */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', backgroundColor: 'var(--bg-alt)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <img
                src={selectedCustomer.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={selectedCustomer.fullName}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{selectedCustomer.fullName}</h3>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {selectedCustomer.email} • {selectedCustomer.phone || 'No phone'}
                </div>
                {selectedCustomer.address && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    📍 {selectedCustomer.address}
                  </div>
                )}
              </div>
            </div>

            {/* Registered Pets */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PawPrint size={18} color="var(--primary)" /> Registered Pets ({(selectedCustomer.pets || []).length})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {(selectedCustomer.pets || []).map((pet) => (
                  <div
                    key={pet.id}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'white',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <strong style={{ fontSize: '0.95rem' }}>{pet.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {pet.type} • {pet.breed || 'Mixed'}
                    </div>
                    {pet.notes && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                        "{pet.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bookings History */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ClipboardList size={18} color="var(--secondary)" /> Appointment History
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {getCustomerBookings(selectedCustomer.id, selectedCustomer.email).map((b) => (
                  <div
                    key={b.id}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-alt)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--primary)' }}>#{b.id}</strong> - {b.serviceName}
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {b.bookingDate} at {b.bookingTime} • Pet: {b.petName}
                      </div>
                    </div>
                    <span className={`status-badge status-${b.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Customer Confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (customerToDelete) {
            deleteUserData(customerToDelete.id);
          }
        }}
        title="Delete Customer Account"
        message={`Are you sure you want to remove customer ${customerToDelete?.fullName}? This will delete their registered account from localStorage.`}
        confirmText="Delete Customer"
      />
    </div>
  );
};

export default AdminCustomers;
