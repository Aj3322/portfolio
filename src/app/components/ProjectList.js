'use client';
import ProjectCard from './ProjectCard';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProjectForm from './ProjectForm';

export default function ProjectList({ projects, refresh ,onEdit}) {
  const [processing, setProcessing] = useState(false);


  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No projects found.
      </div>
    );
  }

  const handleDelete = async (projectId) => {
    if (processing) return;
    setProcessing(true);
    try {
      await axios.delete(`/api/projects`, { data: { projectId } });
      toast.success('Project deleted successfully');
      refresh();
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error(error.response?.data?.message || 'Failed to delete project');
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleStatus = async (projectId) => {
    if (processing) return;
    setProcessing(true);
    try {
      await axios.put(`/api/projects/${projectId}/toggle-status`);
      toast.success('Project status updated');
      refresh();
    } catch (error) {
      console.error('Failed to toggle status:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="grid w-full h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => {
          const key = project._id || project.id || index;
          return (
            <ProjectCard 
              key={key} 
              project={project}
              onDelete={handleDelete}
              onEdit={onEdit}
              onToggleStatus={handleToggleStatus}
            />
          );
        })}
      </div>
    </>
  );
}