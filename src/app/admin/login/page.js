'use client';

import { useState } from 'react';
import { signIn, useSession, getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { FiMail, FiLock, FiLoader, FiCheck, FiAlertTriangle, FiArrowRight, FiUserPlus } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
const csrf = await getCsrfToken();
  
  const res = await signIn('credentials', {
    redirect: false,
    email,
    password,
    callbackUrl: '/admin',
    action: 'login',
    csrfToken: csrf // if needed
  });

    setLoading(false);

    if (res?.ok) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gradient-to-r from-green-600 to-emerald-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-green-500 ring-opacity-50 p-4`}
        >
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <FiCheck className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">Welcome back!</p>
              <p className="mt-1 text-sm text-green-100">
                Login successful. Redirecting...
              </p>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="inline-flex text-white hover:text-green-100 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ));
      setTimeout(() => router.push('/admin'), 1500);
    } else {

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gradient-to-r from-rose-600 to-red-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-rose-500 ring-opacity-50 p-4`}
        >
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <FiAlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">Login failed</p>
              <p className="mt-1 text-sm text-rose-100">
                {res?.error === "CredentialsSignin" 
                  ? "Invalid email or password" 
                  : "An error occurred. Please try again."}
              </p>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="inline-flex text-white hover:text-rose-100 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ));
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
            Admin <span className="text-blue-400">Portal</span>
          </h2>
          <p className="text-blue-200/80">Sign in to manage your portfolio</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-blue-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="block w-full pl-10 pr-10 py-3 bg-gray-700/50 border border-blue-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiLock className="h-5 w-5 text-blue-400/80 hover:text-blue-300" />
                ) : (
                  <FiArrowRight className="h-5 w-5 text-blue-400/80 hover:text-blue-300" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Forgot password?
            </button>
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
                Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => router.push('/admin/signup')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-blue-700/50 bg-blue-900/20 text-blue-300 hover:text-white hover:bg-blue-900/30 transition-all duration-300 hover:-translate-y-0.5 transform"
          >
            <FiUserPlus className="h-4 w-4" />
            <span>Create new account</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-blue-200/50">
            Secure access to your admin dashboard
          </p>
        </div>
      </div>
    </div>
  );
}