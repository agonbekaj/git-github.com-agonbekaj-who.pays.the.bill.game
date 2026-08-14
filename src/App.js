import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { MyContext } from './context';
import Stage1 from './components/stage_1';
import Stage2 from './components/stage_2';

class App extends React.Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="wrapper">
        <div className="center-wrapper">
          <h1 className="game-title">
            <span className="title-emoji">🧾</span>
            Who Pays<br />the Bill?
          </h1>
          {this.context.state.stage === 1 ? <Stage1 /> : <Stage2 />}
          <p className="footer-hint">made by agonbekaj</p>
        </div>
      </div>
    );
  }
}

export default App;
