import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import SectionHeader from '../components/common/SectionHeader';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  Calendar,
  Clock,
  PawPrint,
  CheckCircle2,
  AlertCircle,
  FileText,
  XCircle,
  Scissors,
  Printer,
  Search,
  ArrowRight,
  Plus
} from 'lucide-react';

export const MyBookings = () => {
  const { currentUser } = useAuth();
  const { bookings, cancelBooking } = useData();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  // Filter user's bookings (by userId or user email)
  const userBookings = bookings.filter(
    (b) =>
      (currentUser && b.userId === currentUser.id) ||
      (currentUser && b.email && b.email.toLowerCase() === currentUser.email.toLowerCase())
  );

  const filteredBookings = userBookings.filter((b) => {
    const matchTab = activeTab === 'All' || b.status === activeTab;
    const matchSearch =
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTab && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="status-badge status-confirmed">Confirmed</span>;
      case 'In Progress':
        return <span className="status-badge status-inprogress">In Progress</span>;
      case 'Completed':
        return <span className="status-badge status-completed">Completed</span>;
      case 'Cancelled':
        return <span className="status-badge status-cancelled">Cancelled</span>;
      default:
        return <span className="status-badge status-pending">Pending</span>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '60px 0',
          background: 'linear-gradient(135deg, #FFF6F6 0%, #F5FBFB 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <span className="badge badge-pill-primary" style={{ marginBottom: '10px' }}>
                Customer Portal
              </span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                My Appointments & History
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px', margin: 0 }}>
                Track live status updates, view treatment notes, and manage your bookings.
              </p>
            </div>

            <Link to="/booking" className="btn btn-primary" style={{ gap: '8px' }}>
              <Plus size={16} /> New Booking
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          {/* Filter Tabs & Search Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '30px'
            }}
          >
            {/* Status Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['All', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((tab) => {
                const count =
                  tab === 'All'
                    ? userBookings.length
                    : userBookings.filter((b) => b.status === tab).length;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
                    style={{ borderRadius: 'var(--radius-full)' }}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="input-icon-wrapper" style={{ width: '280px' }}>
              <Search size={16} className="icon" />
              <input
                type="text"
                className="form-control"
                placeholder="Search booking ID or pet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px 12px 8px 38px', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🐾</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>No bookings found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                {activeTab !== 'All'
                  ? `You have no ${activeTab.toLowerCase()} appointments.`
                  : 'You haven\'t scheduled any pet care sessions yet.'}
              </p>
              <Link to="/booking" className="btn btn-primary btn-sm">
                Schedule Your First Appointment
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="card-solid card-hoverable"
                  style={{
                    padding: '24px 28px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'white',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '20px',
                    alignItems: 'center'
                  }}
                >
                  {/* ID & Date */}
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Booking ID:</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>
                      #{b.id}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {b.bookingDate} at {b.bookingTime}
                    </div>
                  </div>

                  {/* Pet Info */}
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pet & Service:</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {b.petName} ({b.petType} - {b.petBreed})
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '2px' }}>
                      {b.serviceName}
                    </div>
                  </div>

                  {/* Pricing & Package */}
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tier & Price:</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{Number(b.price).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {b.packageName || 'Standard Care'}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>Current Status:</div>
                    {getStatusBadge(b.status)}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedBooking(b)}
                    >
                      Details & Receipt
                    </button>
                    {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{ backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)', border: 'none' }}
                        onClick={() => {
                          setBookingToCancel(b);
                          setCancelModalOpen(true);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Details & Printable Receipt Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title={`Booking #${selectedBooking?.id}`}
        subtitle="Pet Care Appointment Receipt"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="btn btn-outline" onClick={handlePrint} style={{ gap: '6px' }}>
              <Printer size={16} /> Print Receipt
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setSelectedBooking(null)}>
              Close
            </button>
          </div>
        }
      >
        {selectedBooking && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-alt)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status:</span>
                <div style={{ marginTop: '4px' }}>{getStatusBadge(selectedBooking.status)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount:</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ₹{Number(selectedBooking.price).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Appointment Details
                </h4>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  <div><strong>Date:</strong> {selectedBooking.bookingDate}</div>
                  <div><strong>Time:</strong> {selectedBooking.bookingTime}</div>
                  <div><strong>Service:</strong> {selectedBooking.serviceName}</div>
                  <div><strong>Package:</strong> {selectedBooking.packageName}</div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Pet & Parent Info
                </h4>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  <div><strong>Pet Name:</strong> {selectedBooking.petName} ({selectedBooking.petType})</div>
                  <div><strong>Breed:</strong> {selectedBooking.petBreed || 'Mixed'}</div>
                  <div><strong>Parent:</strong> {selectedBooking.customerName}</div>
                  <div><strong>Phone:</strong> {selectedBooking.phone}</div>
                </div>
              </div>
            </div>

            {selectedBooking.notes && (
              <div style={{ backgroundColor: 'var(--bg-alt)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Special Instructions / Care Notes:
                </strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  "{selectedBooking.notes}"
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Cancel Confirmation Modal */}
      <ConfirmModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={() => {
          if (bookingToCancel) {
            cancelBooking(bookingToCancel.id, 'Cancelled by customer');
          }
        }}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel booking #${bookingToCancel?.id} for ${bookingToCancel?.petName}?`}
        confirmText="Confirm Cancellation"
      />
    </div>
  );
};

export default MyBookings;
