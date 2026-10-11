import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';
import {
  PawPrint,
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Smile
} from 'lucide-react';

export const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Elena Rostova, DVM',
      role: 'Head Veterinary Director',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
      bio: 'Over 14 years of veterinary medical experience specializing in animal wellness, nutrition, and compassionate geriatric pet care.',
      specialty: 'Internal Medicine & Wellness'
    },
    {
      name: 'Marcus Sterling',
      role: 'Master Certified Groomer & Stylist',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
      bio: 'Award-winning Master Groomer with 10+ years styling show dogs and nervous rescue pets with gentle fear-free techniques.',
      specialty: 'Breed Specific & Creative Styling'
    },
    {
      name: 'Chloe Bennett',
      role: 'Canine Behavioral & Training Lead',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'Certified positive reinforcement specialist dedicated to building confident, joyful, and well-mannered furry companions.',
      specialty: 'Puppy Socialization & Leash Manners'
    },
    {
      name: 'David Vance',
      role: 'Boarding & Hospitality Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Ensuring 24/7 security, personalized dietary care, and loving playtime for every hotel and daycare guest.',
      specialty: 'Pet Safety & Enrichment'
    }
  ];

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #FFF5F5 0%, #F5FAFA 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Our Story & Passion"
            title="Devoted to the Happiness and Health of"
            highlight="Every Furry Family Member"
            subtitle="PetLover was founded on a simple premise: pets are not just animals, they are family members who deserve unconditional love, highest veterinary standards, and luxurious gentle pampering."
          />
        </div>
      </section>

      {/* 2. BRAND STORY & MISSION */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '50px',
              alignItems: 'center'
            }}
          >
            <div>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-xl)',
                  position: 'relative'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80"
                  alt="PetLover founder petting happy golden retriever"
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div>
              <span className="badge badge-pill-secondary" style={{ marginBottom: '14px' }}>
                Est. 2018
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.25 }}>
                Born From A True Passion For Animal Wellbeing
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '18px' }}>
                What began in 2018 as a boutique grooming parlor in California has blossomed into an award-winning pet care sanctuary offering state-of-the-art hydrotherapy spa baths, licensed veterinary exams, luxury suites, and active doggie daycare.
              </p>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px' }}>
                We believe in <strong>fear-free handling</strong>: no harsh restraints, no loud cage dryers, and no rushed appointments. Every pet is greeted by name, calmed with organic botanical mists, and pampered at their own comfortable pace.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#00A699" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>100% Organic Products</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#00A699" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>Fear-Free Certified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#00A699" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>24/7 Veterinary Supervision</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#00A699" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>Climate-Controlled Suites</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <SectionHeader
            badge="Our Guiding Principles"
            title="The Values That Guide Our"
            highlight="Every Touch"
            subtitle="We hold ourselves to the highest ethical and clinical benchmarks in modern pet care."
          />

          <div className="grid grid-cols-3">
            <div className="card-solid" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <Heart size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Unconditional Compassion</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Every dog and cat is treated with the gentle patience, soft speaking, and affectionate warmth we give our own personal pets.
              </p>
            </div>

            <div className="card-solid" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--secondary-light)',
                  color: 'var(--secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Absolute Cleanliness & Safety</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Hospital-grade medical sterilization between each guest, filtered fresh air HVAC systems, and continuous CCTV surveillance.
              </p>
            </div>

            <div className="card-solid" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--accent-purple-light)',
                  color: 'var(--accent-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}
              >
                <Sparkles size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>Artisan Craftsmanship</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Breed-standard hand scissoring, bespoke Asian fusion styling, and luxury coat therapies tailored to your pet’s exact fur texture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEET THE SPECIALISTS */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <SectionHeader
            badge="Our Dedicated Team"
            title="Meet Our Certified"
            highlight="Care Specialists"
            subtitle="Passionate animal lovers with certified training, veterinary medical degrees, and master styling credentials."
          />

          <div className="grid grid-cols-4">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="card-solid card-hoverable"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                />
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      textTransform: 'uppercase',
                      marginBottom: '4px'
                    }}
                  >
                    {member.specialty}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>{member.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 'auto' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section
        style={{
          padding: '60px 0',
          background: 'linear-gradient(135deg, #00A699 0%, #20C2B5 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', marginBottom: '14px' }}>
            Come Tour Our Pet Care Center!
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginBottom: '24px' }}>
            We welcome pet parents to drop in, meet our stylists and veterinary staff, and see our hydrotherapy spa rooms in person.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/booking" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Book an Appointment <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)' }}>
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
