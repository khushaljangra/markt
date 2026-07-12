import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 0',
      marginTop: 'auto',
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-secondary)',
      fontSize: '14px'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>ApexMarket</h4>
          <p>© {new Date().getFullYear()} ApexMarket. All rights reserved.</p>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/projects" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Projects</Link>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
