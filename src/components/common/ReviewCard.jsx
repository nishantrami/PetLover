import React from 'react';
import { Star, Quote } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  return (
    <div
      className="card-solid card-hoverable"
      style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          color: 'rgba(255, 90, 95, 0.15)'
        }}
      >
        <Quote size={40} />
      </div>

      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < (review.rating || 5) ? '#FBBF24' : '#E2E8F0'}
            color={i < (review.rating || 5) ? '#FBBF24' : '#E2E8F0'}
          />
        ))}
      </div>

      <p
        style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '20px',
          flex: 1,
          fontStyle: 'italic'
        }}
      >
        "{review.message}"
      </p>

      {review.service && (
        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: 'var(--bg-alt)',
              color: 'var(--primary)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            {review.service}
          </span>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '16px'
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF5A5F, #00A699)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1rem',
            flexShrink: 0
          }}
        >
          {review.name ? review.name.charAt(0).toUpperCase() : 'P'}
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {review.name}
          </h4>
          {review.petName && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Pet: {review.petName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
