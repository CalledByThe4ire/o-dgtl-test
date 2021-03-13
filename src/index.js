import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import './fonts/LabGrotesque-Regular.woff';
import './fonts/LabGrotesque-Regular.woff2';
import './fonts/LabGrotesque-Medium.woff';
import './fonts/LabGrotesque-Medium.woff2';

import App from './components/app';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
