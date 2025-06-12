import { signOut } from 'next-auth/react';

export default function AdminHeader({ session, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-blue-900/30 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-300 hover:text-blue-400 transition-all transform hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent tracking-tight">
            Portfolio Admin
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse absolute -top-1 -right-1 ring-2 ring-green-400/30"></div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-medium">
                {session.user.name?.charAt(0) || 'A'}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-300">Welcome back</span>
              <span className="font-medium text-white">{session.user.name || 'Admin'}</span>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 bg-gradient-to-r from-blue-600/90 to-blue-800/90 text-white rounded-lg hover:from-blue-500/90 hover:to-blue-700/90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center space-x-2 border border-blue-700/50 hover:border-blue-500/70 group"
          >
            <span>Sign Out</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}