import logo from '../../assets/logo.png'

const Sidebar = () => {
  const menuItems = [
    { label: 'Home', active: false },
    { label: 'Invoices', active: true },
    { label: 'Bills', active: false },
    { label: 'Expenses', active: false },
    { label: 'Reports', active: false },
  ]

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <div className="p-4">
          <img 
            src={logo} 
            alt="Altametrics Logo" 
            className="w-full h-auto" 
          />
        </div>
      </div>
      <nav className="mt-8">
        <div className="px-4 font-medium text-gray-600">Menu</div>
        <div className="mt-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center px-8 py-3 text-sm ${
                item.active 
                  ? 'text-gray-900 bg-gray-100 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar