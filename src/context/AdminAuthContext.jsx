import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, getStorageData, setStorageData, initializeStorageData } from '../utils/storage';
import { useNotification } from './NotificationContext';

const AdminAuthContext = createContext();
const ADMIN_SESSION_KEY = 'petlover_admin_session';

export const AdminAuthProvider = ({ children }) => {
  const { notifySuccess, notifyError, notifyInfo } = useNotification();
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStorageData();
    const storedSession = getStorageData(ADMIN_SESSION_KEY, null);
    if (storedSession) {
      setAdminUser(storedSession);
    }
    setLoading(false);
  }, []);

  const adminLogin = (email, password) => {
    const adminData = getStorageData(STORAGE_KEYS.ADMIN, {
      id: 'admin_master',
      email: 'admin@petlover.com',
      password: 'admin123',
      fullName: 'PetLover Head Administrator',
      role: 'Super Admin'
    });

    if (
      email.trim().toLowerCase() === adminData.email.toLowerCase() &&
      password === adminData.password
    ) {
      const session = {
        id: adminData.id,
        email: adminData.email,
        fullName: adminData.fullName,
        role: adminData.role,
        avatar: adminData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        loggedInAt: new Date().toISOString()
      };
      setStorageData(ADMIN_SESSION_KEY, session);
      setAdminUser(session);
      notifySuccess('Welcome to the PetLover Admin Control Panel!');
      return { success: true };
    } else {
      notifyError('Invalid administrator credentials. Try admin@petlover.com / admin123');
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const adminLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminUser(null);
    notifyInfo('Admin session logged out.');
  };

  const updateAdminProfile = (updates) => {
    const adminData = getStorageData(STORAGE_KEYS.ADMIN, {});
    const updated = { ...adminData, ...updates };
    setStorageData(STORAGE_KEYS.ADMIN, updated);

    if (adminUser) {
      const updatedSession = { ...adminUser, ...updates };
      setStorageData(ADMIN_SESSION_KEY, updatedSession);
      setAdminUser(updatedSession);
    }
    notifySuccess('Admin profile updated successfully.');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAdminLoggedIn: !!adminUser,
        loading,
        adminLogin,
        adminLogout,
        updateAdminProfile
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
