import { FiTrash } from "react-icons/fi";
import '../styles/component/DeleteButton.css';

export default function DeleteButton({ projectId, onDelete }) {
  return (
    <button
      onClick={() => onDelete(projectId)}
      className="delete-btn"
    >
      <FiTrash /> Delete
    </button>
  );
}