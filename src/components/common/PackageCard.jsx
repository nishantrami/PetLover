import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

export const PackageCard = ({ pkg }) => {
  const navigate = useNavigate();

  const handleBookPackage = () => {
    navigate('/booking', { state: { selectedPackageId: pkg.id, packageName: pkg.name } });
  };

  return (
    <div
      className="card-solid"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        border: pkg.isPopular ? '2px solid var(--primary)' : '1px solid var(--border-color)',
        boxShadow: pkg.isPopular ? '0 10px 30px rgba(255, 90, 95, 0.15)' : 'var(--shadow-sm)',
        background: 'var(--bg-card)',
        padding: '32px 28px',
        transform: pkg.isPopular ? 'scale(1.03)' : 'none',
        zIndex: pkg.isPopular ? 2 : 1,
        transition: 'var(--transition)'
      }}
    >
      {pkg.isPopular && (
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #FF5A5F 0%, #FC642D 100%)',
            color: 'white',
            padding: '4px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            boxShadow: '0 4px 12px rgba(255, 90, 95, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap'
          }}
        >
          <Sparkles size={13} /> {pkg.badge || 'MOST POPULAR'}
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: pkg.color || 'var(--primary)',
            letterSpacing: '1px'
          }}
        >
          {pkg.tier}
        </span>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '6px', marginBottom: '8px' }}>
          {pkg.name}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', minHeight: '40px' }}>
          {pkg.description}
        </p>

        {/* Pricing */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-secondary)' }}>₹</span>
          <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
            {Number(pkg.price).toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            /{pkg.billingPeriod || 'session'}
          </span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px', marginBottom: '28px', flex: 1 }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '0.5px' }}>
          Included Treatments:
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {pkg.features.map((feat, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem',
                color: feat.included ? 'var(--text-primary)' : 'var(--text-muted)',
                marginBottom: '12px',
                textDecoration: feat.included ? 'none' : 'line-through',
                opacity: feat.included ? 1 : 0.6
              }}
            >
              {feat.included ? (
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#D1FAE5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Check size={11} color="#10B981" />
                </div>
              ) : (
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <X size={11} color="#EF4444" />
                </div>
              )}
              <span>{feat.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-outline'}`}
        style={{ width: '100%', padding: '13px', fontSize: '0.95rem' }}
        onClick={handleBookPackage}
      >
        Choose {pkg.name} <ArrowRight size={15} />
      </button>
    </div>
  );
};

export default PackageCard;
