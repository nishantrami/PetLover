import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Star, Check, ArrowRight, Sparkles, Heart } from 'lucide-react';
import Modal from './Modal';

export const ServiceCard = ({ service }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate('/booking', { state: { selectedServiceId: service.id, serviceName: service.title } });
  };

  return (
    <>
      <div
        className="card-solid card-hoverable"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer'
        }}
        onClick={() => setShowDetailModal(true)}
      >
        {/* Service Image */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img
            src={service.image}
            alt={service.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
            className="service-card-img"
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              display: 'flex',
              gap: '6px'
            }}
          >
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: 'var(--text-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backdropFilter: 'blur(6px)'
              }}
            >
              {service.categoryName || service.category}
            </span>
            {service.isFeatured && (
              <span
                style={{
                  background: 'linear-gradient(135deg, #FF5A5F 0%, #FF767B 100%)',
                  color: 'white',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={11} /> Featured
              </span>
            )}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Clock size={13} />
            {service.duration}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={16} fill="#FBBF24" color="#FBBF24" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{service.rating || '5.0'}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                ({service.reviewsCount || 45})
              </span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              ₹{Number(service.price).toLocaleString('en-IN')}
            </div>
          </div>

          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              marginBottom: '10px',
              color: 'var(--text-primary)',
              lineHeight: 1.35
            }}
          >
            {service.title}
          </h3>

          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '16px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {service.description}
          </p>

          {/* Key Feature highlights */}
          {service.features && service.features.length > 0 && (
            <div style={{ marginTop: 'auto', marginBottom: '18px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {service.features.slice(0, 2).map((feat, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '4px'
                    }}
                  >
                    <Check size={14} color="#10B981" style={{ flexShrink: 0 }} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ flex: 1, padding: '9px 12px', fontSize: '0.85rem' }}
              onClick={(e) => {
                e.stopPropagation();
                setShowDetailModal(true);
              }}
            >
              Details
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ flex: 1.4, padding: '9px 14px', fontSize: '0.85rem' }}
              onClick={handleBookNow}
            >
              Book Now <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={service.title}
        subtitle={`${service.categoryName || service.category} • ${service.duration}`}
        size="lg"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <img
              src={service.image}
              alt={service.title}
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Price per pet:</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ₹{Number(service.price).toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Duration:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {service.duration}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>About This Service</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {service.description}
            </p>

            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>What's Included:</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
              {service.features &&
                service.features.map((feat, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.88rem',
                      color: 'var(--text-primary)',
                      marginBottom: '8px'
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#D1FAE5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Check size={12} color="#10B981" />
                    </div>
                    {feat}
                  </li>
                ))}
            </ul>

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={(e) => {
                setShowDetailModal(false);
                handleBookNow(e);
              }}
            >
              Book This Service Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ServiceCard;
