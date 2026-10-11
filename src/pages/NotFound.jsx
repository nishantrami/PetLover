import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, ArrowLeft, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px'
      }}
    >
      <div style={{ maxWidth: '500px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '2.5rem'
          }}
        >
          🐾
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '14px' }}>
          Oops! This Paw Trail Leads Nowhere
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '28px' }}>
          The page you are looking for might have been moved, renamed, or never existed. Let's guide you back home!
        </p>
        <Link to="/" className="btn btn-primary" style={{ gap: '8px' }}>
          <Home size={16} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
