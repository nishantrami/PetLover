import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SectionHeader from '../components/common/SectionHeader';
import PackageCard from '../components/common/PackageCard';
import {
  Scissors,
  Sparkles,
  Heart,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Droplets,
  Wind,
  Smile,
  ShieldCheck
} from 'lucide-react';

export const Grooming = () => {
  const { packages } = useData();

  const spaSteps = [
    {
      num: '01',
      title: 'Coat Assessment & Brushing',
      desc: 'Our master stylist inspects coat health, skin condition, and gently brushes out tangles and loose undercoat.',
      icon: Scissors
    },
    {
      num: '02',
      title: 'Warm Hydro-Massage Bath',
      desc: 'Infused with organic botanical lavender & oatmeal shampoos to soothe skin, lift dirt, and restore fur luster.',
      icon: Droplets
    },
    {
      num: '03',
      title: 'Gentle Low-Noise Fluff Dry',
      desc: 'No hot cage dryers. Hand-held temperature-controlled blowers fluff and straighten the coat safely.',
      icon: Wind
    },
    {
      num: '04',
      title: 'Precision Scissor & Breed Style',
      desc: 'Hand-scissored breed cuts, teddy bear faces, sanitary trims, and neat paw rounding according to your preference.',
      icon: Sparkles
    },
    {
      num: '05',
      title: 'Pawdicure, Ears & Fresh Breath',
      desc: 'Claw clipping & filing, gentle ear cleansing, herbal paw balm, and fresh mint dental breath spray.',
      icon: Smile
    }
  ];

  const addOnTreatments = [
    {
      title: 'Blueberry Facial Scrub',
      price: '₹299',
      desc: 'Natural antioxidant scrub that cleanses tear stains, brightens face fur, and smells delicious.'
    },
    {
      title: 'Soothing Paw Pad Butter Balm',
      price: '₹249',
      desc: 'Organic shea butter and coconut oil balm to heal dry, cracked, or rough paw pads.'
    },
    {
      title: 'Dead Sea Mineral Mud Mask',
      price: '₹449',
      desc: 'Mineral-rich mud therapy that detoxifies skin, reduces shedding, and relieves allergic itching.'
    },
    {
      title: 'Herbal Flea & Tick Botanical Dip',
      price: '₹349',
      desc: 'Cedarwood and rosemary natural repellent soak safe for puppies and sensitive cats.'
    }
  ];

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFFDF9 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Artisan Pet Grooming"
            title="The Ultimate Luxury Spa & Styling"
            highlight="Sanctuary"
            subtitle="Treat your best friend to an organic hydrotherapy bath, master breed haircut, and soothing aromatherapy pampering."
          />
          <div style={{ textAlign: 'center' }}>
            <Link to="/booking" className="btn btn-primary btn-lg" style={{ gap: '10px' }}>
              <Calendar size={18} /> Schedule Grooming Session
            </Link>
          </div>
        </div>
      </section>

      {/* Spa Steps Journey */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <SectionHeader
            badge="The Spa Journey"
            title="Our 5-Stage Gentle Pampering"
            highlight="Ritual"
            subtitle="Every step is performed with calming patience, certified fear-free techniques, and organic botanicals."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '20px'
            }}
          >
            {spaSteps.map((step, idx) => (
              <div
                key={idx}
                className="card-solid"
                style={{
                  padding: '24px 20px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderTop: '4px solid var(--primary)'
                }}
              >
                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: 'var(--primary)',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Comparison */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <SectionHeader
            badge="Grooming Packages"
            title="Choose The Perfect"
            highlight="Care Tier"
            subtitle="Clear pricing for dogs and cats of all sizes with zero surprise charges."
          />

          <div className="grid grid-cols-3" style={{ alignItems: 'stretch' }}>
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Spa Add-On Treatments */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <SectionHeader
            badge="Extra Pampering"
            title="Luxury Spa"
            highlight="Add-On Treatments"
            subtitle="Elevate your pet’s appointment with tailored botanical boosters."
          />

          <div className="grid grid-cols-4">
            {addOnTreatments.map((addon, idx) => (
              <div
                key={idx}
                className="card-solid card-hoverable"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{addon.title}</h3>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{addon.price}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {addon.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section
        style={{
          padding: '70px 0',
          background: 'linear-gradient(135deg, #7C4DFF 0%, #FF5A5F 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
            Give Your Pet The Royal Spa Treatment Today
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginBottom: '28px' }}>
            Appointments fill up fast! Reserve your spot online with our licensed master groomers in seconds.
          </p>
          <Link
            to="/booking"
            className="btn btn-lg"
            style={{
              backgroundColor: 'white',
              color: '#7C4DFF',
              fontWeight: 800,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
            }}
          >
            Book Grooming Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Grooming;
