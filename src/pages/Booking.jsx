import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNotification } from '../context/NotificationContext';
import SectionHeader from '../components/common/SectionHeader';
import Modal from '../components/common/Modal';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  User,
  PawPrint,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Scissors,
  MapPin,
  FileText,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

export const Booking = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { services, packages, addBooking } = useData();
  const { notifyError } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  // Get tomorrow's date string as minimum booking date
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Pre-fill state from navigation or user
  const passedServiceId = location.state?.selectedServiceId || '';
  const passedPackageId = location.state?.selectedPackageId || '';

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    petName: '',
    petType: 'Dog',
    petBreed: '',
    petAge: '',
    serviceId: '',
    packageId: '',
    bookingDate: '',
    bookingTime: '10:30 AM',
    notes: ''
  });

  const [selectedPetOption, setSelectedPetOption] = useState('new');
  const [createdBooking, setCreatedBooking] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill from authenticated user and URL state
  useEffect(() => {
    if (currentUser) {
      const userPets = currentUser.pets || [];
      const firstPet = userPets.length > 0 ? userPets[0] : null;

      setFormData((prev) => ({
        ...prev,
        customerName: prev.customerName || currentUser.fullName || '',
        email: prev.email || currentUser.email || '',
        phone: prev.phone || currentUser.phone || '',
        address: prev.address || currentUser.address || '',
        petName: firstPet ? firstPet.name : prev.petName,
        petType: firstPet ? firstPet.type : prev.petType,
        petBreed: firstPet ? firstPet.breed : prev.petBreed,
        petAge: firstPet ? firstPet.age : prev.petAge
      }));

      if (firstPet) {
        setSelectedPetOption(firstPet.id);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (passedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: passedServiceId }));
    } else if (services.length > 0 && !formData.serviceId) {
      setFormData((prev) => ({ ...prev, serviceId: services[0].id }));
    }

    if (passedPackageId) {
      setFormData((prev) => ({ ...prev, packageId: passedPackageId }));
    } else if (packages.length > 0 && !formData.packageId) {
      setFormData((prev) => ({ ...prev, packageId: packages[0].id }));
    }
  }, [passedServiceId, passedPackageId, services, packages]);

  // Handle pet selection change from customer's saved pets
  const handlePetSelectChange = (petId) => {
    setSelectedPetOption(petId);
    if (petId === 'new') {
      setFormData((prev) => ({
        ...prev,
        petName: '',
        petType: 'Dog',
        petBreed: '',
        petAge: ''
      }));
    } else {
      const userPets = currentUser?.pets || [];
      const pet = userPets.find((p) => p.id === petId);
      if (pet) {
        setFormData((prev) => ({
          ...prev,
          petName: pet.name,
          petType: pet.type,
          petBreed: pet.breed || '',
          petAge: pet.age || ''
        }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate live estimate
  const selectedServiceObj = services.find((s) => s.id === formData.serviceId);
  const selectedPackageObj = packages.find((p) => p.id === formData.packageId);
  const estimatedPrice = (selectedServiceObj?.price || 0) + (selectedPackageObj?.price ? Math.round(selectedPackageObj.price * 0.5) : 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.customerName.trim()) {
      notifyError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      notifyError('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      notifyError('Please enter a contact phone number.');
      return;
    }
    if (!formData.petName.trim()) {
      notifyError('Please specify your pet\'s name.');
      return;
    }
    if (!formData.bookingDate) {
      notifyError('Please choose an appointment date.');
      return;
    }
    if (formData.bookingDate < minDate) {
      notifyError('Appointment date cannot be in the past.');
      return;
    }

    setIsSubmitting(true);

    const newBookingData = {
      userId: currentUser?.id || 'guest_user',
      customerName: formData.customerName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      petName: formData.petName.trim(),
      petType: formData.petType,
      petBreed: formData.petBreed.trim() || 'Mixed',
      petAge: formData.petAge || 'Not specified',
      serviceId: formData.serviceId,
      serviceName: selectedServiceObj?.title || 'Custom Pet Service',
      packageId: formData.packageId,
      packageName: selectedPackageObj?.name || 'Standard Care',
      price: estimatedPrice || 65,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
      notes: formData.notes.trim()
    };

    const saved = addBooking(newBookingData);
    setIsSubmitting(false);
    setCreatedBooking(saved);
    setShowSuccessModal(true);

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  const timeSlots = [
    '08:30 AM',
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '03:45 PM',
    '05:00 PM'
  ];

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '60px 0',
          background: 'linear-gradient(135deg, #FFF6F6 0%, #F5FBFB 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Online Reservation"
            title="Book Your Pet’s"
            highlight="Spa & Wellness Session"
            subtitle="Fast, guided booking. No payment upfront required for demo scheduling."
          />
        </div>
      </section>

      {/* Main Booking Form */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {/* Left Column: Pet & Service Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Pet Information */}
                <div
                  className="card-solid"
                  style={{
                    padding: '28px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PawPrint size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>1. Pet Information</h3>
                  </div>

                  {/* Saved Pet Dropdown if logged in */}
                  {isAuthenticated && currentUser?.pets?.length > 0 && (
                    <div className="form-group">
                      <label className="form-label">Select Registered Pet:</label>
                      <select
                        className="form-control"
                        value={selectedPetOption}
                        onChange={(e) => handlePetSelectChange(e.target.value)}
                      >
                        {currentUser.pets.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.type} - {p.breed})
                          </option>
                        ))}
                        <option value="new">+ Add a different pet</option>
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">
                        Pet Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="petName"
                        className="form-control"
                        placeholder="e.g. Barnaby"
                        value={formData.petName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Pet Species <span className="req">*</span>
                      </label>
                      <select
                        name="petType"
                        className="form-control"
                        value={formData.petType}
                        onChange={handleInputChange}
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Rabbit">Rabbit / Small Pet</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Breed</label>
                      <input
                        type="text"
                        name="petBreed"
                        className="form-control"
                        placeholder="e.g. Golden Retriever"
                        value={formData.petBreed}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Age / Weight</label>
                      <input
                        type="text"
                        name="petAge"
                        className="form-control"
                        placeholder="e.g. 3 Years, 25 kg"
                        value={formData.petAge}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Service & Package Selection */}
                <div
                  className="card-solid"
                  style={{
                    padding: '28px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--secondary-light)',
                        color: 'var(--secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Scissors size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>2. Select Treatment & Tier</h3>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Primary Service <span className="req">*</span>
                    </label>
                    <select
                      name="serviceId"
                      className="form-control"
                      value={formData.serviceId}
                      onChange={handleInputChange}
                      required
                    >
                      {services.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.title} (₹{Number(srv.price).toLocaleString('en-IN')} • {srv.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Care Package Tier:</label>
                    <select
                      name="packageId"
                      className="form-control"
                      value={formData.packageId}
                      onChange={handleInputChange}
                    >
                      <option value="">Standard Individual Service Only</option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({pkg.tier} Package - ₹{Number(pkg.price).toLocaleString('en-IN')})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Special Notes / Medical Instructions:</label>
                    <textarea
                      name="notes"
                      className="form-control"
                      placeholder="Any fears, skin sensitivities, or special instructions for our groomers..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      style={{ minHeight: '80px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Date, Time & Customer Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 3. Date & Time Selection */}
                <div
                  className="card-solid"
                  style={{
                    padding: '28px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--accent-purple-light)',
                        color: 'var(--accent-purple)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Calendar size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>3. Date & Time Slot</h3>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Appointment Date <span className="req">*</span>
                    </label>
                    <input
                      type="date"
                      name="bookingDate"
                      min={minDate}
                      className="form-control"
                      value={formData.bookingDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">
                      Select Available Time Slot <span className="req">*</span>
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, bookingTime: slot }))}
                          style={{
                            padding: '10px 8px',
                            borderRadius: 'var(--radius-sm)',
                            border: formData.bookingTime === slot ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                            backgroundColor: formData.bookingTime === slot ? 'var(--primary-light)' : 'white',
                            color: formData.bookingTime === slot ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: formData.bookingTime === slot ? 700 : 500,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Parent Contact Details */}
                <div
                  className="card-solid"
                  style={{
                    padding: '28px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: '#FFEAEA',
                        color: '#FF5A5F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <User size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>4. Pet Parent Contact</h3>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      className="form-control"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">
                        Email Address <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Phone Number <span className="req">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Home Address (Optional for Taxi Pickup):</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="742 Evergreen Terrace, Springfield"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Estimate & Submit Button */}
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--primary)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Appointment Cost:</div>
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>
                        ₹{Number(estimatedPrice).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <div>Pay At Salon</div>
                      <div style={{ color: '#10B981', fontWeight: 600 }}>Free Cancellation</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', fontSize: '1.05rem', gap: '8px' }}
                    disabled={isSubmitting}
                  >
                    <Sparkles size={18} /> Confirm & Save Booking
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Confirmation Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Appointment Confirmed!"
        size="md"
      >
        {createdBooking && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#D1FAE5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
              We Can't Wait to See {createdBooking.petName}!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
              Your appointment has been successfully stored in browser storage.
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-alt)',
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                textAlign: 'left',
                marginBottom: '24px',
                fontSize: '0.9rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Booking ID:</span>
                <strong style={{ color: 'var(--primary)' }}>#{createdBooking.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Service:</span>
                <strong>{createdBooking.serviceName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                <strong>{createdBooking.bookingDate} at {createdBooking.bookingTime}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span className="status-badge status-pending">Pending Confirmation</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/');
                }}
              >
                Return Home
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1.2, gap: '6px' }}
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/my-bookings');
                }}
              >
                <ClipboardList size={16} /> View My Bookings
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Booking;
