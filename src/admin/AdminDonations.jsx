import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  HeartHandshake,
  Search,
  Trash2,
  IndianRupee,
  Heart,
  TrendingUp,
  Download,
  CheckCircle2
} from 'lucide-react';

export const AdminDonations = () => {
  const { donations, deleteDonationData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);

  const totalAmount = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  const filteredDonations = donations.filter(
    (d) =>
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.message && d.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      {/* Top Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Rescue Donations Ledger
          </h1>
          <p className="admin-page-subtitle">
            All community contributions recorded for animal welfare and medical surgeries.
          </p>
        </div>

        {/* Search */}
        <div className="input-icon-wrapper admin-search-wrapper">
          <Search size={16} className="icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search donors or causes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px 8px 38px', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3" style={{ marginBottom: '28px' }}>
        <div className="card-solid" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #1E2229 0%, #2D3436 100%)', color: 'white' }}>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
            Total Funds Raised
          </span>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFD166', marginTop: '4px' }}>
            ₹{totalAmount.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '6px' }}>
            Across {donations.length} demonstration gifts
          </div>
        </div>

        <div className="card-solid" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Average Contribution
          </span>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--primary)', marginTop: '4px' }}>
            ₹{donations.length > 0 ? Math.round(totalAmount / donations.length).toLocaleString('en-IN') : 0}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Per individual supporter
          </div>
        </div>

        <div className="card-solid" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Top Designated Cause
          </span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '10px' }}>
            Emergency Medical & Surgery Fund
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Highest allocation by donors
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Amount (₹ INR)</th>
                <th>Designated Cause</th>
                <th>Heartfelt Message</th>
                <th>Date Recorded</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '36px' }}>
                    <div style={{ color: 'var(--text-muted)' }}>No donation records found.</div>
                  </td>
                </tr>
              ) : (
                filteredDonations.map((don) => (
                  <tr key={don.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{don.donorName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{don.email || 'Anonymous'}</div>
                    </td>
                    <td>
                      <strong style={{ fontSize: '1.15rem', color: 'var(--primary)' }}>
                        ₹{Number(don.amount).toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td>
                      <span
                        style={{
                          backgroundColor: 'var(--secondary-light)',
                          color: 'var(--secondary)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        {don.cause}
                      </span>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                        "{don.message || 'Support for rescue pets'}"
                      </p>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {don.createdAt ? new Date(don.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-icon"
                        style={{ width: '30px', height: '30px', backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' }}
                        onClick={() => {
                          setDonationToDelete(don);
                          setDeleteModalOpen(true);
                        }}
                        title="Delete record"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (donationToDelete) {
            deleteDonationData(donationToDelete.id);
          }
        }}
        title="Delete Donation Record"
        message={`Are you sure you want to remove the donation record from ${donationToDelete?.donorName}?`}
        confirmText="Delete Record"
      />
    </div>
  );
};

export default AdminDonations;
