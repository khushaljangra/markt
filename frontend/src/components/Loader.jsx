import React from 'react';

const Loader = ({ fullPage = false }) => {
  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: fullPage ? '100vh' : '200px',
    width: '100%',
    flexDirection: 'column',
    gap: '16px'
  };

  return (
    <div style={spinnerStyle}>
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>Loading...</p>
    </div>
  );
};

export default Loader;
