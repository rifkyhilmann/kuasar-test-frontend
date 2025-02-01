import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Pages from './pages'
import Login from './pages/auth/login'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import ProtectedRoute from './config/protectedRoute'
import { ApolloProvider } from '@apollo/client'
import client from './utils/appoloClient'
import Chat from './pages/feature/chat'
import CountryDetail from './pages/feature/countryDetail'

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            {/* Route untuk halaman utama */}
            <Route path="/" 
              element={
                <ProtectedRoute>
                  <Pages />
                </ProtectedRoute>
              } 
            />
            {/* Route untuk halaman detail negara */}
            <Route path="/country/:code" 
              element={
                <ProtectedRoute>
                  <CountryDetail />
                </ProtectedRoute>
              } 
            />
            {/* Route halaman chat AI */}
            <Route path="/chat" 
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } 
            />
            {/* Route halaman login */}
            <Route path="/sign-in" element={<Login />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </Provider>
  )
}

export default App
