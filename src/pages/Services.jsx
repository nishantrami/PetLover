import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import SectionHeader from '../components/common/SectionHeader';
import ServiceCard from '../components/common/ServiceCard';
import { Search, Filter, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const Services = () => {
  const { services, categories } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPetType, setSelectedPetType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        // Search filter
        const matchSearch =
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const matchCategory =
          selectedCategory === 'all' || service.category === selectedCategory;

        // Pet type filter
        const matchPetType =
          selectedPetType === 'all' ||
          !service.petTypes ||
          service.petTypes.includes(selectedPetType);

        return matchSearch && matchCategory && matchPetType;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [services, searchTerm, selectedCategory, selectedPetType, sortBy]);

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          padding: '60px 0',
          background: 'linear-gradient(135deg, #FFF9F5 0%, #F5F9FA 100%)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Full Service Menu"
            title="Comprehensive Pet Wellness &"
            highlight="Spa Services"
            subtitle="Explore our certified veterinary treatments, hydrotherapy grooming baths, behavioral training, and luxury hotel boarding."
          />

          {/* Search & Filter Toolbar */}
          <div
            className="card-solid"
            style={{
              padding: '20px 24px',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '960px',
              margin: '0 auto',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              {/* Search Bar */}
              <div className="input-icon-wrapper" style={{ gridColumn: 'span 1' }}>
                <Search size={18} className="icon" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search treatments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category selector */}
              <div>
                <select
                  className="form-control"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pet Type selector */}
              <div>
                <select
                  className="form-control"
                  value={selectedPetType}
                  onChange={(e) => setSelectedPetType(e.target.value)}
                >
                  <option value="all">All Pet Types</option>
                  <option value="Dog">Dogs</option>
                  <option value="Cat">Cats</option>
                  <option value="Bird">Birds</option>
                  <option value="Rabbit">Rabbits & Small Pets</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <select
                  className="form-control"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Sort: Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Showing <strong>{filteredServices.length}</strong> available treatments
            </p>
            {(searchTerm || selectedCategory !== 'all' || selectedPetType !== 'all') && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedPetType('all');
                  setSortBy('featured');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredServices.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🐾</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No services match your filters</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 16px' }}>
                Try adjusting your search keyword or resetting category filters to view all available offerings.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedPetType('all');
                }}
              >
                Show All Services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
