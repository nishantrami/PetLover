import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  CalendarCheck,
  Search,
  Filter,
  Eye,
  Trash2,
  Clock,
  PawPrint,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';

export const AdminBookings = () => {
  const { bookings, updateBookingStatus, deleteBookingData } = useData();
  const [activeStatusFilter, setActiveStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    const matchStatus = activeStatusFilter === 'All' || b.status === activeStatusFilter;
    const matchSearch =
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return { bg: 'var(--status-confirmed-bg)', color: 'var(--status-confirmed)' };
      case 'In Progress':
        return { bg: 'var(--status-inprogress-bg)', color: 'var(--status-inprogress)' };
      case 'Completed':
        return { bg: 'var(--status-completed-bg)', color: 'var(--status-completed)' };
      case 'Cancelled':
        return { bg: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' };
      default:
        return { bg: 'var(--status-pending-bg)', color: 'var(--status-pending)' };
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Booking Management
          </h1>
          <p className="admin-page-subtitle">
            Manage appointments, modify live status, and inspect customer special requests.
          </p>
        </div>

        {/* Search */}
        <div className="input-icon-wrapper admin-search-wrapper">
          <Search size={16} className="icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID, pet or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px 8px 38px', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="admin-filter-bar">
        {['All', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((status) => {
          const count =
            status === 'All'
              ? bookings.length
              : bookings.filter((b) => b.status === status).length;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setActiveStatusFilter(status)}
              className={`btn btn-sm ${activeStatusFilter === status ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Client & Phone</th>
                <th>Pet Details</th>
                <th>Treatment & Tier</th>
                <th>Scheduled For</th>
                <th>Price</th>
                <th>Status (Instant Update)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '36px' }}>
                    <div style={{ color: 'var(--text-muted)' }}>No bookings match the selected criteria.</div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const styleColors = getStatusColor(b.status);
                  return (
                    <tr key={b.id}>
                      <td>
                        <strong style={{ color: 'var(--primary)' }}>#{b.id}</strong>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{b.customerName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.phone}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{b.petName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {b.petType} • {b.petBreed || 'Mixed'}
                        </div>
                      </td>
                      <td>
                        <div>{b.serviceName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>{b.packageName}</div>
                      </td>
                      <td>
                        <div>{b.bookingDate}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.bookingTime}</div>
                      </td>
                      <td>
                        <strong>₹{Number(b.price).toLocaleString('en-IN')}</strong>
                      </td>
                      <td>
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                          style={{
                            padding: '5px 10px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: '1px solid var(--border-color)',
                            backgroundColor: styleColors.bg,
                            color: styleColors.color,
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="btn btn-outline btn-icon"
                            style={{ width: '32px', height: '32px' }}
                            onClick={() => setSelectedBooking(b)}
                            title="Inspect Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-icon"
                            style={{ width: '32px', height: '32px', backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' }}
                            onClick={() => {
                              setBookingToDelete(b);
                              setDeleteModalOpen(true);
                            }}
                            title="Delete Record"
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

      {/* Booking Details Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title={`Booking #${selectedBooking?.id}`}
        subtitle="Appointment Inspector & Management"
        size="md"
      >
        {selectedBooking && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Client Name</span>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedBooking.customerName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedBooking.email}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedBooking.phone}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pet Information</span>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedBooking.petName} ({selectedBooking.petType})</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Breed: {selectedBooking.petBreed || 'Mixed'}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Age: {selectedBooking.petAge || 'N/A'}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Service Treatment</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{selectedBooking.serviceName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600 }}>{selectedBooking.packageName}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date & Schedule</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{selectedBooking.bookingDate}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedBooking.bookingTime}</div>
              </div>
            </div>

            {selectedBooking.address && (
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pickup Address:</span>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{selectedBooking.address}</div>
              </div>
            )}

            {selectedBooking.notes && (
              <div style={{ backgroundColor: 'var(--bg-alt)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Customer Notes:
                </strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  "{selectedBooking.notes}"
                </p>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status:</span>
                <select
                  value={selectedBooking.status}
                  onChange={(e) => {
                    updateBookingStatus(selectedBooking.id, e.target.value);
                    setSelectedBooking({ ...selectedBooking, status: e.target.value });
                  }}
                  style={{ marginLeft: '8px', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                ₹{Number(selectedBooking.price).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (bookingToDelete) {
            deleteBookingData(bookingToDelete.id);
          }
        }}
        title="Delete Booking Record"
        message={`Are you sure you want to permanently delete appointment #${bookingToDelete?.id}?`}
        confirmText="Delete Booking"
      />
    </div>
  );
};

export default AdminBookings;
