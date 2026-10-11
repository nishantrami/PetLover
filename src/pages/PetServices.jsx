import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';
import {
  HeartPulse,
  Sparkles,
  ShieldAlert,
  Smile,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sun,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export const PetServices = () => {
  const specializedPrograms = [
    {
      title: 'Canine Luxury Hydro-Care',
      petType: 'Dogs of All Breeds',
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
      description: 'Custom microbubble hydro-massages, botanical flea/tick rinses, double-coat blowout, and tailored scissor styling.',
      features: ['Warm Hydrotherapy Jet Bath', 'De-Shedding Furminator Rake', 'Organic Paw Pad Balm', 'Breed Standard Scissor Cut'],
      price: 'From ₹999'
    },
    {
      title: 'Feline Pheromone Quiet Spa',
      petType: 'Cats & Kittens',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      description: 'Specially isolated soundproof feline suites infused with Feliway calming pheromones for peaceful grooming without stress.',
      features: ['Pheromone Calming Suite', 'Lion Cut & Teddy Trims', 'Soft Dry Foam Cleanse', 'Precision Claw Sheath Trim'],
      price: 'From ₹1,299'
    },
    {
      title: 'Senior Pet Gentle Comfort Spa',
      petType: 'Senior Pets (7+ Years)',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
      description: 'Specially tailored for arthritic and geriatric pets with warm orthopedic foam tables, frequent rest breaks, and joint soothing balms.',
      features: ['Low-Entry Walk-In Tubs', 'Warm Herbal Joint Soaks', 'Gentle No-Rush Handling', 'Geriatric Vitals Screen'],
      price: 'From ₹1,199'
    },
    {
      title: 'Preventive Dental & Oral Care',
      petType: 'Dogs & Cats',
      image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
      description: 'Ultrasonic gentle plaque scaling, antibacterial herbal rinses, and breath freshener to prevent periodontal disease and tooth loss.',
      features: ['Gentle Non-Anesthetic Scaling', 'Enamel Polish & Protectant', 'Gum Inflammation Relief', 'Home Dental Kit Included'],
      price: 'From ₹1,599'
    },
    {
      title: 'Small Companion & Exotic Pet Care',
      petType: 'Rabbits, Guinea Pigs & Birds',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
      description: 'Specialized delicate handling for small companion animals including sanitary trims, beak/nail filing, and nutritional assessment.',
      features: ['Delicate Safe Restraint', 'Gentle Claw & Beak Filing', 'Fur De-Tangling & Brush', 'Digestive Health Consult'],
      price: 'From ₹799'
    },
    {
      title: 'Post-Surgery & Recovery Boarding',
      petType: 'All Recovering Pets',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
      description: 'Medical boarding with licensed vet technician monitoring, wound dressing management, prescribed medication dosing, and quiet rest.',
      features: ['Vet Tech 24/7 Dosing', 'Wound & Collar Management', 'Low-Stimulus Quiet Suite', 'Daily Medical Progress Reports'],
      price: 'From ₹1,499/night'
    }
  ];

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '70px 0',
          background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFDF9 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Specialized Veterinary Programs"
            title="Tailored Pet Care for Every"
            highlight="Breed, Age & Need"
            subtitle="Explore our specialized medical and comfort programs curated for puppies, seniors, felines, and recovering pets."
          />
        </div>
      </section>

      {/* Programs List */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid grid-cols-3">
            {specializedPrograms.map((prog, idx) => (
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
                <div style={{ position: 'relative', height: '210px' }}>
                  <img
                    src={prog.image}
                    alt={prog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {prog.petType}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {prog.price}
                  </div>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                    {prog.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
                    {prog.description}
                  </p>

                  <div style={{ marginTop: 'auto', marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      Program Inclusions:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {prog.features.map((f, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.84rem',
                            color: 'var(--text-primary)',
                            marginBottom: '6px'
                          }}
                        >
                          <CheckCircle2 size={14} color="#10B981" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/booking"
                    state={{ serviceName: prog.title }}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '10px', fontSize: '0.9rem' }}
                  >
                    Book This Program <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vet Care Guarantee Banner */}
      <section style={{ backgroundColor: 'var(--bg-dark)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 166, 153, 0.2)',
              color: '#00A699',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Stethoscope size={30} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '14px' }}>
            Clinical Standards With A Loving Touch
          </h2>
          <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '24px' }}>
            All medical and specialized programs are overseen by our licensed veterinarians. We work closely with your family vet to coordinate medication schedules and wellness history.
          </p>
          <Link to="/contact" className="btn btn-secondary">
            Speak With A Pet Health Advisor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PetServices;
