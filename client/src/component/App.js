import React from 'react';
import '../stylesheets/App.css';

import Title from './Title.js';
import ListController  from './listController.js';

function App() {
  return (
    <div className="App">
      <header className="App-Container">
          <Title />
        <div
          className="List-Container"
        >
          <ListController />
        </div>
      </header>
    </div>
  );
}

export default App;
