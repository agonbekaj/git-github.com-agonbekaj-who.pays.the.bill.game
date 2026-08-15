import React, { useContext, useState } from 'react';
import { MyContext } from '../context';
import Settings from './Settings';
import '../styles/Navbar.css';

const Navbar = () => {
  const context = useContext(MyContext);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-emoji">🧾</span>
          <h2 className="brand-title">{context.t('title')}</h2>
        </div>
        <button 
          className="settings-btn"
          onClick={() => setShowSettings(true)}
          title="Settings"
        >
          ⚙️
        </button>
      </nav>

      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </>
  );
};

export default Navbar;
