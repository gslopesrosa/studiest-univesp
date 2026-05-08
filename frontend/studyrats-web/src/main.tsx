import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { App } from './main/App'
import { AuthProvider } from './features/auth/presentation/contexts/AuthContext'
import '../index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
)