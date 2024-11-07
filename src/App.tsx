import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import InvoiceList from './components/Invoice/InvoiceList'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/invoices" element={
          <Layout>
            <InvoiceList />
          </Layout>
        } />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={
          <Layout>
            <div>Profile Page</div>
          </Layout>
        } />
        <Route path="/settings" element={
          <Layout>
            <div>Settings Page</div>
          </Layout>
        } />
        <Route path="/notifications" element={
          <Layout>
            <div>Notifications Page</div>
          </Layout>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App