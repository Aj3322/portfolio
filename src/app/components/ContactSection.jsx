'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiMail, FiUser, FiMessageSquare, FiPhone, FiLoader, FiCheck, FiAlertTriangle } from 'react-icons/fi';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to database and send email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

    if (response.ok) {
 toast.success('Message Sent! Thank you for reaching out. I\'ll get back to you soon.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  // Reset form
  setFormData({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
}else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
          max-w-md w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-lg 
          pointer-events-auto flex ring-1 ring-blue-500 ring-opacity-50 p-4`}>
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <FiAlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">Error</p>
              <p className="mt-1 text-sm text-blue-100">
                {error.message || 'Failed to send message. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 min-h-screen py-20 flex items-center bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-900/50 to-black/50 rounded-xl p-8 border border-blue-800/50 border-gradient animate-border">
          <h2 className="text-4xl font-bold text-white mb-2 text-center">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-blue-400/80" />
                </div>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-blue-400/80" />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="phone" className="block text-gray-300 mb-2">Phone Number (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-blue-400/80" />
                </div>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <FiMessageSquare className="h-5 w-5 text-blue-400/80" />
                </div>
                <textarea 
                  id="message" 
                  name="message"
                  rows="5"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Hello Ajay, I'd like to talk about..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all flex items-center justify-center ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Or connect directly</h3>
            <div className="flex justify-center space-x-6">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
                { name: 'GitHub', url: 'https://github.com/yourusername' },
                { name: 'Twitter', url: 'https://twitter.com/yourhandle' }
              ].map((platform) => (
                <a 
                  key={platform.name} 
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}