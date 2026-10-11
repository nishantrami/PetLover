import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PawPrint,
  Calendar,
  Sparkles,
  ShieldCheck,
  Heart,
  Star,
  CheckCircle2,
  Camera,
  ArrowRight
} from 'lucide-react';

const PAMPER_EXPERIENCES = [
  {
    id: 'hydro-spa',
    title: 'Hydrotherapy & Organic Bubble Spa',
    tabLabel: '🛁 Hydro Spa',
    lead: 'Tearless organic blueberry facial, warm ozone bubble bath & soothing botanical paw balm.',
    perks: ['Organic Botanicals', 'Gentle Blow-Fluff', 'Zero Cage Drying'],
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=80',
    petName: 'Barnaby (Golden Doodle)',
    serviceLabel: 'Warm Hydro-Massage & Paw Balm',
    activeSuite: 'Suite 2 · Hydro Oasis',
    petType: 'Dog',
    category: 'grooming',
    rating: '5.0 ★'
  },
  {
    id: 'artisan-styling',
    title: 'Master Breed Styling & Scissoring',
    tabLabel: '✂️ Breed Styling',
    lead: 'Certified breed contour trim, hygienic pad care, soothing de-shedding & silky coat conditioning.',
    perks: ['Breed Precision Cuts', 'Silk Protein Spritz', 'Stress-Free Handling'],
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
    petName: 'Milo (Beagle)',
    serviceLabel: 'Precision Contour Trim & De-Shed',
    activeSuite: 'Suite 1 · Master Styling',
    petType: 'Dog',
    category: 'grooming',
    rating: '4.9 ★'
  },
  {
    id: 'cat-zen',
    title: 'Feline Zen Sanctuary & Gentle Spa',
    tabLabel: '🐱 Cat Zen Haven',
    lead: 'A dog-free, quiet oasis with calming lavender pheromones, low-noise brushes & warm herbal wipes.',
    perks: ['100% Dog-Free Zone', 'Ultra-Quiet Care', 'Feliway™ Calming Mist'],
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80',
    petName: 'Luna (British Shorthair)',
    serviceLabel: 'Low-Stress Brush & Herbal Wipe',
    activeSuite: 'Feline Sanctuary Floor',
    petType: 'Cat',
    category: 'grooming',
    rating: '5.0 ★'
  },
  {
    id: 'luxury-hotel',
    title: 'Five-Star Climate Suites & Day Resort',
    tabLabel: '🏨 Luxury Suites',
    lead: 'Spacious soundproof suites with orthopedic memory foam beds, live HD webcams & private play.',
    perks: ['24/7 Live Webcams', 'Gourmet Meals Served', 'Indoor Play Arena'],
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1000&q=80',
    petName: 'Cooper (French Bulldog)',
    serviceLabel: 'Penthouse Suite & Play Time',
    activeSuite: 'Executive Garden Suite',
    petType: 'Dog',
    category: 'boarding',
    rating: '4.9 ★'
  },
  {
    id: 'wellness-check',
    title: 'Snout-to-Tail Veterinary Wellness Exam',
    tabLabel: '🩺 Vet Wellness',
    lead: 'Comprehensive physical examination, dental checkup, vital metrics & nutritional health counsel.',
    perks: ['Fear-Free™ Exam Method', 'Digital Health Record', 'Licensed Vet Nurses'],
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1000&q=80',
    petName: 'Bella (Golden Pup)',
    serviceLabel: 'Comprehensive Wellness Check',
    activeSuite: 'Wellness Clinic Room 3',
    petType: 'Dog',
    category: 'health',
    rating: '5.0 ★'
  }
];

export const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(PAMPER_EXPERIENCES[0]);
  const navigate = useNavigate();

  const handleBookSelected = (experience) => {
    navigate('/booking', {
      state: {
        defaultPetType: experience.petType,
        defaultCategory: experience.category
      }
    });
  };

  return (
    <section className="pet-hero-section">
      {/* Soft Ambient Background Blobs */}
      <div className="pet-hero-bg-blob pet-hero-bg-blob-1" />
      <div className="pet-hero-bg-blob pet-hero-bg-blob-2" />

      <div className="container">
        <div className="pet-hero-grid">
          {/* LEFT COLUMN: Emotional Story, Interactive Experience Hub & CTAs */}
          <div>
            {/* Live Sanctuary Status Eyebrow */}
            <div className="pet-hero-eyebrow">
              <span className="live-pulse-dot" />
              <span>Accepting New Furry VIPs Today</span>
              <span style={{ color: 'var(--border-hover)' }}>•</span>
              <span style={{ color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={14} /> 100% Fear-Free Certified
              </span>
            </div>

            {/* Headline */}
            <h1 className="pet-hero-title">
              Pamper Your Best Friend With{' '}
              <span className="pet-hero-gradient-text">Five-Star Royal Care</span> & Pure Love
            </h1>

            {/* Subtitle */}
            <p className="pet-hero-lead">
              From stress-free organic hydro-baths and master breed styling to soothing lavender aromatherapy and luxury climate suites — we treat your furry family member with tender, unconditional devotion.
            </p>

            {/* Interactive Pamper Experience Explorer (Custom Pet Care Hub) */}
            <div className="pet-hero-explorer">
              <div className="pet-hero-explorer-header">
                <div className="pet-hero-explorer-title">
                  <PawPrint size={16} /> Explore Pampered Treatments
                </div>
                <div className="pet-hero-explorer-badge">
                  {activeTab.rating} Verified
                </div>
              </div>

              {/* Treatment Category Tabs */}
              <div className="pet-hero-tabs" role="tablist">
                {PAMPER_EXPERIENCES.map((exp) => (
                  <button
                    key={exp.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab.id === exp.id}
                    className={`pet-hero-tab-btn ${activeTab.id === exp.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(exp)}
                  >
                    {exp.tabLabel}
                  </button>
                ))}
              </div>

              {/* Active Treatment Card Detail */}
              <div className="pet-hero-tab-content">
                <div className="pet-hero-treatment-info">
                  <h4>{activeTab.title}</h4>
                  <p>{activeTab.lead}</p>
                  <div className="pet-hero-treatment-perks">
                    {activeTab.perks.map((perk, idx) => (
                      <span key={idx} className="pet-hero-perk-item">
                        <CheckCircle2 size={13} color="#059669" /> {perk}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="pet-hero-book-tab-btn"
                  onClick={() => handleBookSelected(activeTab)}
                  title={`Book ${activeTab.title}`}
                >
                  <Calendar size={15} /> Book This <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Main Action Hub */}
            <div className="pet-hero-actions">
              <Link to="/booking" className="pet-hero-primary-btn">
                <PawPrint size={20} /> Schedule VIP Pampering
              </Link>

              <Link to="/services" className="pet-hero-secondary-btn">
                <Sparkles size={18} color="var(--primary)" /> View Full Menu
              </Link>
            </div>

            {/* Pet Parent Social Proof Reel */}
            <div className="pet-hero-social-proof">
              <div className="pet-hero-avatar-stack">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Pet parent Maya"
                  className="pet-hero-avatar-item"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Pet parent David"
                  className="pet-hero-avatar-item"
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Pet parent Sarah"
                  className="pet-hero-avatar-item"
                />
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                  alt="Pet parent Alex"
                  className="pet-hero-avatar-item"
                />
              </div>

              <div>
                <div className="pet-hero-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)', marginLeft: '4px' }}>4.9/5</span>
                </div>
                <div className="pet-hero-proof-text">
                  Loved by 5,200+ Fur Families
                  <span className="pet-hero-proof-sub"> • Over 1,400 5-Star Reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Layered Dynamic Visual Showcase */}
          <div className="pet-hero-stage">
            {/* Ambient Backlight Glow */}
            <div className="pet-hero-stage-glow" />

            {/* Floating Top Left: Live Sanctuary Spaw Status */}
            <div className="pet-hero-float-card-top animate-float">
              <div className="pet-hero-tracker-icon">
                <PawPrint size={22} />
              </div>
              <div>
                <div className="pet-hero-tracker-badge">
                  <span className="live-pulse-dot" style={{ width: '7px', height: '7px' }} />
                  {activeTab.activeSuite}
                </div>
                <div className="pet-hero-tracker-name">{activeTab.petName}</div>
                <div className="pet-hero-tracker-status">Relaxing & Tail Wagging • 100% Calm</div>
              </div>
            </div>

            {/* Floating Top Right: Organic Botanical Seal */}
            <div className="pet-hero-seal-badge">
              <Sparkles size={14} /> 100% Organic Botanicals
            </div>

            {/* Main Stage Pet Photo Frame with Asymmetric Luxury Curves */}
            <div className="pet-hero-image-wrapper">
              <img
                src={activeTab.image}
                alt={activeTab.title}
                key={activeTab.id}
                className="pet-hero-main-img"
              />
            </div>

            {/* Floating Bottom Right: Verified Parent Love Quote */}
            <div className="pet-hero-float-card-bottom">
              <div className="pet-hero-quote-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <div className="pet-hero-quote-text">
                "My rescue dog used to tremble at ordinary salons. At PetLover, he fell asleep in their arms during his spa bath!"
              </div>
              <div className="pet-hero-quote-author">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                  alt="Emily & Milo"
                  className="pet-hero-quote-avatar"
                />
                <div>
                  <div className="pet-hero-quote-name">Emily K. & Barnaby 🐕</div>
                  <div className="pet-hero-quote-tag">✓ Verified Pet Parent</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: 4-Pillar Sanctuary Trust Matrix */}
        <div className="pet-hero-trust-bar">
          <div className="pet-hero-trust-item">
            <div className="pet-hero-trust-icon-box" style={{ backgroundColor: '#FFEAEA', color: '#FF5A5F' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="pet-hero-trust-num">Fear-Free™ Certified</div>
              <div className="pet-hero-trust-label">Zero caging, positive reinforcement</div>
            </div>
          </div>

          <div className="pet-hero-trust-item">
            <div className="pet-hero-trust-icon-box" style={{ backgroundColor: '#E6F8F6', color: '#00A699' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div className="pet-hero-trust-num">100% Tear-Free</div>
              <div className="pet-hero-trust-label">Pure organic botanical grooming</div>
            </div>
          </div>

          <div className="pet-hero-trust-item">
            <div className="pet-hero-trust-icon-box" style={{ backgroundColor: '#EDE9FE', color: '#7C3AED' }}>
              <Camera size={22} />
            </div>
            <div>
              <div className="pet-hero-trust-num">Live HD Webcams</div>
              <div className="pet-hero-trust-label">Check in on your baby anytime</div>
            </div>
          </div>

          <div className="pet-hero-trust-item">
            <div className="pet-hero-trust-icon-box" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <Heart size={22} />
            </div>
            <div>
              <div className="pet-hero-trust-num">Licensed Vet Team</div>
              <div className="pet-hero-trust-label">24/7 on-call medical supervision</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
