import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/AuthContext/AuthContext.tsx';

     


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <App />
  </AuthProvider>
  </StrictMode>,
) 
