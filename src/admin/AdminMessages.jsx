import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  Phone,
  User,
  MessageSquare
} from 'lucide-react';

export const AdminMessages = () => {
  const { messages, toggleMessageRead, deleteMessageData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [msgToDelete, setMsgToDelete] = useState(null);

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openMessageModal = (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      toggleMessageRead(msg.id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Customer Contact Messages
          </h1>
          <p className="admin-page-subtitle">
            Inquiries received from the public Contact page form.
          </p>
        </div>

        <div className="input-icon-wrapper admin-search-wrapper">
          <Search size={16} className="icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px 8px 38px', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Sender</th>
                <th>Subject</th>
                <th>Message Snippet</th>
                <th>Received</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '36px' }}>
                    <div style={{ color: 'var(--text-muted)' }}>No messages found.</div>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    style={{
                      backgroundColor: msg.isRead ? 'transparent' : 'rgba(255, 90, 95, 0.04)',
                      fontWeight: msg.isRead ? 'normal' : '600'
                    }}
                  >
                    <td>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: msg.isRead ? '#CBD5E1' : '#FF5A5F'
                        }}
                        title={msg.isRead ? 'Read' : 'Unread'}
                      />
                    </td>
                    <td>
                      <div>{msg.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{msg.email}</div>
                    </td>
                    <td>
                      <strong>{msg.subject}</strong>
                    </td>
                    <td style={{ maxWidth: '320px' }}>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {msg.message}
                      </p>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Today'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          onClick={() => openMessageModal(msg)}
                          title="Read full message"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-icon"
                          style={{ width: '32px', height: '32px', backgroundColor: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' }}
                          onClick={() => {
                            setMsgToDelete(msg);
                            setDeleteModalOpen(true);
                          }}
                          title="Delete message"
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

      {/* Message Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={selectedMessage?.subject || 'Contact Inquiry'}
        size="md"
      >
        {selectedMessage && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong style={{ fontSize: '1rem' }}>{selectedMessage.name}</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'Recent'}
                </span>
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Email: <a href={`mailto:${selectedMessage.email}`} style={{ color: 'var(--primary)' }}>{selectedMessage.email}</a>
              </div>
              {selectedMessage.phone && (
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Phone: {selectedMessage.phone}
                </div>
              )}
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Message Content:
              </h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
                {selectedMessage.message}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="btn btn-primary btn-sm"
              >
                Reply via Email
              </a>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelectedMessage(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Message Confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (msgToDelete) {
            deleteMessageData(msgToDelete.id);
          }
        }}
        title="Delete Contact Message"
        message="Are you sure you want to remove this customer inquiry?"
        confirmText="Delete Message"
      />
    </div>
  );
};

export default AdminMessages;
