import React, { useContext, useState } from 'react';
import { MyContext } from '../context';
import '../styles/Settings.css';

const Settings = ({ onClose }) => {
  const context = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = context.state.history.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearHistory = () => {
    if (window.confirm('Clear all history?')) {
      context.clearHistory();
    }
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h3>{context.t('settings')}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          {/* Language Selection */}
          <div className="settings-section">
            <label className="settings-label">{context.t('language')}</label>
            <div className="language-grid">
              {['en', 'de', 'es', 'fr'].map(lang => (
                <button
                  key={lang}
                  className={`language-btn ${context.state.language === lang ? 'active' : ''}`}
                  onClick={() => context.setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* History Section */}
          <div className="settings-section">
            <div className="history-header">
              <label className="settings-label">{context.t('history')}</label>
              {context.state.history.length > 0 && (
                <button className="clear-btn" onClick={handleClearHistory}>
                  {context.t('clearHistory')}
                </button>
              )}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder={context.t('search')}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* History List */}
            <div className="history-list">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((name, idx) => (
                  <div key={idx} className="history-item">
                    <span className="history-name">{name}</span>
                    <button
                      className="history-add-btn"
                      onClick={() => {
                        context.addPlayer(name);
                      }}
                      title="Add to players"
                    >
                      +
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-history">{context.t('noHistory')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
