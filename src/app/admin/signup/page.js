'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiLoader, FiCheck, FiAlertTriangle, FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminField, setShowAdminField] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
          max-w-md w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-lg 
          pointer-events-auto flex ring-1 ring-blue-500 ring-opacity-50 p-4`}>
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <FiAlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">Password Mismatch</p>
              <p className="mt-1 text-sm text-blue-100">
                Your passwords don&#39;t match. Please try again.
              </p>
            </div>
          </div>
        </div>
      ));
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
          max-w-md w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-lg 
          pointer-events-auto flex ring-1 ring-blue-500 ring-opacity-50 p-4`}>
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <FiAlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">Password Too Short</p>
              <p className="mt-1 text-sm text-blue-100">
                Password must be at least 8 characters long.
              </p>
            </div>
          </div>
        </div>
      ));
      setLoading(false);
      return;
    }

    try {
      // Determine role based on admin password
      const role = formData.adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD ? 'admin' : 'user';
      
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
            max-w-md w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-lg 
            pointer-events-auto flex ring-1 ring-blue-500 ring-opacity-50 p-4`}>
            <div className="flex-1 flex items-center">
              <div className="flex-shrink-0 pt-0.5">
                <FiCheck className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  {data.user.role === 'admin' ? 'Admin Account Created!' : 'Account Created!'}
                </p>
                <p className="mt-1 text-sm text-blue-100">
                  {data.user.role === 'admin' 
                    ? 'You now have admin privileges.' 
                    : 'You can now sign in with your credentials.'}
                </p>
              </div>
            </div>
          </div>
        ));
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          adminPassword: ''
        });
        
        // Redirect to login after successful signup
        setTimeout(() => router.push('/admin/login'), 2000);
      } else {
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
          max-w-md w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-lg 
          pointer-events-auto flex ring-1 ring-blue-500 ring-opacity-50 p-4`}>
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <FiAlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">Signup Error</p>
              <p className="mt-1 text-sm text-blue-100">
                {error.message || 'Failed to create account. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 px-4">
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        gutter={8}
      />
      
      <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md border border-blue-500/30 animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create <span className="text-blue-400">Account</span>
          </h2>
          <p className="text-blue-200/80">Join to access the dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-blue-200/90">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-blue-400/80" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-blue-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-blue-200/90">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-blue-400/80" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-blue-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-blue-200/90">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-blue-400/80" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="block w-full pl-10 pr-10 py-3 bg-gray-700/50 border border-blue-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-blue-400/80 hover:text-blue-300" />
                ) : (
                  <FiEye className="h-5 w-5 text-blue-400/80 hover:text-blue-300" />
                )}
              </button>
            </div>
            <p className="text-xs text-blue-200/60 mt-1">
              Minimum 8 characters
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-blue-200/90">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-blue-400/80" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-blue-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdminField(!showAdminField)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              {showAdminField ? 'Hide admin section' : 'Create admin account?'}
            </button>

            {showAdminField && (
              <div className="mt-3 space-y-1">
                <label htmlFor="adminPassword" className="text-sm font-medium text-blue-200/90">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="adminPassword"
                  name="adminPassword"
                  className="block w-full px-3 py-3 bg-gray-700/50 border border-blue-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter admin password"
                  value={formData.adminPassword}
                  onChange={handleChange}
                />
                <p className="text-xs text-blue-200/60 mt-1">
                  Only enter if you have the admin password
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              loading
                ? 'bg-blue-800/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transform'
            }`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-blue-200/70">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/admin/login')}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}