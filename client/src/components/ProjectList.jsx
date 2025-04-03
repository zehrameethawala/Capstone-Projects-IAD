import ProjectItem from './ProjectItem';
import '../styles/component/ProjectList.css';
import { FiTrash2, FiPackage } from 'react-icons/fi';

export default function ProjectList({ projects, onDelete, onDeleteAll, onEdit }) {
  if (!projects.length) return (
    <div className="empty-state">
      <FiPackage className="empty-icon" />
      <p className="empty-message">No projects found</p>
      <p>Start by creating a new project</p>
    </div>
  );

  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectItem
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      <div className="action-buttons">
        <button 
          onClick={onDeleteAll} 
          className="danger-btn"
        >
          <FiTrash2 /> Clear All
        </button>
      </div>
    </div>
  );
}