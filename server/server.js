const express = require('express');
const cors = require('cors');
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// mock database
let projects = [
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
  ];


module.exports = app;


// Routes


// Homepage
app.get('/',(req,res) => {
    return res.send('Welcome to the home page');
});

// GET - Fetch all projects
app.get("/api/projects", (req, res) => res.json({
    status: "success", projects }));

// GET - Get project count
app.get("/api/projects/count", (req, res) => {
    res.json({ 
        status: "success",
        count: projects.length,
        message: `There are currently ${projects.length} projects`
    });
});
    
// POST - Add a new project
app.post("/api/projects", (req, res) => {
    if (!req.body.name) 
        return res.status(400).json({error: "Project content is required" });

    if (req.body.name.length < 3) {
        return res.status(400).json({ error: "Project name must be at least 3 characters long" });
    }

    const newProject = { id: projects.length + 1, name: req.body.name };
    projects.push(newProject);
    res.status(201).json({ status: "success", project: newProject });
   });

// PUT - Update a project
app.put("/api/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
        return res.status(404).json({ error: "Project not found" });
    }
    
    if (!req.body.name) {
        return res.status(400).json({ error: "Project name is required" });
    }
    
    if (req.body.name.length < 3) {
        return res.status(400).json({ error: "Project name must be at least 3 characters long" });
    }

    const updatedProject = {
        id: projectId,
        name: req.body.name
    };
    
    projects[projectIndex] = updatedProject;
    res.json({ status: "success", project: updatedProject });
});

// DELETE - Remove a project
app.delete("/api/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
        return res.status(404).json({ error: "Project not found" });
    }
    
    const deletedProject = projects.splice(projectIndex, 1);
    res.json({ status: "success", project: deletedProject[0] });
});

// DELETE - Remove ALL projects
app.delete("/api/projects", (req, res) => {
    const deletedCount = projects.length;
    projects = []; // Reset the projects array
    
    res.json({ 
        status: "success", 
        message: `Deleted all projects (${deletedCount} projects removed)`,
        deletedCount: deletedCount
    });
});
   
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});