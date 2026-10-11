import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  STORAGE_KEYS,
  getStorageData,
  setStorageData,
  addItem,
  updateItem,
  deleteItem,
  generateId,
  initializeStorageData
} from '../utils/storage';
import { useNotification } from './NotificationContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { notifySuccess, notifyError, notifyInfo } = useNotification();

  // Primary reactive states loaded from localStorage
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [messages, setMessages] = useState([]);
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load all collections from localStorage
  const loadAllData = useCallback(() => {
    initializeStorageData();
    setServices(getStorageData(STORAGE_KEYS.SERVICES, []));
    setCategories(getStorageData(STORAGE_KEYS.CATEGORIES, []));
    setPackages(getStorageData(STORAGE_KEYS.PACKAGES, []));
    setBookings(getStorageData(STORAGE_KEYS.BOOKINGS, []));
    setFeedback(getStorageData(STORAGE_KEYS.FEEDBACK, []));
    setMessages(getStorageData(STORAGE_KEYS.MESSAGES, []));
    setDonations(getStorageData(STORAGE_KEYS.DONATIONS, []));
    setUsers(getStorageData(STORAGE_KEYS.USERS, []));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // ================= SERVICES CRUD =================
  const addService = (serviceData) => {
    const newService = {
      ...serviceData,
      id: generateId('srv'),
      rating: serviceData.rating || 5.0,
      reviewsCount: serviceData.reviewsCount || 1,
      status: serviceData.status || 'active',
      isFeatured: Boolean(serviceData.isFeatured)
    };
    const saved = addItem(STORAGE_KEYS.SERVICES, newService);
    setServices((prev) => [saved, ...prev]);
    notifySuccess(`Service "${saved.title}" created successfully.`);
    return saved;
  };

  const updateServiceData = (id, updates) => {
    const updated = updateItem(STORAGE_KEYS.SERVICES, id, updates);
    if (updated) {
      setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
      notifySuccess(`Service updated successfully.`);
      return updated;
    }
    notifyError('Failed to update service.');
    return null;
  };

  const deleteServiceData = (id) => {
    const deleted = deleteItem(STORAGE_KEYS.SERVICES, id);
    if (deleted) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      notifySuccess('Service deleted successfully.');
      return true;
    }
    return false;
  };

  // ================= CATEGORIES CRUD =================
  const addCategory = (categoryData) => {
    const newCat = {
      ...categoryData,
      id: generateId('cat'),
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, '-')
    };
    const saved = addItem(STORAGE_KEYS.CATEGORIES, newCat);
    setCategories((prev) => [saved, ...prev]);
    notifySuccess(`Category "${saved.name}" added.`);
    return saved;
  };

  const updateCategoryData = (id, updates) => {
    const updated = updateItem(STORAGE_KEYS.CATEGORIES, id, updates);
    if (updated) {
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
      notifySuccess('Category updated.');
      return updated;
    }
    return null;
  };

  const deleteCategoryData = (id) => {
    const deleted = deleteItem(STORAGE_KEYS.CATEGORIES, id);
    if (deleted) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      notifySuccess('Category removed.');
      return true;
    }
    return false;
  };

  // ================= PACKAGES CRUD =================
  const addPackage = (packageData) => {
    const newPkg = {
      ...packageData,
      id: generateId('pkg')
    };
    const saved = addItem(STORAGE_KEYS.PACKAGES, newPkg);
    setPackages((prev) => [saved, ...prev]);
    notifySuccess(`Package "${saved.name}" created.`);
    return saved;
  };

  const updatePackageData = (id, updates) => {
    const updated = updateItem(STORAGE_KEYS.PACKAGES, id, updates);
    if (updated) {
      setPackages((prev) => prev.map((p) => (p.id === id ? updated : p)));
      notifySuccess('Package updated.');
      return updated;
    }
    return null;
  };

  const deletePackageData = (id) => {
    const deleted = deleteItem(STORAGE_KEYS.PACKAGES, id);
    if (deleted) {
      setPackages((prev) => prev.filter((p) => p.id !== id));
      notifySuccess('Package deleted.');
      return true;
    }
    return false;
  };

  // ================= BOOKINGS MANAGEMENT =================
  const addBooking = (bookingData) => {
    const newBookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      ...bookingData,
      id: newBookingId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const saved = addItem(STORAGE_KEYS.BOOKINGS, newBooking);
    setBookings((prev) => [saved, ...prev]);
    notifySuccess(`Appointment booked! Booking ID: #${saved.id}`, 'Booking Confirmed');
    return saved;
  };

  const updateBookingStatus = (id, newStatus) => {
    const updated = updateItem(STORAGE_KEYS.BOOKINGS, id, { status: newStatus });
    if (updated) {
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      notifySuccess(`Booking #${id} status updated to ${newStatus}.`);
      return updated;
    }
    return null;
  };

  const cancelBooking = (id, reason = 'Cancelled by customer') => {
    const updated = updateItem(STORAGE_KEYS.BOOKINGS, id, {
      status: 'Cancelled',
      cancellationReason: reason
    });
    if (updated) {
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      notifyInfo(`Booking #${id} has been cancelled.`);
      return updated;
    }
    return null;
  };

  const deleteBookingData = (id) => {
    const deleted = deleteItem(STORAGE_KEYS.BOOKINGS, id);
    if (deleted) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      notifySuccess(`Booking #${id} deleted.`);
      return true;
    }
    return false;
  };

  // ================= FEEDBACK & REVIEWS =================
  const addFeedback = (feedbackData) => {
    const newFb = {
      ...feedbackData,
      id: generateId('fb'),
      isApproved: true,
      isFeatured: false,
      date: new Date().toISOString().split('T')[0]
    };
    const saved = addItem(STORAGE_KEYS.FEEDBACK, newFb);
    setFeedback((prev) => [saved, ...prev]);
    notifySuccess('Thank you for your valuable feedback!');
    return saved;
  };

  const toggleFeedbackApproval = (id) => {
    const item = feedback.find((f) => f.id === id);
    if (!item) return;
    const updated = updateItem(STORAGE_KEYS.FEEDBACK, id, {
      isApproved: !item.isApproved
    });
    if (updated) {
      setFeedback((prev) => prev.map((f) => (f.id === id ? updated : f)));
    }
  };

  const toggleFeedbackFeatured = (id) => {
    const item = feedback.find((f) => f.id === id);
    if (!item) return;
    const updated = updateItem(STORAGE_KEYS.FEEDBACK, id, {
      isFeatured: !item.isFeatured
    });
    if (updated) {
      setFeedback((prev) => prev.map((f) => (f.id === id ? updated : f)));
    }
  };

  const deleteFeedbackData = (id) => {
    const deleted = deleteItem(STORAGE_KEYS.FEEDBACK, id);
    if (deleted) {
      setFeedback((prev) => prev.filter((f) => f.id !== id));
      notifySuccess('Feedback entry deleted.');
      return true;
    }
    return false;
  };

  // ================= CONTACT MESSAGES =================
  const addMessage = (messageData) => {
    const newMsg = {
      ...messageData,
      id: generateId('msg'),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    const saved = addItem(STORAGE_KEYS.MESSAGES, newMsg);
    setMessages((prev) => [saved, ...prev]);
    notifySuccess('Message sent! Our pet care advisors will contact you shortly.');
    return saved;
  };

  const toggleMessageRead = (id) => {
    const item = messages.find((m) => m.id === id);
    if (!item) return;
    const updated = updateItem(STORAGE_KEYS.MESSAGES, id, {
      isRead: !item.isRead
    });
    if (updated) {
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    }
  };

  const deleteMessageData = (id) => {
    const deleted = deleteItem(STORAGE_KEYS.MESSAGES, id);
    if (deleted) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      notifySuccess('Message deleted.');
      return true;
    }
    return false;
  };

  // ================= DONATIONS =================
  const addDonation = (donationData) => {
    const newDonation = {
      ...donationData,
      id: generateId('don'),
      amount: Number(donationData.amount) || 25,
      createdAt: new Date().toISOString()
    };
    const saved = addItem(STORAGE_KEYS.DONATIONS, newDonation);
    setDonations((prev) => [saved, ...prev]);
    notifySuccess(`Thank you for donating ₹${Number(newDonation.amount).toLocaleString('en-IN')} to support our furry friends!`);
    return saved;
  };

  const deleteDonationData = (id) => {
    const deleted = deleteItem(STORAGE_KEYS.DONATIONS, id);
    if (deleted) {
      setDonations((prev) => prev.filter((d) => d.id !== id));
      notifySuccess('Donation record deleted.');
      return true;
    }
    return false;
  };

  // ================= USERS / CUSTOMERS =================
  const deleteUserData = (userId) => {
    const allUsers = getStorageData(STORAGE_KEYS.USERS, []);
    const filtered = allUsers.filter((u) => u.id !== userId);
    setStorageData(STORAGE_KEYS.USERS, filtered);
    setUsers(filtered);
    notifySuccess('Customer profile removed.');
  };

  // ================= RE-SEED DEMO DATA =================
  const resetAllDataToDemo = () => {
    initializeStorageData(true);
    loadAllData();
    notifyInfo('System restored to original demonstration sample dataset.');
  };

  return (
    <DataContext.Provider
      value={{
        isLoading,
        services,
        categories,
        packages,
        bookings,
        feedback,
        messages,
        donations,
        users,
        addService,
        updateServiceData,
        deleteServiceData,
        addCategory,
        updateCategoryData,
        deleteCategoryData,
        addPackage,
        updatePackageData,
        deletePackageData,
        addBooking,
        updateBookingStatus,
        cancelBooking,
        deleteBookingData,
        addFeedback,
        toggleFeedbackApproval,
        toggleFeedbackFeatured,
        deleteFeedbackData,
        addMessage,
        toggleMessageRead,
        deleteMessageData,
        addDonation,
        deleteDonationData,
        deleteUserData,
        resetAllDataToDemo,
        refreshData: loadAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
