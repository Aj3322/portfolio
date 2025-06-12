"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import VantaNetBackground from "../components/AnimatedNetBackground";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import DashboardContent from "../components/DashboardContent";
import ProjectsContent from "../components/ProjectsContent";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated" && session.user.role !== "admin") {
      signOut({ redirect: false });
      router.push("/admin/login?error=Unauthorized");
    }
  }, [status, router, session]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || status !== "authenticated") {
    return (
      <VantaNetBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 border-opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
            </div>
          </div>
        </div>
      </VantaNetBackground>
    );
  }

  return (
    <VantaNetBackground>
      <div className="min-h-screen text-white">
        {/* Header */}
        <AdminHeader
          session={session}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex h-screen pt-16 overflow-hidden">
          {/* Sidebar */}
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarOpen={sidebarOpen}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto">
            <div className="min-h-full w-full p-4 transition-all duration-300">
              <div className="container mx-auto px-4 py-6">
                {activeTab === "dashboard" && (
                  <DashboardContent projects={projects} />
                )}
                {activeTab === "projects" && (
                  <ProjectsContent
                    projects={projects || []}
                    fetchProjects={fetchProjects}
                  />
                )}
                {activeTab === "messages" && (
                  <div className="text-center py-12">
                    Messages content coming soon
                  </div>
                )}
                {activeTab === "settings" && (
                  <div className="text-center py-12">
                    Settings content coming soon
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </VantaNetBackground>
  );
}
