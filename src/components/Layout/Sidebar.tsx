import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Invoices', path: '/invoices' },
    { label: 'Bills', path: '/bills' },
    { label: 'Expenses', path: '/expenses' },
    { label: 'Reports', path: '/reports' },
  ]

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <div className="p-4">
          <Link to="/">
            <img 
              src={logo} 
              alt="Altametrics Logo" 
              className="w-full h-auto cursor-pointer" 
            />
          </Link>
        </div>
      </div>
      <nav className="mt-8">
        <div className="px-4 font-medium text-gray-600">Menu</div>
        <div className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center px-8 py-3 text-sm ${
                location.pathname === item.path 
                  ? 'text-gray-900 bg-gray-100 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar