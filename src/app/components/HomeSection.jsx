import CornerStarAnimation from "./CornerStarAnimation";

export default function HomeSection( { scrollToSection }) {
    return (
          <section id="home" className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 pt-24 flex flex-col items-center justify-center">
          <div className="relative max-w-3xl px-5 py-14 animate-border border-gradient inset-0 bg-gradient-to-r from-blue-900 to-black rounded-2xl shadow-lg backdrop-blur-md border border-blue-800/50">
            <CornerStarAnimation />
            <div className="text-center max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Hi, I&#39;m <span className="text-blue-400">Ajay Kumar</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
                App Developer | Backend Enthusiast | Tech Lover
              </h2>
              <p className="text-lg text-gray-400 mb-12">
                Welcome to my portfolio! I specialize in building robust
                applications and backend systems that power modern digital
                experiences. Explore my work and get in touch!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => scrollToSection('work')}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border border-blue-400 text-blue-400 hover:bg-blue-900/30 font-medium rounded-lg transition-all transform hover:scale-105"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}