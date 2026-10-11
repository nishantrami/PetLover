import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SectionHeader from '../components/common/SectionHeader';
import ServiceCard from '../components/common/ServiceCard';
import PackageCard from '../components/common/PackageCard';
import ReviewCard from '../components/common/ReviewCard';
import HeroSection from '../components/common/HeroSection';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  ArrowRight,
  Home as HomeIcon
} from 'lucide-react';

export const Home = () => {
  const { services, packages, feedback, categories } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtered services
  const displayedServices =
    selectedCategory === 'all'
      ? services.slice(0, 6)
      : services.filter((s) => s.category === selectedCategory);

  const featuredReviews = feedback.filter((f) => f.isApproved).slice(0, 3);

  return (
    <div>
      {/* 1. HERO SECTION (BESPOKE LUXURY PET CARE & WELLNESS SANCTUARY) */}
      <HeroSection />

      {/* 2. WHY CHOOSE PETLOVER (CORE PILLARS) */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <SectionHeader
            badge="The PetLover Difference"
            title="Why Loving Pet Parents"
            highlight="Trust PetLover"
            subtitle="We blend master grooming artistry with clinical veterinary standards to ensure your pet is relaxed, clean, and healthy."
          />

          <div className="grid grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: 'Certified Specialists',
                desc: 'Every stylist and handler holds certified credentials in pet CPR, breed trimming, and animal psychology.',
                color: '#FF5A5F',
                bg: '#FFEAEA'
              },
              {
                icon: Sparkles,
                title: '100% Organic Products',
                desc: 'Hypoallergenic, tear-free botanical shampoos, conditioner sprays, and soothing paw balms.',
                color: '#00A699',
                bg: '#E6F6F5'
              },
              {
                icon: HomeIcon,
                title: 'Luxury Climate Suites',
                desc: 'Ultra-clean, quiet private rooms with soothing music, orthopedic beds, and 24/7 webcams.',
                color: '#7C4DFF',
                bg: '#F0EBFF'
              },
              {
                icon: Heart,
                title: 'Fear-Free Philosophy',
                desc: 'Zero cage drying, positive reinforcement treats, gentle handling, and individualized calming breaks.',
                color: '#FC642D',
                bg: '#FFF0EA'
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="card-solid card-hoverable"
                style={{
                  padding: '30px 24px',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '18px',
                    backgroundColor: card.bg,
                    color: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px'
                  }}
                >
                  <card.icon size={30} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px' }}>{card.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES CATALOG */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <SectionHeader
            badge="Tailored Treatments"
            title="Popular Pet Care"
            highlight="Services"
            subtitle="Choose from full spa makeovers, daily dog walks, behavioral coaching, or luxury hotel boarding."
          />

          {/* Category Pill Filters */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '40px'
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              All Services
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`btn btn-sm ${selectedCategory === cat.slug ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-3">
            {displayedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="btn btn-outline" style={{ padding: '12px 28px' }}>
              View All {services.length} Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GROOMING PACKAGES COMPARISON */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <SectionHeader
            badge="Transparent Packages"
            title="Complete Grooming & Spa"
            highlight="Packages"
            subtitle="Designed for every fur coat type and lifestyle. No hidden fees, ever."
          />

          <div className="grid grid-cols-3" style={{ alignItems: 'stretch' }}>
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. PET CARE JOURNEY STEPS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="container">
          <SectionHeader
            badge="Effortless Experience"
            title="The 4-Step Happy"
            highlight="Pet Journey"
            subtitle="We make scheduling and pampering your pet completely seamless and joyful."
          />

          <div className="grid grid-cols-4">
            {[
              {
                step: '01',
                title: 'Select Service & Time',
                desc: 'Choose your desired service, grooming package, and preferred convenient date & time slot.'
              },
              {
                step: '02',
                title: 'VIP Arrival & Check-In',
                desc: 'Bring your pet to our cozy reception or schedule our temperature-controlled pet taxi.'
              },
              {
                step: '03',
                title: 'Custom Spa Treatment',
                desc: 'Our certified groomers provide organic baths, haircuts, ear care, dental and paw wellness.'
              },
              {
                step: '04',
                title: 'Fluffy & Happy Reunion',
                desc: 'Pick up your freshly styled, smelling heavenly, energized pet ready for hugs!'
              }
            ].map((st, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'white',
                  padding: '30px 24px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    color: 'rgba(255, 90, 95, 0.2)',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {st.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>{st.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS WALL */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <SectionHeader
            badge="Client Love"
            title="What Pet Parents Say About"
            highlight="PetLover"
            subtitle="Hear real stories from pet owners who trust us with their beloved dogs, cats, and small animals."
          />

          <div className="grid grid-cols-3">
            {featuredReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/feedback" className="btn btn-outline">
              Share Your Own Review <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. RESCUE & DONATIONS CALLOUT BANNER */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1E2229 0%, #2D3436 100%)', color: 'white' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            <div>
              <span
                className="badge"
                style={{ backgroundColor: 'rgba(255, 90, 95, 0.2)', color: '#FF767B', border: '1px solid rgba(255, 90, 95, 0.4)', marginBottom: '16px' }}
              >
                <Heart size={13} fill="#FF767B" /> PetLover Rescue Foundation
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
                Help Us Provide Food & Medical Care to Stray Paws
              </h2>
              <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '28px' }}>
                100% of community donations go directly toward emergency surgeries, winter shelters, vaccination drives, and rescue cat/dog food supplies.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/donate" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                  Support a Rescue Pet Today <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn btn-outline" style={{ color: 'white', borderColor: '#475569' }}>
                  Read Our Mission
                </Link>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#272C35', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid #3E4654' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)' }}>340+</div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Stray Animals Rescued & Rehomed</div>
              </div>
              <div style={{ backgroundColor: '#272C35', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid #3E4654' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--secondary)' }}>₹15.4L</div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Medical Aid Funded by Donors</div>
              </div>
              <div style={{ backgroundColor: '#272C35', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid #3E4654' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFD166' }}>1,500+</div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Monthly Stray Meals Distributed</div>
              </div>
              <div style={{ backgroundColor: '#272C35', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid #3E4654' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#A78BFA' }}>0%</div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Administrative Overhead Fees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUICK FINAL CTA BANNER */}
      <section
        style={{
          padding: '70px 0',
          background: 'linear-gradient(135deg, #FF5A5F 0%, #FC642D 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '750px' }}>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
            Ready to Treat Your Pet to the Ultimate Pampering?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginBottom: '28px' }}>
            Book online in less than 2 minutes. Choose your service, select a convenient date, and let our loving team do the rest!
          </p>
          <Link
            to="/booking"
            className="btn btn-lg"
            style={{
              backgroundColor: 'white',
              color: 'var(--primary)',
              fontWeight: 800,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
            }}
          >
            Schedule Your Appointment Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
