import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import InvoiceList from './components/Invoice/InvoiceList'
import Login from './pages/Login'

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
        <Route path="/" element={
          <Layout>
            <div>Welcome to the Home Page</div>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App