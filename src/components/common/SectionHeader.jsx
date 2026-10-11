import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const SectionHeader = ({
  badge = '',
  title = '',
  highlight = '',
  subtitle = '',
  align = 'center',
  light = false
}) => {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? '720px' : '100%',
        margin: align === 'center' ? '0 auto 48px' : '0 0 36px'
      }}
    >
      {badge && (
        <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
          <span
            className={light ? 'badge' : 'badge badge-pill-primary'}
            style={
              light
                ? {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFF',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }
                : {}
            }
          >
            <Sparkles size={13} />
            {badge}
          </span>
        </div>
      )}

      <h2
        style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800,
          color: light ? '#FFFFFF' : 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: subtitle ? '14px' : '0'
        }}
      >
        {title}{' '}
        {highlight && (
          <span
            style={{
              background: light
                ? 'linear-gradient(135deg, #FFD166 0%, #FF8A65 100%)'
                : 'linear-gradient(135deg, #FF5A5F 0%, #FC642D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline'
            }}
          >
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          style={{
            fontSize: '1.05rem',
            color: light ? 'rgba(255, 255, 255, 0.82)' : 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
