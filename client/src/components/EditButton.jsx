import { FiEdit } from 'react-icons/fi';
import '../styles/component/EditButton.css';

export default function EditButton({ project, onEdit }) {
    const handleEdit = async (id, currentContent) => {
      const newName = prompt('Edit project:', currentContent);
      if (newName !== null && newName.trim() !== '') {
        try {
          await onEdit(id, newName);
        } catch (err) {
          alert('Failed to update project: ' + err.message);
        }
      }
    };
  
    return (
      <button 
        onClick={() => handleEdit(project.id, project.name)}
        className="edit-btn"
      >
        <FiEdit /> Edit
      </button>
    );
  }