import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import SectionHeader from '../components/common/SectionHeader';
import ReviewCard from '../components/common/ReviewCard';
import confetti from 'canvas-confetti';
import {
  Star,
  Sparkles,
  CheckCircle2,
  Send,
  MessageSquare,
  Heart,
  Smile
} from 'lucide-react';

export const Feedback = () => {
  const { feedback, services, addFeedback } = useData();
  const { currentUser } = useAuth();
  const { notifyError } = useNotification();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [filterRating, setFilterRating] = useState(0);

  const [formData, setFormData] = useState({
    name: currentUser?.fullName || '',
    email: currentUser?.email || '',
    petName: currentUser?.pets?.[0]?.name ? `${currentUser.pets[0].name} (${currentUser.pets[0].breed})` : '',
    service: services[0]?.title || 'Signature Full Pet Grooming',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      notifyError('Please complete all required fields.');
      return;
    }

    addFeedback({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      petName: formData.petName.trim() || 'Happy Pet',
      service: formData.service,
      rating: rating,
      message: formData.message.trim()
    });

    setIsSubmitted(true);
    setFormData({
      name: currentUser?.fullName || '',
      email: currentUser?.email || '',
      petName: '',
      service: services[0]?.title || '',
      message: ''
    });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch (err) {}
  };

  const filteredReviews = feedback
    .filter((f) => f.isApproved)
    .filter((f) => (filterRating === 0 ? true : f.rating === filterRating));

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '70px 0',
          background: 'linear-gradient(135deg, #FFF6F0 0%, #FAF5FF 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Customer Stories & Reviews"
            title="What Happy Pet Parents Share About"
            highlight="Their Experience"
            subtitle="Your honest reviews inspire our team to deliver the highest standard of compassionate care."
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              marginBottom: '60px'
            }}
          >
            {/* Left: Feedback Form */}
            <div
              className="card-solid"
              style={{
                padding: '36px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'white',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px' }}>
                Leave Your Review & Rating
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                Tell us about your pet's visit, demeanor, and service results!
              </p>

              {isSubmitted && (
                <div
                  style={{
                    backgroundColor: '#D1FAE5',
                    color: '#065F46',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    fontSize: '0.9rem'
                  }}
                >
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>Thank you for your review! It is now live on our testimonials wall.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* 5-Star Interactive Rating */}
                <div className="form-group">
                  <label className="form-label">
                    Overall Experience Rating: <span className="req">*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex'
                        }}
                      >
                        <Star
                          size={32}
                          fill={star <= (hoverRating || rating) ? '#FBBF24' : '#E2E8F0'}
                          color={star <= (hoverRating || rating) ? '#FBBF24' : '#CBD5E1'}
                        />
                      </button>
                    ))}
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#D97706', marginLeft: '6px' }}>
                      {rating === 5
                        ? '⭐⭐⭐⭐⭐ Exceptional (5/5)'
                        : rating === 4
                        ? '⭐⭐⭐⭐ Great (4/5)'
                        : rating === 3
                        ? '⭐⭐⭐ Good (3/5)'
                        : `${rating}/5 Stars`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">
                      Your Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="e.g. Emily Watson"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="emily@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Pet Name & Breed:</label>
                    <input
                      type="text"
                      name="petName"
                      className="form-control"
                      placeholder="e.g. Milo (French Bulldog)"
                      value={formData.petName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Service Received:</label>
                    <select
                      name="service"
                      className="form-control"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Your Review Story <span className="req">*</span>
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    placeholder="Describe how our staff pampered your pet, their mood after pickup, and grooming results..."
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{ minHeight: '110px' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', gap: '8px', fontSize: '1rem' }}
                >
                  <Send size={16} /> Submit Customer Feedback
                </button>
              </form>
            </div>

            {/* Right: Satisfaction stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #FF5A5F 0%, #FC642D 100%)',
                  color: 'white',
                  padding: '36px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                  Pet Parent Satisfaction
                </div>
                <div style={{ fontSize: '3.6rem', fontWeight: 900, lineHeight: 1, marginTop: '8px', marginBottom: '8px' }}>
                  4.9 ★
                </div>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5, margin: 0 }}>
                  Based on <strong>{feedback.length}</strong> verified customer evaluations across our grooming, health, and boarding suites.
                </p>
              </div>

              <div
                className="card-solid"
                style={{
                  padding: '28px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'white'
                }}
              >
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Filter Testimonials by Rating:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setFilterRating(0)}
                    className={`btn btn-sm ${filterRating === 0 ? 'btn-primary' : 'btn-outline'}`}
                  >
                    All Reviews ({feedback.length})
                  </button>
                  {[5, 4, 3].map((star) => {
                    const count = feedback.filter((f) => f.rating === star).length;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFilterRating(star)}
                        className={`btn btn-sm ${filterRating === star ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {star} Stars ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Wall */}
          <SectionHeader
            title="All Customer"
            highlight="Reviews"
            subtitle={`Showing ${filteredReviews.length} verified ratings.`}
            align="left"
          />

          <div className="grid grid-cols-3">
            {filteredReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
