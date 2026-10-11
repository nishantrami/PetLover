import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback(({ type = 'info', title = '', message = '', duration = 4500 }) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    const notification = { id, type, title, message, duration };

    setNotifications((prev) => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, [removeNotification]);

  const notifySuccess = useCallback((message, title = 'Success') => {
    showNotification({ type: 'success', title, message });
  }, [showNotification]);

  const notifyError = useCallback((message, title = 'Error') => {
    showNotification({ type: 'error', title, message });
  }, [showNotification]);

  const notifyInfo = useCallback((message, title = 'Information') => {
    showNotification({ type: 'info', title, message });
  }, [showNotification]);

  const notifyWarning = useCallback((message, title = 'Warning') => {
    showNotification({ type: 'warning', title, message });
  }, [showNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        notifySuccess,
        notifyError,
        notifyInfo,
        notifyWarning,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
