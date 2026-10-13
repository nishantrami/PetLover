import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export const RescueImpactSection = ({ 
  showSecondaryBtn = true, 
  secondaryBtnText = 'Read Our Mission',
  secondaryBtnLink = '/about'
}) => {
  const stats = [
    {
      value: '340+',
      label: 'Stray Animals Rescued & Rehomed',
      colorClass: 'color-coral',
      cardClass: 'card-coral'
    },
    {
      value: '₹15.4L',
      label: 'Medical Aid Funded by Donors',
      colorClass: 'color-mint',
      cardClass: 'card-mint'
    },
    {
      value: '1,500+',
      label: 'Monthly Stray Meals Distributed',
      colorClass: 'color-amber',
      cardClass: 'card-amber'
    },
    {
      value: '0%',
      label: 'Administrative Overhead Fees',
      colorClass: 'color-lavender',
      cardClass: 'card-lavender'
    }
  ];

  return (
    <section className="rescue-impact-section" aria-label="Rescue & Donations Impact">
      <div className="container">
        <div className="rescue-content-grid">
          {/* Left Column: Heading, Badge, Description & CTA */}
          <div className="rescue-text-col">
            <div className="rescue-badge">
              <Heart size={14} className="rescue-badge-icon" fill="#FF7075" color="#FF7075" />
              <span>PETLOVER RESCUE FOUNDATION</span>
            </div>

            <h2 className="rescue-title">
              Help Us Provide Food & Medical Care to Stray Paws
            </h2>

            <p className="rescue-desc">
              100% of community donations go directly toward emergency surgeries,
              winter shelters, vaccination drives, and rescue cat/dog food supplies.
            </p>

            <div className="rescue-actions">
              <Link to="/donate" className="rescue-btn-primary">
                Support a Rescue Pet Today
                <ArrowRight size={18} />
              </Link>
              {showSecondaryBtn && (
                <Link to={secondaryBtnLink} className="rescue-btn-secondary">
                  {secondaryBtnText}
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: 2x2 Metric Cards Grid */}
          <div className="rescue-stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className={`rescue-stat-card ${stat.cardClass}`}>
                <div className={`rescue-stat-number ${stat.colorClass}`}>
                  {stat.value}
                </div>
                <p className="rescue-stat-label">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RescueImpactSection;
