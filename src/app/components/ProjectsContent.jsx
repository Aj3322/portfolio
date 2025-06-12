import { useState } from 'react';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

export default function ProjectsContent({ projects, fetchProjects }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
    const handleEdit = (project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

    const handleEditSuccess = () => {
    setShowEditModal(false);
    fetchProjects();
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Add Project */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative h-full w-full md:w-64">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full border-gradient animate-border  pl-10 pr-4 py-2 bg-black/30 border border-blue-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
         onClick={() => {
  console.log("Opening modal");
  setShowAddProject(true);
}}
          className="w-full  md:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center space-x-2 border border-blue-700/50 hover:border-blue-500/70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="glass-panel h-lvh p-6 rounded-xl border border-blue-900/30 bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-sm shadow-lg">
        <ProjectList projects={filteredProjects} onEdit={handleEdit} refresh={fetchProjects} />
      </div>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <ProjectForm 
              onClose={() => setShowAddProject(false)}
            onSuccess={() => {
              fetchProjects();
              setShowAddProject(false);
            }} />
        </div>
      )}
        {/* Edit Project Modal */}
      {showEditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <ProjectForm 
              project={editingProject}
              onClose={() => setShowEditModal(false)}
              onSuccess={handleEditSuccess}
            />
        </div>
      )}
    </div>
  );
}