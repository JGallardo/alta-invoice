import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import InvoiceList from './components/Invoice/InvoiceList'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Bills from './pages/Bills'
import Expenses from './pages/Expenses'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/invoices/total" element={<NotFound />} />
        <Route path="/invoices/:id?" element={
          <ProtectedRoute>
            <Layout>
              <InvoiceList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/" element={<Home />} />
        <Route path="/bills" element={
          <ProtectedRoute>
            <Layout>
              <Bills />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/expenses" element={
          <ProtectedRoute>
            <Layout>
              <Expenses />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout>
              <div>Profile Page</div>
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Layout>
              <div>Settings Page</div>
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Layout>
              <div>Notifications Page</div>
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App