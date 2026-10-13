import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { DataProvider } from './context/DataContext';

// Layouts & Protected Routes
import CustomerLayout from './layouts/CustomerLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminProtectedRoute from './components/common/AdminProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import ToastContainer from './components/common/ToastContainer';
import AdminSecretListener from './components/common/AdminSecretListener';

// Customer Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import PetServices from './pages/PetServices';
import Grooming from './pages/Grooming';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminCustomers from './admin/AdminCustomers';
import AdminBookings from './admin/AdminBookings';
import AdminServices from './admin/AdminServices';
import AdminCategories from './admin/AdminCategories';
import AdminPackages from './admin/AdminPackages';
import AdminFeedback from './admin/AdminFeedback';
import AdminMessages from './admin/AdminMessages';
import AdminDonations from './admin/AdminDonations';
import AdminProfile from './admin/AdminProfile';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <DataProvider>
            <BrowserRouter>
              <AdminSecretListener />
              <ToastContainer />
              <Routes>
                {/* Public & Customer Routes under CustomerLayout */}
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/pet-services" element={<PetServices />} />
                  <Route path="/grooming" element={<Grooming />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  {/* Customer Protected Routes */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-bookings"
                    element={
                      <ProtectedRoute>
                        <MyBookings />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin Auth Route */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Protected Routes under AdminLayout */}
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="packages" element={<AdminPackages />} />
                  <Route path="feedback" element={<AdminFeedback />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="donations" element={<AdminDonations />} />
                  <Route path="profile" element={<AdminProfile />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
