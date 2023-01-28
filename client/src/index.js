import React from 'react';
import ReactDOM from 'react-dom/client';
import './login/login.css';
import App from './login/login';
import Form from '../src/formulario/form';
import './formulario/form.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

