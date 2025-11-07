import { Shield } from "lucide-react"
import PropTypes from 'prop-types'

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Outer ring with gradient */}
        <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        {/* Small dot accent */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AuthHub
        </span>
        <span className="text-xs text-gray-500 -mt-1">Secure Auth</span>
      </div>
    </div>
  )
}

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
