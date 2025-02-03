import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NotificationContextProvider } from './NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginContextProvider } from './LoginContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <LoginContextProvider>
        <Router>
          <App />
        </Router>
      </LoginContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
