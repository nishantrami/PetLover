/**
 * PetLover LocalStorage Engine & Repository Layer
 * Pure client-side data persistence with safe JSON handling,
 * key partitioning, ID generation, and non-destructive initialization.
 */

export const STORAGE_KEYS = {
  USERS: 'petlover_users',
  CURRENT_USER: 'petlover_current_user',
  ADMIN: 'petlover_admin',
  SERVICES: 'petlover_services',
  CATEGORIES: 'petlover_categories',
  PACKAGES: 'petlover_packages',
  BOOKINGS: 'petlover_bookings',
  FEEDBACK: 'petlover_feedback',
  MESSAGES: 'petlover_messages',
  DONATIONS: 'petlover_donations',
  SYSTEM_SETTINGS: 'petlover_system_settings'
};

// Unique ID Generator
export const generateId = (prefix = 'item') => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `${prefix}_${timestamp}_${randomStr}`;
};

// Safe JSON parser
export const safeJSONParse = (data, fallback = []) => {
  if (!data) return fallback;
  try {
    const parsed = JSON.parse(data);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (error) {
    console.warn('Failed to parse localStorage data:', error);
    return fallback;
  }
};

// Generic read function
export const getStorageData = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return safeJSONParse(data, fallback);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

// Generic write function
export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
    return false;
  }
};

// CRUD Helpers for collections
export const getItems = (key) => {
  return getStorageData(key, []);
};

export const getItemById = (key, id) => {
  const items = getItems(key);
  return items.find(item => item.id === id) || null;
};

export const addItem = (key, item) => {
  const items = getItems(key);
  const newItem = {
    ...item,
    id: item.id || generateId(key.replace('petlover_', '')),
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  items.unshift(newItem);
  setStorageData(key, items);
  return newItem;
};

export const updateItem = (key, id, updates) => {
  const items = getItems(key);
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  setStorageData(key, items);
  return items[index];
};

export const deleteItem = (key, id) => {
  const items = getItems(key);
  const filtered = items.filter(item => item.id !== id);
  if (filtered.length !== items.length) {
    setStorageData(key, filtered);
    return true;
  }
  return false;
};

// Initial Demo Seed Data
const DEFAULT_CATEGORIES = [
  {
    id: 'cat_grooming',
    name: 'Pet Grooming & Spa',
    slug: 'grooming',
    description: 'Bathing, haircutting, nail clipping, fur styling, and coat conditioning.',
    icon: 'Sparkles',
    badgeColor: '#FF6B6B'
  },
  {
    id: 'cat_health',
    name: 'Veterinary & Health',
    slug: 'health',
    description: 'Wellness exams, vaccination tracking, dental cleaning, and nutrition checks.',
    icon: 'HeartPulse',
    badgeColor: '#4ECDC4'
  },
  {
    id: 'cat_boarding',
    name: 'Luxury Boarding',
    slug: 'boarding',
    description: 'Climate-controlled suites, 24/7 attentive supervision, and cozy bedding.',
    icon: 'Home',
    badgeColor: '#FFD166'
  },
  {
    id: 'cat_training',
    name: 'Behavioral Training',
    slug: 'training',
    description: 'Puppy socialization, obedience training, leash manners, and agility skills.',
    icon: 'GraduationCap',
    badgeColor: '#6C5CE7'
  },
  {
    id: 'cat_walking',
    name: 'Walking & Daycare',
    slug: 'walking',
    description: 'Energizing neighborhood walks, group social playtime, and outdoor parks.',
    icon: 'Footprints',
    badgeColor: '#10B981'
  }
];

const DEFAULT_SERVICES = [
  {
    id: 'srv_1',
    title: 'Signature Full Pet Grooming',
    category: 'grooming',
    categoryName: 'Pet Grooming & Spa',
    price: 1499,
    duration: '90 mins',
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    description: 'Complete royal treatment including organic shampoo bath, fluff blow dry, custom breed haircut, ear hygiene, nail buffing, and breath freshener.',
    features: [
      'Warm Hydrotherapy Bath',
      'Custom Breed Styling & Trim',
      'Nail Trimming & Paw Pad Balm',
      'Gentle Ear Canal Cleansing',
      'Organic Coat Conditioning Spray'
    ],
    isFeatured: true,
    petTypes: ['Dog', 'Cat'],
    status: 'active'
  },
  {
    id: 'srv_2',
    title: 'Aromatherapy Bath & De-Shedding',
    category: 'grooming',
    categoryName: 'Pet Grooming & Spa',
    price: 999,
    duration: '60 mins',
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    description: 'Deep fur clarifying wash with calming lavender and chamomile essences, combined with specialized FURminator undercoat de-shedding treatment.',
    features: [
      'Hypoallergenic Botanical Shampoos',
      'Undercoat Blowout & Rake',
      'Reduces Shedding by up to 90%',
      'Calming Aromatherapy Mist',
      'Gentle Face Wash'
    ],
    isFeatured: true,
    petTypes: ['Dog', 'Cat'],
    status: 'active'
  },
  {
    id: 'srv_3',
    title: 'Comprehensive Veterinary Wellness Exam',
    category: 'health',
    categoryName: 'Veterinary & Health',
    price: 1899,
    duration: '45 mins',
    rating: 5.0,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
    description: 'Thorough head-to-tail physical evaluation by licensed veterinary professionals, checking vitals, joints, teeth, eyes, ears, and cardiac health.',
    features: [
      'Complete Vitals & Organ Assessment',
      'Weight & Nutritional Counseling',
      'Dental Health Scoring',
      'Parasite Prevention Check',
      'Digital Health Summary Report'
    ],
    isFeatured: true,
    petTypes: ['Dog', 'Cat', 'Bird', 'Rabbit'],
    status: 'active'
  },
  {
    id: 'srv_4',
    title: 'Gentle Ultrasound Dental Cleaning',
    category: 'health',
    categoryName: 'Veterinary & Health',
    price: 2199,
    duration: '60 mins',
    rating: 4.9,
    reviewsCount: 72,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    description: 'Non-anesthetic dental plaque and tartar scaling, tooth polishing, and gum anti-bacterial rinses to maintain fresh breath and oral longevity.',
    features: [
      'Plaque & Tartar Scaling',
      'Enamel Polishing',
      'Gum Soothing Herbal Gel',
      'Oral Health Assessment'
    ],
    isFeatured: false,
    petTypes: ['Dog', 'Cat'],
    status: 'active'
  },
  {
    id: 'srv_5',
    title: 'Luxury 5-Star Pet Hotel Boarding',
    category: 'boarding',
    categoryName: 'Luxury Boarding',
    price: 1299,
    duration: 'Per Night',
    rating: 5.0,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious private glass suite with orthopedic memory foam mattress, HDTV with DogTV/soothing music, webcam access for parents, and 4 daily play sessions.',
    features: [
      'Live HD Webcam Access for Parents',
      'Orthopedic Memory Foam Bed',
      '4 Supervised Play Sessions Daily',
      'Medication Administration Included',
      'Daily Photo & Video WhatsApp Updates'
    ],
    isFeatured: true,
    petTypes: ['Dog', 'Cat'],
    status: 'active'
  },
  {
    id: 'srv_6',
    title: 'Positive Reinforcement Puppy Training',
    category: 'training',
    categoryName: 'Behavioral Training',
    price: 1699,
    duration: '60 mins',
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    description: 'Certified positive dog trainer guiding foundational commands: sit, stay, recall, leash manners, anti-biting, and social exposure.',
    features: [
      'One-on-One Custom Training',
      'Puppy Socialization Coaching',
      'Take-Home Action Guide & Video Drills',
      'Barking & Potty Management'
    ],
    isFeatured: false,
    petTypes: ['Dog'],
    status: 'active'
  },
  {
    id: 'srv_7',
    title: 'Active Neighborhood Dog Walking',
    category: 'walking',
    categoryName: 'Walking & Daycare',
    price: 599,
    duration: '45 mins',
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    description: 'High-energy GPS-tracked walks through shaded parks, safe social interaction, fresh water refills, and post-walk paw wipe downs.',
    features: [
      'Live GPS Walk Route Tracking',
      'Water Bowl & Hydration Refill',
      'Post-walk Paws Cleansing',
      'Treats & Belly Rubs'
    ],
    isFeatured: false,
    petTypes: ['Dog'],
    status: 'active'
  },
  {
    id: 'srv_8',
    title: 'Cat VIP Spa & Lion Cut Styling',
    category: 'grooming',
    categoryName: 'Pet Grooming & Spa',
    price: 1599,
    duration: '75 mins',
    rating: 4.9,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    description: 'Stress-free, feline-specialized quiet room grooming: lion cut or teddy bear cut, gentle dry-foam bath, and nail trimming.',
    features: [
      'Feline Calm Pheromone Diffuser Room',
      'Quiet Low-Noise Hand Dryers',
      'Precision Claw Clipping',
      'Face & Whisker Cleaning'
    ],
    isFeatured: true,
    petTypes: ['Cat'],
    status: 'active'
  }
];

const DEFAULT_PACKAGES = [
  {
    id: 'pkg_basic',
    name: 'Essential Care',
    tier: 'Basic',
    price: 899,
    billingPeriod: 'per session',
    badge: 'Starter Friendly',
    isPopular: false,
    color: '#4ECDC4',
    description: 'Perfect for regular maintenance, routine refresh, and hygiene essentials.',
    features: [
      { text: 'Hydrating Warm Water Bath', included: true },
      { text: 'Blow Dry & Gentle Coat Brush', included: true },
      { text: 'Nail Trimming & Filing', included: true },
      { text: 'Ear Cleansing & Inspection', included: true },
      { text: 'Sanitary Area Trim', included: false },
      { text: 'Teeth Brushing & Breath Spray', included: false },
      { text: 'Paw Pad Herbal Butter Balm', included: false },
      { text: 'Aromatherapy Coat Cologne', included: false }
    ]
  },
  {
    id: 'pkg_standard',
    name: 'Deluxe Pampering',
    tier: 'Standard',
    price: 1599,
    billingPeriod: 'per session',
    badge: 'Most Popular',
    isPopular: true,
    color: '#FF6B6B',
    description: 'Our most sought-after full-body rejuvenation package for glowing furry coats.',
    features: [
      { text: 'Hydrating Warm Water Bath', included: true },
      { text: 'Blow Dry & Gentle Coat Brush', included: true },
      { text: 'Nail Trimming & Filing', included: true },
      { text: 'Ear Cleansing & Inspection', included: true },
      { text: 'Sanitary Area Trim', included: true },
      { text: 'Teeth Brushing & Breath Spray', included: true },
      { text: 'Paw Pad Herbal Butter Balm', included: true },
      { text: 'Aromatherapy Coat Cologne', included: false }
    ]
  },
  {
    id: 'pkg_premium',
    name: 'Royal VIP Spa Sanctuary',
    tier: 'Premium',
    price: 2799,
    billingPeriod: 'per session',
    badge: 'Luxury Experience',
    isPopular: false,
    color: '#6C5CE7',
    description: 'The ultimate royal treatment with luxury botanicals, ozone spa bath, and style makeover.',
    features: [
      { text: 'Hydrating Warm Water Bath', included: true },
      { text: 'Blow Dry & Gentle Coat Brush', included: true },
      { text: 'Nail Trimming & Filing', included: true },
      { text: 'Ear Cleansing & Inspection', included: true },
      { text: 'Sanitary Area Trim', included: true },
      { text: 'Teeth Brushing & Breath Spray', included: true },
      { text: 'Paw Pad Herbal Butter Balm', included: true },
      { text: 'Aromatherapy Coat Cologne & Silk Finish', included: true }
    ]
  }
];

const DEFAULT_USERS = [
  {
    id: 'usr_demo1',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-8921',
    password: 'password123',
    address: '742 Evergreen Terrace, Springfield',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-01-15T10:00:00.000Z',
    pets: [
      {
        id: 'pet_1',
        name: 'Barnaby',
        type: 'Dog',
        breed: 'Golden Retriever',
        age: '3 Years',
        gender: 'Male',
        weight: '30 kg',
        notes: 'Loves belly rubs, gets excited with water bubbles.'
      }
    ]
  },
  {
    id: 'usr_demo2',
    fullName: 'Alex Morris',
    email: 'alex.morris@example.com',
    phone: '+1 (555) 789-4321',
    password: 'password123',
    address: '108 Ocean Boulevard, Miami, FL',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-02-01T12:30:00.000Z',
    pets: [
      {
        id: 'pet_2',
        name: 'Luna',
        type: 'Cat',
        breed: 'British Shorthair',
        age: '2 Years',
        gender: 'Female',
        weight: '4.5 kg',
        notes: 'Needs quiet environment, prefers feather toys.'
      }
    ]
  }
];

const DEFAULT_ADMIN = {
  id: 'admin_master',
  fullName: 'PetLover Head Administrator',
  email: 'admin@petlover.com',
  password: 'admin123',
  role: 'Super Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  permissions: ['all']
};

const DEFAULT_BOOKINGS = [
  {
    id: 'BK-9801',
    userId: 'usr_demo1',
    customerName: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-8921',
    petName: 'Barnaby',
    petType: 'Dog',
    petBreed: 'Golden Retriever',
    petAge: '3 Years',
    serviceId: 'srv_1',
    serviceName: 'Signature Full Pet Grooming',
    packageId: 'pkg_standard',
    packageName: 'Deluxe Pampering',
    price: 1599,
    bookingDate: '2026-10-18',
    bookingTime: '10:30 AM',
    address: '742 Evergreen Terrace, Springfield',
    notes: 'Please be gentle around his left front paw.',
    status: 'Confirmed',
    createdAt: '2026-10-08T09:15:00.000Z'
  },
  {
    id: 'BK-9802',
    userId: 'usr_demo2',
    customerName: 'Alex Morris',
    email: 'alex.morris@example.com',
    phone: '+1 (555) 789-4321',
    petName: 'Luna',
    petType: 'Cat',
    petBreed: 'British Shorthair',
    petAge: '2 Years',
    serviceId: 'srv_8',
    serviceName: 'Cat VIP Spa & Lion Cut Styling',
    packageId: 'pkg_premium',
    packageName: 'Royal VIP Spa Sanctuary',
    price: 2799,
    bookingDate: '2026-10-19',
    bookingTime: '02:00 PM',
    address: '108 Ocean Boulevard, Miami, FL',
    notes: 'Very shy cat, requires soothing atmosphere.',
    status: 'Pending',
    createdAt: '2026-10-09T14:20:00.000Z'
  },
  {
    id: 'BK-9803',
    userId: 'usr_demo1',
    customerName: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-8921',
    petName: 'Barnaby',
    petType: 'Dog',
    petBreed: 'Golden Retriever',
    petAge: '3 Years',
    serviceId: 'srv_3',
    serviceName: 'Comprehensive Veterinary Wellness Exam',
    packageId: 'pkg_basic',
    packageName: 'Essential Care',
    price: 1899,
    bookingDate: '2026-09-28',
    bookingTime: '11:00 AM',
    address: '742 Evergreen Terrace, Springfield',
    notes: 'Annual routine health checkup completed successfully.',
    status: 'Completed',
    createdAt: '2026-09-25T11:00:00.000Z'
  },
  {
    id: 'BK-9804',
    userId: 'usr_demo2',
    customerName: 'Alex Morris',
    email: 'alex.morris@example.com',
    phone: '+1 (555) 789-4321',
    petName: 'Luna',
    petType: 'Cat',
    petBreed: 'British Shorthair',
    petAge: '2 Years',
    serviceId: 'srv_2',
    serviceName: 'Aromatherapy Bath & De-Shedding',
    packageId: 'pkg_basic',
    packageName: 'Essential Care',
    price: 999,
    bookingDate: '2026-10-15',
    bookingTime: '04:00 PM',
    address: '108 Ocean Boulevard, Miami, FL',
    notes: 'Customer had to reschedule travel plans.',
    status: 'Cancelled',
    createdAt: '2026-10-05T08:30:00.000Z'
  }
];

const DEFAULT_FEEDBACK = [
  {
    id: 'fb_1',
    name: 'Emily Watson',
    email: 'emily.w@example.com',
    rating: 5,
    service: 'Signature Full Pet Grooming',
    petName: 'Milo (French Bulldog)',
    message: 'The groomers treated Milo like royalty! His fur is so soft and smells like fresh vanilla. Zero stress and very friendly staff. Highly recommend PetLover!',
    date: '2026-10-02',
    isApproved: true,
    isFeatured: true
  },
  {
    id: 'fb_2',
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    rating: 5,
    service: 'Luxury 5-Star Pet Hotel Boarding',
    petName: 'Bella (Golden Retriever)',
    message: 'The live webcam stream gave me total peace of mind while traveling. The staff sent daily photos and Bella came home happy and energized.',
    date: '2026-09-29',
    isApproved: true,
    isFeatured: true
  },
  {
    id: 'fb_3',
    name: 'Chloe Bennett',
    email: 'chloe.b@example.com',
    rating: 5,
    service: 'Positive Reinforcement Puppy Training',
    petName: 'Rocky (German Shepherd)',
    message: 'Trainer David was phenomenal with Rocky! Within 3 sessions, his leash pulling stopped completely and his recall is rock-solid.',
    date: '2026-09-20',
    isApproved: true,
    isFeatured: true
  }
];

const DEFAULT_MESSAGES = [
  {
    id: 'msg_1',
    name: 'David Miller',
    email: 'david.miller@example.com',
    phone: '+1 (555) 432-9081',
    subject: 'Question about Boarding Medication Support',
    message: 'Hello! I have a 12-year-old diabetic Beagle who needs insulin injections twice daily. Can your boarding staff administer this on a strict schedule?',
    isRead: false,
    createdAt: '2026-10-10T08:30:00.000Z'
  },
  {
    id: 'msg_2',
    name: 'Jessica Taylor',
    email: 'jessica.t@example.com',
    phone: '+1 (555) 678-1234',
    subject: 'Group Dog Walking Availability',
    message: 'Hi PetLover team! Are there available afternoon slots for small breed dog walking in the downtown area?',
    isRead: true,
    createdAt: '2026-10-09T15:45:00.000Z'
  }
];

const DEFAULT_DONATIONS = [
  {
    id: 'don_1',
    donorName: 'Anonymous Angel',
    email: 'angel@supporter.org',
    phone: '+1 (555) 999-0001',
    amount: 5000,
    cause: 'Emergency Medical & Surgery Fund',
    message: 'For the rescue pups who need immediate veterinary care. Thank you for all you do!',
    createdAt: '2026-10-07T11:20:00.000Z'
  },
  {
    id: 'don_2',
    donorName: 'Liam & Olivia Johnson',
    email: 'johnson.family@example.com',
    phone: '+1 (555) 888-2233',
    amount: 2000,
    cause: 'Winter Stray Warmth & Shelter Drive',
    message: 'In loving memory of our sweet rescue cat Whiskers.',
    createdAt: '2026-10-08T16:10:00.000Z'
  },
  {
    id: 'don_3',
    donorName: 'Rebecca Thorne',
    email: 'rebecca.t@example.com',
    phone: '+1 (555) 777-4455',
    amount: 1000,
    cause: 'Community Stray Feeding Initiative',
    message: 'Happy to support the daily food packs for neighborhood stray dogs!',
    createdAt: '2026-10-10T09:00:00.000Z'
  }
];

/**
 * Format helper for Indian Rupee amounts
 */
export const formatINR = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '₹0';
  return `₹${Number(value).toLocaleString('en-IN')}`;
};

const CURRENCY_VERSION_KEY = 'petlover_currency_inr_v1';

/**
 * Initialize storage with default demonstration seed data.
 * Crucial: Migrates existing data to Indian Rupees (INR) if needed,
 * while ensuring user changes and profiles are safely preserved.
 */
export const initializeStorageData = (forceReset = false) => {
  const isMigrated = localStorage.getItem(CURRENCY_VERSION_KEY);

  if (forceReset || !isMigrated) {
    const existingServices = getStorageData(STORAGE_KEYS.SERVICES, null);
    if (!existingServices || existingServices.some(s => s.price < 200)) {
      setStorageData(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
    }
    const existingPackages = getStorageData(STORAGE_KEYS.PACKAGES, null);
    if (!existingPackages || existingPackages.some(p => p.price < 200)) {
      setStorageData(STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES);
    }
    const existingBookings = getStorageData(STORAGE_KEYS.BOOKINGS, null);
    if (!existingBookings || existingBookings.some(b => b.price < 200)) {
      setStorageData(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    }
    const existingDonations = getStorageData(STORAGE_KEYS.DONATIONS, null);
    if (!existingDonations || existingDonations.some(d => d.amount < 300)) {
      setStorageData(STORAGE_KEYS.DONATIONS, DEFAULT_DONATIONS);
    }
    localStorage.setItem(CURRENCY_VERSION_KEY, 'true');
  }

  const seedIfMissing = (key, defaultData) => {
    if (localStorage.getItem(key) === null) {
      setStorageData(key, defaultData);
    }
  };

  seedIfMissing(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
  seedIfMissing(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
  seedIfMissing(STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES);
  seedIfMissing(STORAGE_KEYS.USERS, DEFAULT_USERS);
  seedIfMissing(STORAGE_KEYS.ADMIN, DEFAULT_ADMIN);
  seedIfMissing(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
  seedIfMissing(STORAGE_KEYS.FEEDBACK, DEFAULT_FEEDBACK);
  seedIfMissing(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  seedIfMissing(STORAGE_KEYS.DONATIONS, DEFAULT_DONATIONS);
};
