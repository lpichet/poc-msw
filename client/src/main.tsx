import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if(process.env.NODE_ENV === 'dev-mock') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { worker } = await import('./mocks/browser');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await worker.start();
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
