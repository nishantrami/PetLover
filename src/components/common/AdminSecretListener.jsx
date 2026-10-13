import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNotification } from '../../context/NotificationContext';

/**
 * AdminSecretListener
 * Global listener that opens the Admin Panel Login when secret key `Ctrl + A` (or `Cmd + A` on Mac) is pressed.
 * Prevents the default browser text selection and smoothly routes to /admin/login (or /admin/dashboard if already logged in).
 */
export const AdminSecretListener = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminLoggedIn } = useAdminAuth();
  const { notifyInfo } = useNotification();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isKeyA = e.key === 'a' || e.key === 'A' || e.code === 'KeyA';

      if (isCtrlOrCmd && isKeyA && !e.altKey) {
        // Prevent default browser Select All behavior
        e.preventDefault();

        // If already inside admin section
        if (location.pathname.startsWith('/admin')) {
          if (location.pathname === '/admin/login') {
            notifyInfo('You are already on the Admin Login portal.', 'Secret Key (Ctrl+A)');
          } else {
            notifyInfo('You are already in the Admin Management Panel.', 'Admin Active');
          }
          return;
        }

        // Open Admin Login (or Dashboard if already authenticated)
        if (isAdminLoggedIn) {
          notifyInfo('Opening Admin Control Panel...', 'Admin Shortcut (Ctrl+A)');
          navigate('/admin/dashboard');
        } else {
          notifyInfo('Secret key activated: Opening Admin Login...', 'Admin Shortcut (Ctrl+A)');
          navigate('/admin/login');
        }
      }
    };

    // Use capture phase to intercept shortcut reliably across all components
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [navigate, location.pathname, isAdminLoggedIn, notifyInfo]);

  return null;
};

export default AdminSecretListener;
