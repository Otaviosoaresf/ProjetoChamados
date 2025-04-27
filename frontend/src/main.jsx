import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind importado aqui
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChamadosClienteProvider } from './context/ChamadosClienteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChamadosClienteProvider>
          <App />
        </ChamadosClienteProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);