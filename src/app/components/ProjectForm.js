'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function ProjectForm({ project = null,onClose, onSuccess }) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    technologies: '',
    categories: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    order: 0
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with project data if editing
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        shortDescription: project.shortDescription || '',
        technologies: project.technologies?.join(', ') || '',
        categories: project.categories?.join(', ') || '',
        imageUrl: project.imageUrl || '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
        order: project.order || 0
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const url = project ? `/api/projects/` : '/api/projects';
      const method = project ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(',').map(t => t.trim()),
          categories: formData.categories.split(',').map(c => c.trim()),
          id: project?._id || project?.id
        })
      });

      if (!res.ok) throw new Error(await res.text());

      onSuccess();
      toast.success(project ? 'Project updated successfully' : 'Project added successfully');
  
      // Only reset form if it was a new project submission
      if (!project) {
        setFormData({
          title: '',
          description: '',
          shortDescription: '',
          technologies: '',
          categories: '',
          imageUrl: '',
          liveUrl: '',
          githubUrl: '',
          featured: false,
          order: 0
        });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save project');
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="glass-panel p-6 rounded-xl border border-gradient animate-border  border-blue-900/50 bg-gradient-to-br from-blue-900/20 to-black/30 backdrop-blur-sm relative">
      {/* Add close button at the top right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors bg-gray-800/50 rounded-full"
        aria-label="Close form"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-center justify-between mb-6 m-auto">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400  to-blue-600 bg-clip-text text-transparent">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>
        <div className="flex space-x-2 mx-12">
          <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse delay-100"></div>
          <div className="h-2 w-2 bg-blue-800 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-900/30 border border-red-700/50 text-red-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-200"
            placeholder="Project title"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">Short Description*</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-200"
            placeholder="Brief project summary"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-200"
            placeholder="Detailed project description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Technologies*</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-200"
              placeholder="Comma separated (React, Node.js)"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Categories*</label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-200"
              placeholder="Comma separated (Web, Mobile)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-200"
              placeholder="Project image URL"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Live URL</label>
            <input
              type="text"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-200"
              placeholder="Live demo URL"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">GitHub URL</label>
            <input
              type="text"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-200"
              placeholder="GitHub repository URL"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded bg-black/30 border border-blue-900/50 focus:ring-blue-500/50 text-blue-600"
            />
            <label className="ml-2 text-sm text-gray-300">Featured Project</label>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-300">Order:</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-16 p-2 rounded-lg bg-black/30 border border-blue-900/50 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 text-white text-center"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 mt-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:from-blue-500 hover:to-blue-700 transition-all duration-300 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/20'
          } flex items-center justify-center space-x-2`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{project ? 'Updating...' : 'Adding...'}</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d={project ? "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" : "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"} clipRule="evenodd" />
              </svg>
              <span>{project ? 'Update Project' : 'Add Project'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}