export default function Header({ scrollToSection , activeSection }) {
    return ( <header className="fixed top-0 left-0 right-0 z-50 bottom-border-gradient backdrop-blur-md bg-black/80 border-b border-blue-900/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Ajay Kumar
          </button>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`${activeSection === 'home' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-400 transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('work')} 
              className={`${activeSection === 'work' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-400 transition-colors`}
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`${activeSection === 'about' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-400 transition-colors`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`${activeSection === 'contact' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-400 transition-colors`}
            >
              Contact
            </button>
          </nav>

          <button className="md:hidden text-gray-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>);
}
