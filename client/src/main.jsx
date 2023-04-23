import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'
import App from './App'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </BrowserRouter>
    </React.StrictMode>
)
