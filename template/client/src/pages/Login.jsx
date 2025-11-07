import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowLeft, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';

const Login = () => {

  const navigate = useNavigate();
  const {backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true; // to store the cookie in the browser for the session to persist after login or refresh the page 

      if (state === 'Sign Up') {
        
        const {data} = await axios.post( backendUrl + '/api/auth/register', {name, email, password});
        
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/'); // yaha pe redirect karna hai home page pe but bad me ham sidha dashboard ko navigate kr denge
        } else {
          toast.error(data.message);
        }

      } else {
        const {data} = await axios.post( backendUrl + '/api/auth/login', {email, password});
        
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/'); // yaha pe redirect karna hai home page pe but bad me ham sidha dashboard ko navigate kr denge
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Back to Home Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute left-4 top-4 sm:left-8 sm:top-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back to Home</span>
      </motion.button>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute right-4 top-4 sm:right-8 sm:top-8 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <Logo />
      </motion.div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Secure & Fast</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              Welcome to the Future of Authentication
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Join thousands of users who trust our secure and reliable authentication system.
            </p>
            
            <div className="space-y-4">
              {[
                'Enterprise-grade security',
                'Lightning-fast performance',
                'Email verification included',
                'Easy password recovery'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {state === 'Sign Up' 
                  ? 'Sign up to get started with your journey' 
                  : 'Login to continue to your account'}
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-5">
              {state === 'Sign Up' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {state === 'Login' && (
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/reset-password')}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
              >
                {state === 'Sign Up' ? 'Create Account' : 'Sign In'}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {state === 'Sign Up' ? (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setState('Login')}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => setState('Sign Up')}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
