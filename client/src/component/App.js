import React from 'react';
import '../stylesheets/App.css';

import {CookiesProvider} from 'react-cookie';
import Title from './Title.js';
import ListController  from './listController.js';
/**
 * Main App 
 */
function App() {
  return (
    <CookiesProvider>
    <div className="App">
      <header className="App-Container">
          <Title />
          <ListController />
      </header>
    </div>
    </CookiesProvider>
  );
}

export default App;
