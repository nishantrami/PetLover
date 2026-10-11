import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  MessageSquareQuote,
  Star,
  Search,
  Trash2,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminFeedback = () => {
  const {
    feedback,
    toggleFeedbackApproval,
    toggleFeedbackFeatured,
    deleteFeedbackData
  } = useData();

  const [filterRating, setFilterRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  const filteredFeedback = feedback.filter((f) => {
    const matchStar = filterRating === 0 || f.rating === filterRating;
    const matchSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.service && f.service.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStar && matchSearch;
  });

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
            Customer Reviews & Feedback
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px', margin: 0 }}>
            Moderate customer testimonials, feature top ratings on the homepage, and inspect sentiment.
          </p>
        </div>

        <div className="input-icon-wrapper" style={{ width: '280px' }}>
          <Search size={16} className="icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px 8px 38px', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setFilterRating(0)}
          className={`btn btn-sm ${filterRating === 0 ? 'btn-primary' : 'btn-outline'}`}
        >
          All Ratings ({feedback.length})
        </button>
        {[5, 4, 3, 2, 1].map((star) => {
          const count = feedback.filter((f) => f.rating === star).length;
          return (
            <button
              key={star}
              type="button"
              onClick={() => setFilterRating(star)}
              className={`btn btn-sm ${filterRating === star ? 'btn-primary' : 'btn-outline'}`}
            >
              {star} Stars ({count})
            </button>
          );
        })}
      </div>

      {/* Reviews Table */}
      <div
        className="card-solid"
        style={{
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'white',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer & Pet</th>
                <th>Service Rated</th>
                <th>Star Rating</th>
                <th>Feedback Review</th>
                <th>Date</th>
                <th>Public Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedback.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '36px' }}>
                    <div style={{ color: 'var(--text-muted)' }}>No feedback found matching the filter.</div>
                  </td>
                </tr>
              ) : (
                filteredFeedback.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.petName || 'Pet'}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600 }}>
                        {item.service || 'General Service'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < (item.rating || 5) ? '#FBBF24' : '#CBD5E1'}
                            color={i < (item.rating || 5) ? '#FBBF24' : '#CBD5E1'}
                          />
                        ))}
                      </div>
                    </td>
                    <td style={{ maxWidth: '300px' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.message}>
                        "{item.message}"
                      </p>
                    </td>
                    <td>{item.date || 'Oct 2026'}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => toggleFeedbackApproval(item.id)}
                        className={`btn btn-sm ${item.isApproved ? 'status-completed' : 'status-cancelled'}`}
                        style={{ padding: '3px 8px', fontSize: '0.78rem', border: 'none' }}
                      >
                        {item.isApproved ? 'Approved' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => toggleFeedbackFeatured(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: item.isFeatured ? '#FF5A5F' : '#CBD5E1'
                        }}
                        title={item.isFeatured ? 'Featured on homepage' : 'Not featured'}
                      >
                        <Sparkles size={18} fill={item.isFeatured ? '#FF5A5F' : 'none'} />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-icon"
                        style={{ width: '30px', height: '30px', backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' }}
                        onClick={() => {
                          setFeedbackToDelete(item);
                          setDeleteModalOpen(true);
                        }}
                        title="Delete Feedback"
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

      {/* Delete Feedback Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (feedbackToDelete) {
            deleteFeedbackData(feedbackToDelete.id);
          }
        }}
        title="Delete Customer Feedback"
        message={`Are you sure you want to permanently delete the review from ${feedbackToDelete?.name}?`}
        confirmText="Delete Review"
      />
    </div>
  );
};

export default AdminFeedback;
