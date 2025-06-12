// pages/work.js
import Layout from '../components/Layout';

export default function Work() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates.",
      technologies: ["Next.js", "Firebase", "Tailwind CSS"],
      link: "#"
    },
    {
      id: 3,
      title: "API Service",
      description: "RESTful API service with authentication and documentation.",
      technologies: ["Express", "JWT", "Swagger"],
      link: "#"
    }
  ];

  return (
    <Layout title="My Work | Ajay Kumar" description="Explore my projects and work">
      <div className="flex flex-col items-center min-h-screen py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          My <span className="text-blue-400">Projects</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-400 transition-all duration-300"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
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
                
                <a 
                  href={project.link} 
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}