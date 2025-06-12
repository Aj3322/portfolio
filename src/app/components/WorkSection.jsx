import { useEffect, useState } from 'react';

export default function WorkSection() {
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
      <section id="work" className="relative z-10 min-h-screen py-20 flex items-center bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            My <span className="text-blue-400">Work</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="group relative overflow-hidden bg-gradient-to-br animate-border border-gradient from-blue-900/20 via-black/50 to-blue-900/20 rounded-xl p-6 border border-blue-800/50 transition-all duration-500"
              >
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-800 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-800 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded mb-4 w-5/6"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-6 w-16 bg-gray-800 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="work" className="relative z-10 min-h-screen py-20 flex items-center bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            My <span className="text-blue-400">Work</span>
          </h2>
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-red-400 mb-2">Error Loading Projects</h3>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="relative z-10 min-h-screen pt-10 flex  bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-5 text-center">
          My <span className="text-blue-400">Work</span>
        </h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto bg-gray-900/50 border border-gray-700 rounded-xl p-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
              <p className="text-gray-400">Check back later for my latest work!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div 
                  key={project._id} 
                  className="group relative overflow-hidden bg-gradient-to-br animate-border border-gradient from-blue-900/20 via-black/50 to-blue-900/20 rounded-xl p-6 border border-blue-800/50 hover:border-blue-500 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-500 rounded-xl opacity-0 group-hover:opacity-100"></div>
                  
                  {/* Project image with hover zoom */}
                  <div className="relative h-96 bg-gradient-to-br from-blue-900/30 to-black/50 rounded-lg mb-4 overflow-hidden">
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'none' }}
                    >
                      <span className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        {!project.imageUrl && (
                          <span className="text-gray-300 group-hover:text-white transition-all">
                            {project.title}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                      {project.shortDescription || project.description.substring(0, 120) + '...'}
                    </p>
                    
                    {/* Tech tags with hover effects */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-blue-900/30 text-blue-400 text-sm rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-gray-800/50 text-gray-400 text-sm rounded-full">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-3 mt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white font-medium hover:from-blue-500 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        >
                          Preview
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        >
                          GitHub
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View more button - optional if you implement pagination later */}
            {projects.length >= 6 && (
              <div className="mt-16 text-center">
                <button className="px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-400 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
                  View All Projects
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}