import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../context';

const Stage2 = () => {
  const context = useContext(MyContext);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setRevealed(false);
    const timer = setTimeout(() => setRevealed(true), 1800);
    return () => clearTimeout(timer);
  }, [context.state.result]);

  return (
    <div className="result-card">
      {!revealed ? (
        <div className="waiting-state">
          <div className="spinner" />
          <div className="waiting-text">PICKING THE UNLUCKY ONE...</div>
        </div>
      ) : (
        <>
          <div className="result-label">Tonight's unlucky winner 🎲</div>
          <span className="result-emoji">😭</span>
          <div className="result-name">{context.state.result}</div>
          <div className="result-sub">pays the bill</div>
        </>
      )}

      {revealed && (
        <div className="action-row" style={{ marginTop: 28 }}>
          <button
            className="btn-action btn-new-loser"
            onClick={() => { setRevealed(false); context.getNewLooser(); }}
          >
            NEW LOSER
          </button>
          <button
            className="btn-action btn-restart"
            onClick={context.resetGame}
          >
            START OVER
          </button>
        </div>
      )}
    </div>
  );
};

export default Stage2;
