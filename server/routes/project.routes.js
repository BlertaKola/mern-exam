const ProjectController = require('../controllers/project.controller')

module.exports = (app) => {
    app.post('/api/projects', ProjectController.createProject);     
    app.get('/api/projects', ProjectController.getProjects)
    app.patch('/api/projects/:id', ProjectController.changeProjectState)
    app.get('/api/projects/:id', ProjectController.getProject)
    app.delete('/api/projects/:id', ProjectController.removeProject)
} 