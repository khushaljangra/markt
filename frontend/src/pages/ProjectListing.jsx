import React, { useState, useEffect } from 'react';
import { request } from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import { Search, ArrowUpDown } from 'lucide-react';

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('new');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'source-code', label: 'Source Codes' },
    { value: 'templates', label: 'Templates' },
    { value: 'pdfs', label: 'PDF Handbooks' },
    { value: 'graphics', label: 'Graphics' },
    { value: 'datasets', label: 'Datasets' },
  ];

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let queryStr = `?sort=${sort}`;
      if (search) queryStr += `&search=${encodeURIComponent(search)}`;
      if (category && category !== 'all') queryStr += `&category=${category}`;
      if (minPrice) queryStr += `&minPrice=${minPrice}`;
      if (maxPrice) queryStr += `&maxPrice=${maxPrice}`;

      const data = await request(`/projects${queryStr}`, 'GET');
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error loading projects list:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call API when filters change
    const timer = setTimeout(() => {
      fetchProjects();
    }, 300); // Debounce typing search
    return () => clearTimeout(timer);
  }, [search, category, sort]);

  const handleApplyFilter = (e) => {
    if (e) e.preventDefault();
    fetchProjects();
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px 80px 24px' }}>
      
      {/* Search & Pricing Filters Banner */}
      <form onSubmit={handleApplyFilter} className="glass" style={{
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid var(--border)'
      }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text-primary)' }}>Find Premium Code & Digital Assets</h2>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center'
        }}>
          {/* Search bar */}
          <div style={{ position: 'relative', flexGrow: 1, minWidth: '280px' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by title, features, or stack (e.g. React)..."
              className="form-input"
              style={{ paddingLeft: '44px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Min Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '130px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Min:</span>
            <input
              type="number"
              placeholder="0"
              className="form-input"
              style={{ padding: '10px', fontSize: '13px' }}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '130px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Max:</span>
            <input
              type="number"
              placeholder="Max"
              className="form-input"
              style={{ padding: '10px', fontSize: '13px' }}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '180px' }}>
            <select
              className="form-input"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ padding: '10px' }}
            >
              <option value="new">Newest Releases</option>
              <option value="popular">Most Downloads</option>
              <option value="rating">Top Customer Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Apply Button */}
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Apply
          </button>
        </div>

        {/* Category list filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          borderTop: '1px solid var(--border)',
          paddingTop: '20px'
        }}>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`btn`}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                borderRadius: '6px',
                background: category === cat.value ? 'var(--primary)' : 'var(--bg-tertiary)',
                color: category === cat.value ? 'white' : 'var(--text-secondary)',
                border: '1px solid var(--border)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </form>

      {/* Main Panel Products Grid */}
      <div style={{ marginTop: '20px' }}>
        {loading ? (
          <Loader />
        ) : projects.length === 0 ? (
          <div className="glass-card" style={{
            textAlign: 'center',
            padding: '80px 24px'
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              No projects match your current filters. Try resetting search fields.
            </p>
          </div>
        ) : (
          <div className="grid-cols-4">
            {projects.map((proj) => (
              <ProjectCard key={proj._id} project={proj} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProjectListing;
