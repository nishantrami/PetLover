import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  PawPrint,
  Calendar,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronDown,
  ClipboardList,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { isAdminLoggedIn } = useAdminAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header
      className={`navbar-sticky ${isScrolled ? 'navbar-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
        transition: 'var(--transition)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          gap: '8px'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FF5A5F 0%, #FC642D 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(255, 90, 95, 0.35)',
              flexShrink: 0
            }}
          >
            <PawPrint size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.5px',
                whiteSpace: 'nowrap'
              }}
            >
              Pet<span style={{ color: 'var(--primary)' }}>Lover</span>
            </div>
            <div
              style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                marginTop: '2px',
                whiteSpace: 'nowrap'
              }}
            >
              Care • Groom • Love
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            flexWrap: 'nowrap',
            flexShrink: 1
          }}
          className="desktop-nav"
        >
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/services', label: 'Services' },
            { path: '/pet-services', label: 'Pet Care' },
            { path: '/grooming', label: 'Grooming' },
            { path: '/pricing', label: 'Pricing' },
            { path: '/donate', label: 'Donate' },
            { path: '/feedback', label: 'Reviews' },
            { path: '/contact', label: 'Contact' }
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0
          }}
          className="desktop-actions navbar-actions-group"
        >
          {/* Admin Switch Link */}
          <Link
            to={isAdminLoggedIn ? '/admin/dashboard' : '/admin/login'}
            className="btn btn-outline"
            style={{
              padding: '5px 10px',
              fontSize: '0.78rem',
              borderRadius: 'var(--radius-full)',
              color: '#7C4DFF',
              borderColor: 'rgba(124, 77, 255, 0.3)',
              backgroundColor: 'rgba(124, 77, 255, 0.05)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              flexShrink: 0
            }}
            title="Administrator Control Panel"
          >
            <Shield size={13} color="#7C4DFF" style={{ flexShrink: 0 }} />
            <span>Admin</span>
          </Link>

          {/* Book Now Button */}
          <Link
            to="/booking"
            className="btn btn-primary"
            style={{
              padding: '6px 13px',
              fontSize: '0.82rem',
              fontWeight: 700,
              gap: '5px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <Calendar size={13} style={{ flexShrink: 0 }} />
            <span>Book Now</span>
          </Link>

          {/* Customer Auth Dropdown OR Login/Register Buttons */}
          {isAuthenticated ? (
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-alt)',
                  border: '1px solid var(--border-color)',
                  padding: '4px 10px 4px 6px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={
                    currentUser.avatar ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
                  }
                  alt={currentUser.fullName}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    maxWidth: '80px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {currentUser.fullName ? currentUser.fullName.split(' ')[0] : 'User'}
                </span>
                <ChevronDown size={13} color="var(--text-muted)" />
              </button>

              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '210px',
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--border-color)',
                    padding: '8px',
                    zIndex: 300,
                    animation: 'scaleUp 0.15s ease'
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-light)', marginBottom: '4px' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      {currentUser.fullName}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentUser.email}
                    </p>
                  </div>

                  <Link
                    to="/my-bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none'
                    }}
                    className="dropdown-item-hover"
                  >
                    <ClipboardList size={16} color="var(--primary)" /> My Bookings
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none'
                    }}
                    className="dropdown-item-hover"
                  >
                    <User size={16} color="var(--secondary)" /> My Profile & Pets
                  </Link>

                  <div style={{ borderTop: '1px solid var(--border-light)', margin: '4px 0' }} />

                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                      navigate('/');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--status-cancelled)',
                      background: 'none',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
              <Link
                to="/login"
                className="btn btn-outline"
                style={{
                  padding: '5px 11px',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  fontWeight: 600
                }}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn btn-secondary"
                style={{
                  padding: '5px 12px',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  fontWeight: 600
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'white',
            borderTop: '1px solid var(--border-color)',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-xl)'
          }}
          className="mobile-drawer"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About Us' },
              { path: '/services', label: 'Services Catalog' },
              { path: '/pet-services', label: 'Specialized Pet Care' },
              { path: '/grooming', label: 'Grooming & Spa' },
              { path: '/pricing', label: 'Pricing & Packages' },
              { path: '/donate', label: 'Rescue & Donations' },
              { path: '/feedback', label: 'Client Feedback' },
              { path: '/contact', label: 'Contact Us' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                style={{
                  fontSize: '0.98rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  padding: '8px 0',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              to="/booking"
              onClick={closeMobileMenu}
              className="btn btn-primary"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Calendar size={18} /> Book Appointment
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-bookings"
                  onClick={closeMobileMenu}
                  className="btn btn-outline"
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  <ClipboardList size={16} /> My Bookings
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="btn btn-outline"
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  <User size={16} /> My Profile ({currentUser.fullName})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                  }}
                  className="btn"
                  style={{ width: '100%', background: 'var(--status-cancelled-bg)', color: 'var(--status-cancelled)' }}
                >
                  <LogOut size={16} /> Log Out
                </button>
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="btn btn-outline"
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="btn btn-secondary"
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  Register
                </Link>
              </div>
            )}

            <Link
              to={isAdminLoggedIn ? '/admin/dashboard' : '/admin/login'}
              onClick={closeMobileMenu}
              style={{
                textAlign: 'center',
                fontSize: '0.85rem',
                color: '#7C4DFF',
                fontWeight: 700,
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
            >
              <Shield size={14} /> Open Admin Control Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
