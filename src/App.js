import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { MyContext } from './context';
import Navbar from './components/Navbar';
import Stage1 from './components/stage_1';
import Stage2 from './components/stage_2';

class App extends React.Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="app-wrapper">
        <Navbar />
        <div className="wrapper">
          <div className="center-wrapper">
            <h1 className="game-title">
              <span className="title-emoji">🧾</span>
              {this.context.t('title').split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </h1>
            {this.context.state.stage === 1 ? <Stage1 /> : <Stage2 />}
            <p className="footer-hint">made by agonbekaj</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
