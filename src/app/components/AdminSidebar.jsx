"use client";
import { useState } from "react";

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14l-5-3-5 3V5z"
          />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projects",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static z-40 h-screen transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "w-20" : "w-64"}
        bg-gradient-to-b from-slate-900 to-slate-800 
        border-r border-slate-700 shadow-2xl
      `}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-0 w-1 h-20 bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent"></div>
        </div>

        <div className="relative p-4 h-full flex flex-col">
          {/* Collapse Button (Top - only shown when collapsed) */}
          {isCollapsed && (
            <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCollapse();
                      }}
                      className="mx-auto mb-2 p-2 rounded-lg bg-blue-600 hover:bg-indigo-700 transition-all duration-300 rotate-180 "
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
          )}

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`
          w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between relative overflow-hidden
          ${isCollapsed ? "justify-center px-2" : ""}
          ${
            activeTab === item.id
              ? "bg-gradient-to-r from-indigo-600/80 to-violet-600/80 border border-indigo-500/50 shadow-lg shadow-indigo-500/10 text-white"
              : "hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50 text-slate-300 hover:text-white"
          }
        `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: sidebarOpen
                      ? "slideInLeft 0.3s ease-out forwards"
                      : "none",
                  }}
                >
                  {/* Active Tab Indicator */}
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-violet-400 rounded-r-full"></div>
                  )}

                  <div className="flex items-center space-x-3">
                    {/* Icon */}
                    <div
                      className={`
              relative flex-shrink-0 transition-all duration-300
              ${
                activeTab === item.id
                  ? "text-indigo-200 scale-110 animate-bounce"
                  : "text-slate-400 group-hover:text-indigo-300 group-hover:scale-105"
              }
            `}
                    >
                      {item.icon}
                    </div>

                    {/* Label */}
                    {!isCollapsed && (
                      <span
                        className={`
                font-medium transition-all duration-300
                ${
                  activeTab === item.id
                    ? "text-white"
                    : "text-slate-300 group-hover:text-white"
                }
              `}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>

                  {/* Collapse Button for index === 0 */}
                  {!isCollapsed && index === 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCollapse();
                      }}
                      className="ml-auto p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-60 shadow-lg border border-slate-700">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-t border-slate-700"></div>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* System Status Footer */}
          <div className="mt-auto">
            <div
              className={`p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm relative overflow-hidden transition-all duration-300 ${
                isCollapsed ? "flex justify-center" : ""
              }`}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              {!isCollapsed ? (
                <div className="relative z-10">
                  <div className="text-sm text-slate-400 mb-2 font-medium">
                    System Status
                  </div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <div className="h-3 w-3 bg-emerald-400 rounded-full shadow shadow-emerald-400/50"></div>
                      <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
                    </div>
                    <span className="text-sm text-white font-medium">
                      All systems operational
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-700/50 text-xs text-slate-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="relative">
                    <div className="h-3 w-3 bg-emerald-400 rounded-full shadow shadow-emerald-400/50"></div>
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
