import React from 'react';
import '../stylesheets/App.css';

import Title from './Title.js';
import ListController  from './listController.js';

function App() {
  return (
    <div className="App">
      <header className="App-Container">
          <Title />
          <ListController />
      </header>
    </div>
  );
}

export default App;
