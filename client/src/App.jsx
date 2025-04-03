import { useState, useEffect } from 'react';
import ProjectEntryForm from './components/ProjectEntryForm';
import ProjectList from './components/ProjectList';
import { FiActivity, FiPlus, FiSettings } from 'react-icons/fi';
import { 
  fetchProjects,
  addProject as apiAddProject,
  deleteProject as apiDeleteProject,
  deleteAllProjects as apiDeleteAllProjects,
  updateProject as apiUpdateProjects
} from './api/projectService';
import './styles/App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First get projects - this is our source of truth
      const projectsData = await fetchProjects();
      setProjects(projectsData.projects);
      
      // Then get count (optional - only if you need separate count)
      try {
        const countData = await fetchProjectCount();
        setProjectCount(countData.count);
      } catch (countError) {
        // If count fails, fall back to projects length
        setProjectCount(projectsData.projects.length);
        console.warn('Count fetch failed, using projects length:', countError);
      }
      
    } catch (err) {
      setError(err.message);
      // Reset to empty state on complete failure
      setProjects([]);
      setProjectCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddProject = async (name) => {
    try {
      const { project } = await apiAddProject(name);
      setProjects([project, ...projects]);
      setProjectCount(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await apiDeleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      setProjectCount(prev => prev - 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditProject = async (id, newName) => {
    try {
      const { project } = await apiUpdateProjects(id, newName);
      setProjects(projects.map(p => 
        p.id === id ? project : p
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAllProjects = async () => {
    if (window.confirm("Are you sure you want to delete all projects?")) {
      try {
        await apiDeleteAllProjects();
        setProjects([]);
        setProjectCount(0);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="app">Loading...</div>;

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">🔮 Capstone Projects</div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Project Dashboard</h1>
          <div className="stats-card">
            <span>📊 Total Projects: {projectCount}</span>
          </div>
        </div>

        <ProjectEntryForm onAdd={handleAddProject} />
        
        {error && <div className="error-message">{error}</div>}

        <ProjectList 
          projects={projects}
          onDelete={handleDeleteProject}
          onEdit={handleEditProject}
          onDeleteAll={handleDeleteAllProjects}
        />
      </div>
    </div>
  );
}

export default App;