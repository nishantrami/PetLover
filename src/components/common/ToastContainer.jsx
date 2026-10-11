import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (!notifications.length) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={22} className="text-emerald-500" style={{ color: '#10B981', flexShrink: 0 }} />;
      case 'error':
        return <AlertCircle size={22} style={{ color: '#EF4444', flexShrink: 0 }} />;
      case 'warning':
        return <AlertTriangle size={22} style={{ color: '#F59E0B', flexShrink: 0 }} />;
      default:
        return <Info size={22} style={{ color: '#3B82F6', flexShrink: 0 }} />;
    }
  };

  return (
    <div className="toast-container" role="region" aria-live="polite">
      {notifications.map((n) => (
        <div key={n.id} className={`toast-item ${n.type}`}>
          {getIcon(n.type)}
          <div style={{ flex: 1 }}>
            {n.title && (
              <h5 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '2px', color: '#1E293B' }}>
                {n.title}
              </h5>
            )}
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.4, margin: 0 }}>
              {n.message}
            </p>
          </div>
          <button
            onClick={() => removeNotification(n.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
