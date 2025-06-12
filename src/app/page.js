"use client";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import AnimatedNetBackground from "./components/AnimatedNetBackground";
import CornerStarAnimation from "./components/CornerStarAnimation.js";

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  
  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(id);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Head>
        <title>Ajay Kumar | Portfolio</title>
        <meta name="description" content="Welcome to Ajay Kumar's portfolio" />
      </Head>

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bottom-border-gradient backdrop-blur-md bg-black/80 border-b border-blue-900/50">
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
      </header>

      {/* Animated Net Background */}
      <AnimatedNetBackground />

      {/* Home Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 pt-24 flex flex-col items-center justify-center">
          <div className="relative max-w-3xl px-5 py-14 animate-border border-gradient inset-0 bg-gradient-to-r from-blue-900 to-black rounded-2xl shadow-lg backdrop-blur-md border border-blue-800/50">
            <CornerStarAnimation/>
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

      {/* Work Section */}
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

      {/* About Section */}
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

      {/* Contact Section */}
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
    </div>
  );
}