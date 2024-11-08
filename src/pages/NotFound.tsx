import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-2 text-center">
        This page does not exist.
      </p>
      <p className="text-xl text-gray-600 mb-8 text-center">
        If you feel this is an error, contact support.
      </p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}

export default NotFound 