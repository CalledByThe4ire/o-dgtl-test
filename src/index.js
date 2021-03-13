import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import './assets/fonts/LabGrotesque-Regular.woff';
import './assets/fonts/LabGrotesque-Regular.woff2';
import './assets/fonts/LabGrotesque-Medium.woff';
import './assets/fonts/LabGrotesque-Medium.woff2';

import App from './components/app';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
