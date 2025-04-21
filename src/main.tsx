/**
 * Main entry point for the Movie Database Web Application
 * Renders the main App component within React's StrictMode
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Create root element and render the application
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)