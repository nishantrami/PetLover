# 🐾 PetLover — React.js + LocalStorage Architecture

A modern, responsive, client-side web application and administration management suite for pet wellness, grooming, luxury boarding, and veterinary care. Recreated from the ground up using **React 19 + Vite** and powered **100% by Browser LocalStorage** with zero backend or database server dependencies.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Launching Locally

```bash
# 1. Clone or navigate to the project directory
cd "PetLover"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local Vite development server
npm run dev
```

Visit the application in your browser: `http://localhost:5173/` (or the port displayed in your terminal).

---

## 🔑 Demo Access Credentials

### 1. Administrator Portal (`/admin/login`)
- **Email**: `admin@petlover.com`
- **Password**: `admin123`
- *Includes a 1-click **Auto-Fill** button on the login screen.*

### 2. Customer Demo Accounts (`/login`)
- **Sarah Jenkins** (Dog Parent - Golden Retriever "Barnaby"):
  - Email: `sarah.jenkins@example.com`
  - Password: `password123`
- **Alex Morris** (Cat Parent - British Shorthair "Luna"):
  - Email: `alex.morris@example.com`
  - Password: `password123`
- *Includes 1-click **Quick Demo Login** buttons on the customer login page.*

---

## 🛠️ Technology Stack & Architecture

- **Frontend Framework**: React 19 (Vite)
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Styling**: Pure CSS Design System (`src/styles/index.css`) with Google Fonts (*Outfit*, *Plus Jakarta Sans*), Glassmorphism, CSS Custom Properties, and responsive flex/grid layouts.
- **Data Persistence**: Browser `localStorage` (via `src/utils/storage.js`)
- **Backend**: **None** (No Express/Node APIs, No PHP, No MySQL, No MongoDB, No Axios).

---

## 📦 Key Partitioning in LocalStorage

Data is partitioned into distinct keys to prevent collisions and ensure atomic updates:

| LocalStorage Key | Purpose |
| :--- | :--- |
| `petlover_users` | Registered customer records and pet profiles |
| `petlover_current_user` | Active customer session |
| `petlover_admin` | Master administrator configuration |
| `petlover_admin_session` | Active administrator session |
| `petlover_services` | Service catalog (Grooming, Health, Boarding, Training, Walking) |
| `petlover_categories` | Service category taxonomy |
| `petlover_packages` | Tiered grooming packages (Basic, Standard, Premium) |
| `petlover_bookings` | Customer appointments and status tracking |
| `petlover_feedback` | 1–5 star customer reviews and testimonials |
| `petlover_messages` | Inquiries submitted via Contact form |
| `petlover_donations` | Animal rescue & shelter donation logs |

---

## 🧭 Application Structure & Pages

### 🐶 Customer Facing Pages
1. **Home (`/`)**: Hero banner with live counters, Why Choose Us, featured services catalog with category pills, grooming package comparison, 4-step pet journey, testimonials wall, rescue donation spotlight, and quick booking CTA.
2. **About Us (`/about`)**: Brand story, 2018 founding history, certified fear-free philosophy, core values, facility highlights, and veterinary/groomer team bios.
3. **Services Catalog (`/services`)**: Full treatment directory with live search, category tabs, pet type filter (Dogs, Cats, Birds, Rabbits), price sorting, and interactive details modal with direct booking.
4. **Specialized Pet Services (`/pet-services`)**: Canine hydro-care, feline quiet rooms with pheromones, senior pet comfort care, preventive dental care, and small companion programs.
5. **Pet Grooming & Spa (`/grooming`)**: 5-stage spa journey breakdown, tiered package comparison, and luxury botanical add-ons (Blueberry facial, paw pad butter, Dead Sea mud mask).
6. **Pricing & Calculator (`/pricing`)**: Transparent package comparison, interactive live add-on price calculator, and FAQ accordion.
7. **Guided Booking System (`/booking`)**: 4-step guided form with past-date validation, pet species selector, service/package picker, time slot scheduler, customer info, price estimate, instant confirmation modal, and confetti.
8. **Pet Rescue Donations (`/donate`)**: Community rescue fund campaigns, preset donation buttons (₹250, ₹500, ₹1,000, ₹2,500, ₹5,000, custom), total community raised counter, and recent donor roll with clear demo notice.
9. **Contact Us (`/contact`)**: Headquarters location, 24/7 pet emergency hotline, operating hours, and inquiry message form saving to `localStorage`.
10. **Customer Reviews & Feedback (`/feedback`)**: Interactive 1–5 star rating selector, customer feedback submission, star filter tabs, and verified review cards wall.
11. **Customer Login (`/login`)**: Email/password authentication, 1-click demo logins, session persistence, and link to admin portal.
12. **Customer Registration (`/register`)**: Account creation with validation, duplicate email protection, and pet profile onboarding.
13. **Forgot Password (`/forgot-password`)**: Password reset simulation.
14. **Customer Profile (`/profile`)**: Manage personal details, phone, address, and pet profiles (add, edit, delete pets).
15. **My Bookings (`/my-bookings`)**: Appointment history with status tabs (All, Pending, Confirmed, In Progress, Completed, Cancelled), details modal, printable receipt view, and customer cancellation.

### 🛡️ Administrator Panel
1. **Admin Login (`/admin/login`)**: Separate admin authentication with demo credentials auto-fill.
2. **Admin Dashboard (`/admin/dashboard`)**: Dynamically computed metrics (Total Customers, Total Bookings, Bookings Value, Rescue Donations, Pending/Completed breakdown), status progress charts, quick operational shortcuts, and recent bookings table with live status changer.
3. **Customer Management (`/admin/customers`)**: Search registered pet parents, inspect their pets, view appointment history per user, and delete user accounts.
4. **Booking Management (`/admin/bookings`)**: Filter bookings by status (Pending, Confirmed, In Progress, Completed, Cancelled), search by booking ID or pet name, modify status with immediate customer site synchronization, and inspect full appointment details.
5. **Services Management (`/admin/services`)**: Full CRUD (Create, Read, Update, Delete) for services with image presets/URL, duration, category, price, features, and active toggle.
6. **Category Management (`/admin/categories`)**: Full CRUD for service categories with color badges, descriptions, and linked service counts.
7. **Package Management (`/admin/packages`)**: Full CRUD for grooming packages with tier, pricing, marketing ribbons, and treatment checklists.
8. **Feedback Moderation (`/admin/feedback`)**: Moderate customer ratings, toggle approval/visibility, feature reviews on homepage, and delete.
9. **Contact Inquiries (`/admin/messages`)**: Inbox for customer contact inquiries, read/unread status toggles, message reader modal, and simulated email reply.
10. **Rescue Donations Ledger (`/admin/donations`)**: Donation logs, cause distribution, average donation metrics, and total fund tally.
11. **Admin Settings & Profile (`/admin/profile`)**: Admin credentials editor and **Restore Default Demo Dataset** tool with confirmation dialog.

---

## 🧪 Testing Checklist & Verification

- [x] Scaffolding with Vite React.
- [x] LocalStorage persistence engine with safe parsing and non-destructive initialization.
- [x] Customer registration with required field checks and duplicate email protection.
- [x] Customer login and session restoration on browser refresh.
- [x] Customer profile management with multi-pet CRUD.
- [x] Appointment booking with past-date prevention and automatic user association.
- [x] Customer My Bookings with status filtering, receipt modal, and cancellation.
- [x] Service catalog search, category filters, and details modal.
- [x] Grooming spa steps, package cards, and add-on price calculator.
- [x] Rescue donation simulation with community fund tally.
- [x] Contact message and 5-star review submissions.
- [x] Separate Administrator login with demo credentials.
- [x] Live computed Admin Dashboard statistics and charts.
- [x] Admin booking status updates reflecting in customer booking history immediately.
- [x] Admin Service, Category, and Package CRUD updating storefront in real time.
- [x] Re-seed / restore default dataset functionality.
- [x] Production build validation (`npm run build`) passing with zero errors.
