// pages/work.js
'use client';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?status=public');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        
        // Sort projects by order (ascending) and then by creation date (newest first)
        const sortedProjects = data.sort((a, b) => {
          if (a.order !== b.order) return a.order - b.order;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        setProjects(sortedProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Layout title="My Work | Ajay Kumar" description="Explore my projects and work">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          <p className="mt-4 text-white">Loading projects...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="My Work | Ajay Kumar" description="Explore my projects and work">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Work | Ajay Kumar" description="Explore my projects and work">
      <div className="flex flex-col items-center min-h-screen py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          My <span className="text-blue-400">Projects</span>
        </h1>
        
        {projects.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-300 text-xl mb-4">No projects found</p>
            <p className="text-gray-400">Check back later for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {projects.map((project) => (
              <div 
                key={project._id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-400 transition-all duration-300"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>
                  <p className="text-gray-300 mb-4">
                    {project.shortDescription || project.description.substring(0, 150) + '...'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}