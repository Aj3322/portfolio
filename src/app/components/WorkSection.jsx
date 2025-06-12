export default function WorkSection( ) {
    return (
        <section id="work" className="relative z-10 min-h-screen py-20 flex items-center bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            My <span className="text-blue-400">Work</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Cards */}
            {[1, 2, 3].map((project) => (
              <div key={project} className="bg-gradient-to-br from-blue-900/50 to-black/50 rounded-xl p-6 border border-blue-800/50 hover:border-blue-500 transition-all">
                <div className="h-48 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Project {project} Image</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Project {project}</h3>
                <p className="text-gray-400 mb-4">Description of project {project} and technologies used.</p>
                <div className="flex space-x-2">
                  {['React', 'Node', 'MongoDB'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-900/30 text-blue-400 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}