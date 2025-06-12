'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiEdit2, FiTrash2, FiExternalLink, FiGithub, FiEye, FiEyeOff } from 'react-icons/fi';

export default function ProjectCard({ project, onEdit, onDelete, onToggleStatus }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(project._id);
    setShowDeleteConfirm(false);
  };

  const handleToggleStatus = async () => {
    try {
      console.log(project);
      await onToggleStatus(project._id);
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  return (
    <>
      <div className="relative group rounded-xl overflow-hidden border border-blue-900/20 bg-gradient-to-br from-blue-900/10 to-black/20 backdrop-blur-sm shadow-lg hover:shadow-blue-500/20 transition-all duration-300 w-80 h-80 hover:-translate-y-2 cursor-pointer">

        {/* Admin controls */}
        <div className="absolute top-3 right-3 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Status toggle button */}
          <button 
            onClick={handleToggleStatus}
            className={`p-2 rounded-full backdrop-blur-sm border transition-all hover:scale-110 ${
              project.status === 'public' 
                ? 'bg-green-900/70 hover:bg-green-800/80 border-green-700/50 text-white' 
                : 'bg-purple-900/70 hover:bg-purple-800/80 border-purple-700/50 text-white'
            }`}
            aria-label={`Toggle project visibility (currently ${project.status})`}
          >
            {project.status === 'public' ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={() => onEdit(project)}
            className="p-2 bg-blue-900/70 hover:bg-blue-800/80 rounded-full backdrop-blur-sm border border-blue-700/50 text-white transition-all hover:scale-110"
            aria-label="Edit project"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 bg-red-900/70 hover:bg-red-800/80 rounded-full backdrop-blur-sm border border-red-700/50 text-white transition-all hover:scale-110"
            aria-label="Delete project"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Status indicator badge */}
        <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
          project.status === 'public' 
            ? 'bg-green-900/30 border-green-700/50 text-green-300' 
            : 'bg-purple-900/30 border-purple-700/50 text-purple-300'
        }`}>
          {project.status === 'public' ? 'Public' : 'Private'}
        </div>

        {/* Project image */}
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Project content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
          <p className="text-gray-300 mb-3 line-clamp-2 text-sm">{project.shortDescription}</p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map(tech => (
              <span 
                key={tech} 
                className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800/50 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="mt-auto flex space-x-3">
            {project.liveUrl && (
              <Link 
                href={project.liveUrl} 
                target="_blank" 
                className="flex items-center px-3 py-1.5 bg-blue-600/90 hover:bg-blue-500/90 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20 border border-blue-700/50 hover:border-blue-500/70 text-sm"
              >
                <FiExternalLink className="mr-2" />
                Live Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link 
                href={project.githubUrl} 
                target="_blank" 
                className="flex items-center px-3 py-1.5 bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-gray-500/20 border border-gray-700/50 hover:border-gray-500/70 text-sm"
              >
                <FiGithub className="mr-2" />
                GitHub
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-blue-900/30 to-black/50 border border-blue-900/30 rounded-xl shadow-2xl backdrop-blur-lg p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-white">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete &quot;{project.title}&quot;? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/60 text-white rounded-lg border border-gray-600/50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600/90 hover:bg-red-500/90 text-white rounded-lg border border-red-700/50 transition-all hover:shadow-lg hover:shadow-red-500/20"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}