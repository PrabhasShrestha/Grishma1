import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Home, Mail, Lock, ArrowRight, LogIn, Eye, EyeOff } from 'lucide-react';
import { LoginUserApi } from '../Api/Api'; // Import the API function
import { jwtDecode } from 'jwt-decode'; // Import for token decoding

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const data = { email, password };
      const response = await LoginUserApi(data);

      if (response?.data?.success) {
        setIsLoading(false);
        localStorage.setItem('token', response.data.token); // Store the token
        toast.success('Login successful! Welcome back to Lapse!');
        const decode = jwtDecode(response.data.token);
        setTimeout(() => {
          if (decode.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/'); // Default navigation as per simulation
          }
        }, 1000); // Delay to show toast
      } else {
        setIsLoading(false);
        toast.error(response?.data?.message || 'Login failed');
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.response?.data?.message || 'An error occurred during login');
      console.error('Login error:', err); // Debug
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <Home className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
            <LogIn className="w-4 h-4 mr-2" />
            Welcome Back
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Sign In to
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Lapse
            </span>
          </h1>
          
          <p className="text-slate-600 text-lg">
            Continue your productive journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
          <form onSubmit={submit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50 hover:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50 hover:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>

        {/* Live Preview Section */}
        {(email || password) && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <LogIn className="w-5 h-5 mr-2 text-green-500" />
              Live Preview
            </h3>
            <div className="space-y-2 text-sm">
              {email && (
                <div className="flex items-center">
                  <span className="text-slate-500 w-20">Email:</span>
                  <span className="text-slate-700 font-medium">{email}</span>
                </div>
              )}
              {password && (
                <div className="flex items-center">
                  <span className="text-slate-500 w-20">Password:</span>
                  <span className="text-slate-700 font-medium">{'•'.repeat(password.length)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Welcome Back Message */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm mb-4">Trusted by thousands of productive users</p>
          <div className="flex justify-center space-x-6 text-xs text-slate-400">
            <span>✓ Secure Login</span>
            <span>✓ Quick Access</span>
            <span>✓ Stay Organized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;