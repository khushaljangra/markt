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
      <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>Loading...</p>
    </div>
  );
};

export default Loader;
