export default function AboutSection() {
    return (
              <section id="about" className="relative z-10 min-h-screen py-20 flex items-center bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              About <span className="text-blue-400">Me</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-blue-900/50 to-black/50 rounded-xl p-8 border border-blue-800/50">
                <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
                <p className="text-gray-400 mb-4">
                  I&#39;m a passionate developer with 5+ years of experience building web and mobile applications. 
                  My journey began when I built my first website in college, and I&#39;ve been hooked ever since.
                </p>
                <p className="text-gray-400">
                  I specialize in JavaScript technologies across the stack, with expertise in React, Node.js, 
                  and modern backend architectures.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-black/50 rounded-xl p-8 border border-blue-800/50">
                <h3 className="text-2xl font-bold text-white mb-4">Skills</h3>
                <div className="space-y-4">
                  {['Frontend Development', 'Backend Development', 'Mobile Apps', 'DevOps'].map((skill) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{skill}</span>
                        <span className="text-blue-400">90%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}