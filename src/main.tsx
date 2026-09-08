import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ToastProvider } from './hooks/useToast'
import './styles/styles.css'
import './styles/inner.css'

const container = document.getElementById('root')
if (!container) throw new Error('Falta el contenedor #root')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
