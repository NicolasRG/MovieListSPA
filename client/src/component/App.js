import React from 'react';
import '../stylesheets/App.css';

import {CookiesProvider} from 'react-cookie';
import ListController  from './listController.js';
import CookieConsent from "react-cookie-consent";
/**
 * Main App 
 */
function App() {
  return (
      <CookiesProvider>
      <div className="App">
        <header className="App-Container">
          <ListController />
        </header>
        <CookieConsent> 
          This Web App uses cookies
        </CookieConsent>
        </div>
      </CookiesProvider>
  );
}

export default App;
