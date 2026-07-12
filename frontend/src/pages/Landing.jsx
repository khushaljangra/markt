import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import {
  Search,
  ArrowRight,
  Code,
  Cloud,
  Database,
  Layers,
  FileText,
  CheckCircle2,
  Users,
  Star,
  BookOpen,
} from 'lucide-react';

const Landing = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('cloud');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await request('/projects?sort=popular');
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('Error fetching landing projects:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchText.trim())}`);
    } else {
      navigate('/projects');
    }
  };

  const getFilteredProjects = () => {
    if (activeTab === 'cloud') {
      return projects.filter(p => p.techStack?.some(t => ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Cloud'].includes(t))).slice(0, 4);
    } else if (activeTab === 'fullstack') {
      return projects.filter(p => p.category === 'source-code').slice(0, 4);
    } else {
      return projects.filter(p => p.price === 299).slice(0, 4);
    }
  };

  const categories = [
    { icon: <Code size={20} />, label: 'Web Development', value: 'source-code', count: '4 Projects' },
    { icon: <Cloud size={20} />, label: 'DevOps & Cloud', value: 'cloud', count: '4 Projects' },
    { icon: <Database size={20} />, label: 'Data Science & ML', value: 'datasets', count: '1 Project' },
    { icon: <Layers size={20} />, label: 'UI/UX Templates', value: 'templates', count: '1 Project' },
    { icon: <FileText size={20} />, label: 'PDF Handbooks', value: 'pdfs', count: '1 Project' },
  ];

  return (
    <div style={{ paddingBottom: '100px' }} className="animate-fade-in">
      
      {/* Hero Header (Udemy/Coursera Style) */}
      <section style={{
        position: 'relative',
        padding: '90px 0 70px 0',
        background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.08) 0%, rgba(11, 15, 25, 0) 100%)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container responsive-two-col" style={{
          alignItems: 'center',
        }}>
          
          {/* Left Text Column */}
          <div style={{ textAlign: 'left' }}>
            <span className="badge badge-primary" style={{ marginBottom: '16px', padding: '6px 12px', fontSize: '12px' }}>
              Over 12,500+ developers enrolled
            </span>
            <h1 style={{
              fontSize: '48px',
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: '20px',
              color: 'var(--text-primary)',
              letterSpacing: '-1px'
            }}>
              Learn from <br />
              <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Real Production-Ready Source Code</span>
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '16px',
              lineHeight: 1.6,
              marginBottom: '32px'
            }}>
              Skip simple Hello World tutorials. Study, modify, and build with production-grade templates, starter scripts, PDFs, and complete SaaS source code. Build faster, learn deeper.
            </p>

            {/* Central Search Bar (Udemy Style) */}
            <form onSubmit={handleSearchSubmit} className="hero-search-form" style={{
              display: 'flex',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '6px',
              maxWidth: '520px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ position: 'relative', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <Search size={18} style={{ color: 'var(--text-muted)', marginLeft: '12px', position: 'absolute' }} />
                <input
                  type="text"
                  placeholder="What do you want to build today? (e.g. AWS, React)..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    padding: '10px 10px 10px 40px',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '14px', borderRadius: '6px' }}>
                Search
              </button>
            </form>

            {/* Trust Bulletpoints */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Full Source Code
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Lifetime Access
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Clean Architectures
              </span>
            </div>
          </div>

          {/* Right Banner/Graphic Column */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-card" style={{
              padding: '30px',
              width: '100%',
              maxWidth: '420px',
              borderRadius: '20px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '-15px',
                right: '20px',
                background: 'var(--secondary)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700
              }}>77% OFF Sandbox</span>
              
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '12px' }}>Apex Developer Pass</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>Get lifetime download access to premium SaaS starter templates and microservices codebases.</p>
              
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Sandbox Seeding Offer</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <strong style={{ fontSize: '28px', color: 'var(--text-primary)' }}>INR 299</strong>
                  <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '14px' }}>INR 1,299</span>
                </div>
              </div>

              <Link to="/projects" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                Explore Sandbox Catalog
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Tech Skills Partners Ribbon */}
      <section style={{ padding: '30px 0', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600 }}>Skills you gain:</span>
          {['React.js', 'Next.js', 'AWS Architectures', 'Docker Containers', 'Microservices', 'GraphQL', 'Firebase Storage'].map((partner, idx) => (
            <span key={idx} style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: 700,
              background: 'var(--bg-tertiary)',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border)'
            }}>{partner}</span>
          ))}
        </div>
      </section>

      {/* Udemy-style Stats Counters Row */}
      <section style={{ padding: '50px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container grid-cols-4" style={{
          textAlign: 'center'
        }}>
          {[
            { label: 'Enrolled Developers', val: '12,500+', icon: <Users size={20} style={{ color: 'var(--primary)' }} /> },
            { label: 'Projects & Guides', val: '10 Cloud Packs', icon: <BookOpen size={20} style={{ color: 'var(--secondary)' }} /> },
            { label: 'Satisfied Ratings', val: '4.8 ★ Avg', icon: <Star size={20} style={{ color: '#fbbf24' }} /> },
            { label: 'Slashed Value', val: '77% Discount', icon: <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} /> },
          ].map((item, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '50%', marginBottom: '12px', display: 'flex' }}>{item.icon}</div>
              <strong style={{ fontSize: '24px', color: 'var(--text-primary)', display: 'block', fontFamily: 'var(--font-heading)' }}>{item.val}</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Course Categories Grid (Udemy Style) */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h2 style={{ fontSize: '26px', color: 'var(--text-primary)', marginBottom: '32px', textAlign: 'left' }}>
            Top learning categories
          </h2>

          <div className="grid-cols-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => navigate(`/projects?category=${cat.value}`)}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{
                  background: 'var(--bg-tertiary)',
                  padding: '10px',
                  borderRadius: '8px',
                  color: 'var(--primary)',
                  display: 'flex'
                }}>
                  {cat.icon}
                </div>
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>{cat.label}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Broad Selection Tab Panel (Udemy Style Courses Panel) */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', textAlign: 'left' }}>
            A broad selection of learning codebases
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>
            Choose from 10 production-grade cloud integrations. Real-world solutions updated monthly.
          </p>

          {/* Udemy Tabs */}
          <div style={{
            display: 'flex',
            gap: '16px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '12px',
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setActiveTab('cloud')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'cloud' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                borderBottom: activeTab === 'cloud' ? '3px solid var(--primary)' : 'none',
                paddingBottom: '12px',
                marginBottom: '-15px'
              }}
            >
              Cloud & DevOps Templates
            </button>
            <button
              onClick={() => setActiveTab('fullstack')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'fullstack' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                borderBottom: activeTab === 'fullstack' ? '3px solid var(--primary)' : 'none',
                paddingBottom: '12px',
                marginBottom: '-15px'
              }}
            >
              Full Stack SaaS Boilerplates
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'bestsellers' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                borderBottom: activeTab === 'bestsellers' ? '3px solid var(--primary)' : 'none',
                paddingBottom: '12px',
                marginBottom: '-15px'
              }}
            >
              Popular Sandbox (INR 299)
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : getFilteredProjects().length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No items found in this learning category.</p>
            </div>
          ) : (
            <div className="grid-cols-4">
              {getFilteredProjects().map((proj) => (
                <ProjectCard key={proj._id} project={proj} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Referral Program Banner */}
      <section className="container">
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          padding: '48px',
          borderRadius: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '30px'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <span className="badge badge-success" style={{ marginBottom: '16px' }}>Earn Passive Credits</span>
            <h2 style={{ fontSize: '30px', color: 'var(--text-primary)', marginBottom: '12px' }}>
              Invite Friends & Learn for Free!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
              Share your referral link with developer friends. Every time a friend registers with your link, we credit <strong>INR 100</strong> straight to your wallet balance. Buy premium projects for free!
            </p>
          </div>
          <Link to="/register" className="btn btn-primary" style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}>
            Get Your Code Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
