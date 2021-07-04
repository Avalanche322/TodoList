import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/icon-fonts.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
