import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import StatCard from '../components/admin/StatCard';
import {
  Users,
  CalendarCheck,
  Clock,
  CheckCircle2,
  Scissors,
  MessageSquareQuote,
  Mail,
  HeartHandshake,
  IndianRupee,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Plus
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    services,
    bookings,
    feedback,
    messages,
    donations,
    users,
    updateBookingStatus
  } = useData();

  // Dynamic calculations
  const totalCustomers = users.length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
  const inProgressBookings = bookings.filter((b) => b.status === 'In Progress').length;
  const completedBookings = bookings.filter((b) => b.status === 'Completed').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'Cancelled').length;

  const totalServices = services.length;
  const totalFeedback = feedback.length;
  const unreadMessages = messages.filter((m) => !m.isRead).length;

  const totalDonationAmount = donations.reduce(
    (sum, d) => sum + (Number(d.amount) || 0),
    0
  );

  const totalBookingRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

  // Recent 5 bookings
  const recentBookings = bookings.slice(0, 5);
  // Recent 4 messages
  const recentMessages = messages.slice(0, 4);

  return (
    <div>
      {/* Top Welcome Title */}
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
            Executive Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px', margin: 0 }}>
            Real-time analytics and customer operations persisted via localStorage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/admin/services" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
            <Plus size={15} /> Add Service
          </Link>
          <Link to="/admin/bookings" className="btn btn-outline btn-sm">
            View All Bookings
          </Link>
        </div>
      </div>

      {/* Row 1: Primary Metrics Grid */}
      <div className="grid grid-cols-4" style={{ marginBottom: '28px' }}>
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          subtitle="Registered pet parents"
          icon={Users}
          color="#3B82F6"
          bgColor="#DBEAFE"
        />
        <StatCard
          title="Total Bookings"
          value={totalBookings}
          subtitle={`${pendingBookings} awaiting action`}
          icon={CalendarCheck}
          color="#FF5A5F"
          bgColor="#FFEAEA"
        />
        <StatCard
          title="Bookings Value"
          value={`₹${totalBookingRevenue.toLocaleString('en-IN')}`}
          subtitle="Active appointments"
          icon={IndianRupee}
          color="#10B981"
          bgColor="#D1FAE5"
        />
        <StatCard
          title="Rescue Donations"
          value={`₹${totalDonationAmount.toLocaleString('en-IN')}`}
          subtitle={`From ${donations.length} supporters`}
          icon={HeartHandshake}
          color="#7C4DFF"
          bgColor="#F0EBFF"
        />
      </div>

      {/* Row 2: Secondary Status Metrics */}
      <div className="grid grid-cols-4" style={{ marginBottom: '32px' }}>
        <div className="card-solid" style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--status-pending)', textTransform: 'uppercase' }}>
            Pending Bookings
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {pendingBookings}
          </div>
        </div>

        <div className="card-solid" style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--status-completed)', textTransform: 'uppercase' }}>
            Completed Sessions
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {completedBookings}
          </div>
        </div>

        <div className="card-solid" style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#00A699', textTransform: 'uppercase' }}>
            Active Services Catalog
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {totalServices}
          </div>
        </div>

        <div className="card-solid" style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FC642D', textTransform: 'uppercase' }}>
            Unread Inquiries
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {unreadMessages}
          </div>
        </div>
      </div>

      {/* Row 3: Data Visualizations (Status distribution + Popular Services) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Booking Status Distribution */}
        <div
          className="card-solid"
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'white'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>
            Appointment Status Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Pending Confirmation', count: pendingBookings, color: '#F59E0B' },
              { label: 'In Progress / Active', count: inProgressBookings, color: '#8B5CF6' },
              { label: 'Completed Successfully', count: completedBookings, color: '#10B981' },
              { label: 'Cancelled', count: cancelledBookings, color: '#EF4444' }
            ].map((item, idx) => {
              const pct = totalBookings > 0 ? Math.round((item.count / totalBookings) * 100) : 0;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                    <span style={{ fontWeight: 700, color: item.color }}>{item.count} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-alt)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        backgroundColor: item.color,
                        borderRadius: '999px',
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick System Shortcuts */}
        <div
          className="card-solid"
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'white'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>
            Quick Admin Operations
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Link
              to="/admin/services"
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', padding: '14px', fontSize: '0.88rem' }}
            >
              <Scissors size={18} color="var(--primary)" /> Manage Services
            </Link>
            <Link
              to="/admin/bookings"
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', padding: '14px', fontSize: '0.88rem' }}
            >
              <CalendarCheck size={18} color="#3B82F6" /> Update Bookings
            </Link>
            <Link
              to="/admin/customers"
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', padding: '14px', fontSize: '0.88rem' }}
            >
              <Users size={18} color="#00A699" /> View Customers
            </Link>
            <Link
              to="/admin/donations"
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', padding: '14px', fontSize: '0.88rem' }}
            >
              <HeartHandshake size={18} color="#7C4DFF" /> Donation Tally
            </Link>
            <Link
              to="/admin/messages"
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', padding: '14px', fontSize: '0.88rem' }}
            >
              <Mail size={18} color="#FC642D" /> Customer Messages
            </Link>
            <Link
              to="/admin/feedback"
              className="btn btn-outline"
              style={{ justifyContent: 'flex-start', padding: '14px', fontSize: '0.88rem' }}
            >
              <MessageSquareQuote size={18} color="#10B981" /> Moderate Reviews
            </Link>
          </div>
        </div>
      </div>

      {/* Row 4: Recent Bookings Table */}
      <div
        className="card-solid"
        style={{
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'white',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Recent Appointment Requests</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Instantly change status to update customer view without page reload.
            </p>
          </div>
          <Link to="/admin/bookings" className="btn btn-outline btn-sm" style={{ gap: '4px' }}>
            View Full List <ArrowRight size={14} />
          </Link>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Pet & Parent</th>
                <th>Service & Tier</th>
                <th>Date / Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <strong style={{ color: 'var(--primary)' }}>#{b.id}</strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{b.petName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.customerName}</div>
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
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: '1px solid var(--border-color)',
                        backgroundColor:
                          b.status === 'Confirmed'
                            ? 'var(--status-confirmed-bg)'
                            : b.status === 'Completed'
                            ? 'var(--status-completed-bg)'
                            : b.status === 'Cancelled'
                            ? 'var(--status-cancelled-bg)'
                            : 'var(--status-pending-bg)',
                        color:
                          b.status === 'Confirmed'
                            ? 'var(--status-confirmed)'
                            : b.status === 'Completed'
                            ? 'var(--status-completed)'
                            : b.status === 'Cancelled'
                            ? 'var(--status-cancelled)'
                            : 'var(--status-pending)',
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
                    <Link
                      to="/admin/bookings"
                      className="btn btn-outline btn-sm"
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
