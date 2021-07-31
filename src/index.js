import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/icon-fonts.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n'

ReactDOM.render(
  <React.StrictMode>
		<App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
