import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import '../styles/component/ProjectEntryForm.css';

export default function ProjectEntryForm({ onAdd }){
    const [projName, setProjName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!projName.trim()) {
            setError('Project name is required');
            return;
        }
        
        if (projName.trim().length < 3) {
            setError('Project name must be at least 3 characters');
            return;
        }

        try {
            await onAdd(projName);
            setProjName('');
        } catch (err) {
            setError(err.message);
        }
    }

    const handleInput = (e) => {
        setProjName(e.target.value);
        setError('');
    }

    return(
        <form className="project-form">
            <input 
                onChange={handleInput} 
                value={projName} 
                placeholder="Create new project..."
            />
            <button onClick={handleSubmit}>
              <FiPlus /> Create Project
            </button>
            {error && <div className="form-error">
              <FiAlertCircle /> {error}
            </div>}
        </form>
    );
}