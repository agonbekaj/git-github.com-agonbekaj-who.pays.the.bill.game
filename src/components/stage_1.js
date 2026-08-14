import React, { useState, useContext, useRef } from 'react';
import { MyContext } from '../context';

const Stage1 = () => {
  const textInput = useRef();
  const context = useContext(MyContext);
  const [error, setError] = useState([false, '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value.trim();
    if (validateInput(value)) {
      setError([false, '']);
      context.addPlayer(value);
      textInput.current.value = '';
      textInput.current.focus();
    }
  };

  const validateInput = (value) => {
    if (value === '') {
      setError([true, 'Please enter a name']);
      return false;
    }
    if (value.length < 3) {
      setError([true, 'Name must be at least 3 characters']);
      return false;
    }
    return true;
  };

  const players = context.state.players;

  return (
    <div className="glass-card">
      <form onSubmit={handleSubmit}>
        <div className="player-input-wrapper">
          <input
            className="player-input"
            type="text"
            placeholder="Enter player name..."
            ref={textInput}
          />
          <button className="btn-add" type="submit">ADD</button>
        </div>
        {error[0] && <div className="error-msg">⚠️ {error[1]}</div>}
      </form>

      {players && players.length > 0 && (
        <>
          <div className="divider" />
          <div className="player-count">{players.length} player{players.length !== 1 ? 's' : ''} added</div>
          <ul className="players-list">
            {players.map((item, idx) => (
              <li key={idx} className="player-item">
                <span className="player-name">
                  <span className="player-avatar">{item[0].toUpperCase()}</span>
                  {item}
                </span>
                <button
                  className="remove-btn"
                  onClick={() => context.removePlayer(idx)}
                  type="button"
                  aria-label="Remove player"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <button className="btn-next" onClick={() => context.next()} type="button">
            SPIN THE WHEEL →
          </button>
        </>
      )}
    </div>
  );
};

export default Stage1;
