export default function AdminSidebar({ activeTab, setActiveTab, sidebarOpen }) {
  return (
    <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:static z-40 w-64 h-screen transition-all duration-300 ease-in-out backdrop-blur-lg bg-black/30 border-r border-blue-900/30 shadow-xl`}>
      <div className="p-4 h-full flex flex-col">
        <div className="mb-8 p-4 bg-gradient-to-br from-blue-900/40 to-black/70 rounded-xl border border-blue-900/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute -top-2 -right-2 h-4 w-4 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/30"></div>
          <div className="absolute -bottom-2 -left-2 h-4 w-4 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/30 delay-300"></div>
          <h2 className="text-lg font-bold mb-1 relative z-10">Control Panel</h2>
          <p className="text-sm text-gray-400 relative z-10">Manage your portfolio</p>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 group relative overflow-hidden ${activeTab === 'dashboard' ? 'bg-blue-900/40 border border-blue-700/50' : 'hover:bg-blue-900/20 border border-transparent hover:border-blue-900/30'}`}
          >
            <div className={`h-2 w-2 rounded-full ${activeTab === 'dashboard' ? 'bg-blue-400 animate-pulse' : 'bg-gray-600 group-hover:bg-blue-400'}`}></div>
            <span>Dashboard</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 group relative overflow-hidden ${activeTab === 'projects' ? 'bg-blue-900/40 border border-blue-700/50' : 'hover:bg-blue-900/20 border border-transparent hover:border-blue-900/30'}`}
          >
            <div className={`h-2 w-2 rounded-full ${activeTab === 'projects' ? 'bg-blue-400 animate-pulse' : 'bg-gray-600 group-hover:bg-blue-400'}`}></div>
            <span>Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 group relative overflow-hidden ${activeTab === 'messages' ? 'bg-blue-900/40 border border-blue-700/50' : 'hover:bg-blue-900/20 border border-transparent hover:border-blue-900/30'}`}
          >
            <div className={`h-2 w-2 rounded-full ${activeTab === 'messages' ? 'bg-blue-400 animate-pulse' : 'bg-gray-600 group-hover:bg-blue-400'}`}></div>
            <span>Messages</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 group relative overflow-hidden ${activeTab === 'settings' ? 'bg-blue-900/40 border border-blue-700/50' : 'hover:bg-blue-900/20 border border-transparent hover:border-blue-900/30'}`}
          >
            <div className={`h-2 w-2 rounded-full ${activeTab === 'settings' ? 'bg-blue-400 animate-pulse' : 'bg-gray-600 group-hover:bg-blue-400'}`}></div>
            <span>Settings</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </nav>

        <div className="mt-auto p-4 bg-black/40 rounded-xl border border-blue-900/30 backdrop-blur-sm">
          <div className="text-sm text-gray-400 mb-1">System Status</div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow shadow-green-500/50"></div>
            <span className="text-sm">All systems operational</span>
          </div>
          <div className="mt-2 pt-2 border-t border-blue-900/30 text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </aside>
  );
}