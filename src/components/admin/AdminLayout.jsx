import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useData } from '../../context/DataContext';
import {
  PawPrint,
  LayoutDashboard,
  Users,
  CalendarCheck,
  Scissors,
  Layers,
  Package,
  MessageSquareQuote,
  Mail,
  HeartHandshake,
  UserCheck,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const { adminUser, adminLogout } = useAdminAuth();
  const { bookings, messages, feedback } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Calculate live badge counters
  const pendingBookingsCount = bookings.filter((b) => b.status === 'Pending').length;
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const navLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/bookings', icon: CalendarCheck, label: 'Bookings', badge: pendingBookingsCount, badgeColor: '#F59E0B' },
    { to: '/admin/services', icon: Scissors, label: 'Services' },
    { to: '/admin/categories', icon: Layers, label: 'Categories' },
    { to: '/admin/packages', icon: Package, label: 'Grooming Packages' },
    { to: '/admin/feedback', icon: MessageSquareQuote, label: 'Customer Reviews' },
    { to: '/admin/messages', icon: Mail, label: 'Contact Messages', badge: unreadMessagesCount, badgeColor: '#FF5A5F' },
    { to: '/admin/donations', icon: HeartHandshake, label: 'Rescue Donations' },
    { to: '/admin/profile', icon: UserCheck, label: 'Admin Settings' }
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      {/* Sidebar Desktop & Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 900
          }}
          className="admin-sidebar-overlay"
        />
      )}

      <aside
        style={{
          width: '270px',
          backgroundColor: '#1E2229',
          color: '#E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 950,
          transition: 'transform 0.3s ease',
          transform: sidebarOpen ? 'translateX(0)' : 'none',
          boxShadow: '4px 0 25px rgba(0, 0, 0, 0.2)'
        }}
        className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
      >
        {/* Admin Brand */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid #2D3748',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Link
            to="/admin/dashboard"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #7C4DFF 0%, #FF5A5F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 12px rgba(124, 77, 255, 0.4)'
              }}
            >
              <PawPrint size={22} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>
                PetLover <span style={{ color: '#A78BFA', fontSize: '0.85rem' }}>Admin</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>
                Management Suite
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer'
            }}
            className="mobile-sidebar-close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Admin Navigation Links */}
        <nav
          style={{
            flex: 1,
            padding: '20px 14px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? 'active-admin-nav' : ''}`
              }
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#FFFFFF' : '#94A3B8',
                backgroundColor: isActive ? '#7C4DFF' : 'transparent',
                boxShadow: isActive ? '0 4px 15px rgba(124, 77, 255, 0.35)' : 'none',
                transition: 'var(--transition)'
              })}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span
                  style={{
                    backgroundColor: item.badgeColor || '#FF5A5F',
                    color: 'white',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '16px', borderTop: '1px solid #2D3748', backgroundColor: '#171B21' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <img
              src={adminUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt="Admin Avatar"
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {adminUser?.fullName || 'Super Admin'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#A78BFA' }}>
                {adminUser?.role || 'Administrator'}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Link
              to="/"
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '8px',
                backgroundColor: '#272C35',
                color: '#CBD5E1',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
              title="Open customer view in new tab"
            >
              <ExternalLink size={13} /> Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#F87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '270px', display: 'flex', flexDirection: 'column' }} className="admin-main-wrapper">
        {/* Top bar */}
        <header
          style={{
            height: '70px',
            backgroundColor: 'white',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
              className="mobile-sidebar-toggle"
            >
              <Menu size={24} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} color="#7C4DFF" />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                PetLover Administration Control
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/"
              className="btn btn-outline"
              style={{ padding: '7px 14px', fontSize: '0.82rem', gap: '6px' }}
            >
              <ExternalLink size={14} /> View Public Storefront
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={adminUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt="Admin"
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #7C4DFF' }}
              />
            </div>
          </div>
        </header>

        {/* Page Inner Container */}
        <main style={{ flex: 1, padding: '30px' }}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
