import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { LogOut, Mail, User, LogIn, Sparkles } from "lucide-react"
import Logo from "./Logo"

const Navabr = () => {

  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin, userData, setUserData } = useContext(AppContext)
  
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data}  = await axios.post(backendUrl + '/api/auth/send-verify-otp');

      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      }else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-8 lg:px-24 absolute top-0 z-50'>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="cursor-pointer"
        onClick={() => navigate('/')}
      >
        <Logo />
      </motion.div>

      {userData ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          {/* User Avatar */}
          <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all ring-2 ring-white">
            {userData.name[0].toUpperCase()}
          </div>
          
          {/* Dropdown Menu */}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 pt-12 min-w-[200px]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100 bg-linear-to-br from-indigo-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {userData.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{userData.name}</p>
                    <p className="text-xs text-gray-600">{userData.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {!userData.isAccountVerified && (
                  <button
                    onClick={sendVerificationOtp}
                    className="w-full px-4 py-2.5 hover:bg-indigo-50 text-left flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors group"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">Verify Email</span>
                    <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  </button>
                )}

                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full px-4 py-2.5 hover:bg-gray-50 text-left flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </button>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={logout}
                  className="w-full px-4 py-2.5 hover:bg-red-50 text-left flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className='group relative px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all overflow-hidden'
          onClick={() => navigate('/login')}
        >
          {/* Animated background shimmer effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          {/* Button content */}
          <div className="relative flex items-center gap-2">
            <span>Login</span>
            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
      )}
    </nav>
  )
}

export default Navabr