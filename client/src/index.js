import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {faTimes, faQuestionCircle, faPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import App from './component/App.js';
import * as serviceWorker from './serviceWorker';

library.add(fab,faTimes, faQuestionCircle, faPlus, faUserEdit); //FontAwesome global use

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
