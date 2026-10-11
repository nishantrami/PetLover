import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STORAGE_KEYS,
  getStorageData,
  setStorageData,
  generateId,
  initializeStorageData
} from '../utils/storage';
import { useNotification } from './NotificationContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { notifySuccess, notifyError, notifyInfo } = useNotification();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and load session from localStorage on startup
  useEffect(() => {
    initializeStorageData();
    const storedUser = getStorageData(STORAGE_KEYS.CURRENT_USER, null);
    if (storedUser) {
      // Re-verify against latest users collection to get up-to-date user profile
      const allUsers = getStorageData(STORAGE_KEYS.USERS, []);
      const freshUser = allUsers.find((u) => u.id === storedUser.id);
      setCurrentUser(freshUser || storedUser);
    }
    setLoading(false);
  }, []);

  // Register new customer
  const register = (userData) => {
    const { fullName, email, phone, password, confirmPassword } = userData;

    if (!fullName || !email || !password) {
      notifyError('Please fill out all required fields.');
      return { success: false, message: 'Required fields missing' };
    }

    if (password !== confirmPassword) {
      notifyError('Passwords do not match.');
      return { success: false, message: 'Passwords do not match' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notifyError('Please enter a valid email address.');
      return { success: false, message: 'Invalid email address' };
    }

    const allUsers = getStorageData(STORAGE_KEYS.USERS, []);
    const existingUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
      notifyError('An account with this email address already exists.');
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: generateId('usr'),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      password: password,
      address: userData.address || '',
      avatar:
        userData.avatar ||
        `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      pets: userData.pets || [],
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...allUsers, newUser];
    setStorageData(STORAGE_KEYS.USERS, updatedUsers);
    setStorageData(STORAGE_KEYS.CURRENT_USER, newUser);
    setCurrentUser(newUser);

    notifySuccess(`Welcome to PetLover, ${newUser.fullName}!`);
    return { success: true, user: newUser };
  };

  // Login existing customer
  const login = (email, password) => {
    if (!email || !password) {
      notifyError('Please enter your email and password.');
      return { success: false, message: 'Missing credentials' };
    }

    const allUsers = getStorageData(STORAGE_KEYS.USERS, []);
    const user = allUsers.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!user) {
      notifyError('Invalid email or password. Please try again.');
      return { success: false, message: 'Invalid credentials' };
    }

    setStorageData(STORAGE_KEYS.CURRENT_USER, user);
    setCurrentUser(user);
    notifySuccess(`Welcome back, ${user.fullName}!`);
    return { success: true, user };
  };

  // Logout customer
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
    notifyInfo('You have been logged out successfully.');
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };

    const allUsers = getStorageData(STORAGE_KEYS.USERS, []);
    const index = allUsers.findIndex((u) => u.id === currentUser.id);

    if (index === -1) return { success: false, message: 'User not found' };

    const updatedUser = {
      ...allUsers[index],
      ...updatedFields,
      id: currentUser.id,
      email: currentUser.email // keep original identifier
    };

    allUsers[index] = updatedUser;
    setStorageData(STORAGE_KEYS.USERS, allUsers);
    setStorageData(STORAGE_KEYS.CURRENT_USER, updatedUser);
    setCurrentUser(updatedUser);

    notifySuccess('Profile updated successfully!');
    return { success: true, user: updatedUser };
  };

  // Add pet to customer profile
  const addPet = (petData) => {
    if (!currentUser) return { success: false };

    const newPet = {
      id: generateId('pet'),
      name: petData.name.trim(),
      type: petData.type || 'Dog',
      breed: petData.breed ? petData.breed.trim() : 'Mixed',
      age: petData.age || '',
      gender: petData.gender || 'Male',
      weight: petData.weight || '',
      notes: petData.notes || '',
      photo: petData.photo || ''
    };

    const currentPets = currentUser.pets || [];
    const updatedPets = [...currentPets, newPet];

    return updateProfile({ pets: updatedPets });
  };

  // Update pet
  const updatePet = (petId, petData) => {
    if (!currentUser) return { success: false };

    const currentPets = currentUser.pets || [];
    const updatedPets = currentPets.map((p) =>
      p.id === petId ? { ...p, ...petData } : p
    );

    return updateProfile({ pets: updatedPets });
  };

  // Delete pet
  const deletePet = (petId) => {
    if (!currentUser) return { success: false };

    const currentPets = currentUser.pets || [];
    const updatedPets = currentPets.filter((p) => p.id !== petId);

    return updateProfile({ pets: updatedPets });
  };

  // Password Reset simulation
  const resetPassword = (email, newPassword) => {
    const allUsers = getStorageData(STORAGE_KEYS.USERS, []);
    const userIndex = allUsers.findIndex(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (userIndex === -1) {
      notifyError('No account found with this email.');
      return { success: false, message: 'Account not found' };
    }

    allUsers[userIndex].password = newPassword;
    setStorageData(STORAGE_KEYS.USERS, allUsers);

    // If current user reset their password, update current user too
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      const updated = { ...currentUser, password: newPassword };
      setStorageData(STORAGE_KEYS.CURRENT_USER, updated);
      setCurrentUser(updated);
    }

    notifySuccess('Password has been successfully updated! You can now log in.');
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        register,
        login,
        logout,
        updateProfile,
        addPet,
        updatePet,
        deletePet,
        resetPassword,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
