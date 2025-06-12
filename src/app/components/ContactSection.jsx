export default function ContactSection() {
    return (
           <section id="contact" className="relative z-10 min-h-screen py-20 flex items-center bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 ">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-900/50 to-black/50 rounded-xl p-8 border border-blue-800/50 border-gradient animate-border">
            <h2 className="text-4xl font-bold text-white mb-2 text-center">
              Get In <span className="text-blue-400">Touch</span>
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Hello Ajay, I'd like to talk about..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
              >
                Send Message
              </button>
            </form>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Or connect directly</h3>
              <div className="flex justify-center space-x-6">
                {['LinkedIn', 'GitHub', 'Twitter'].map((platform) => (
                  <a 
                    key={platform} 
                    href="#" 
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}