import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '60px 0 40px 0',
      marginTop: 'auto',
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-secondary)',
      fontSize: '14px'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Left branding */}
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
            ApexMarket
          </h4>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
            Premium production-ready templates, SaaS boilerplates, and clean source code solutions for developers. Build faster, launch today.
          </p>
          <p>© {new Date().getFullYear()} ApexMarket. All rights reserved.</p>
        </div>

        {/* Right links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h5 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>Navigation</h5>
          <Link to="/projects" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>All Projects</Link>
          <Link to="/support" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Live Chat Support</Link>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
