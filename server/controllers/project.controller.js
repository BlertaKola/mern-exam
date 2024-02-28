const Project = require('../models/project.model');   

module.exports.createProject = (request, response) => {
    Project.create(request.body) 
        .then(todo => response.json(todo))
        .catch(err => response.status(400).json(err));
}

module.exports.getProjects = (request, response) => {
    Project.find()
        .then(todos => response.json(todos))
        .catch(err => response.json(err))
}
module.exports.changeProjectState = (request, response) => {
    Project.findOne({_id:request.params.id})
        .then(todo => {
            todo.state = request.body.state
            todo.save()
            response.json(todo)
        })
}

module.exports.getProject = (request, response) => {
    Project.findOne({_id:request.params.id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

module.exports.removeProject = (request, response) => {
    Project.deleteOne({_id: request.params.id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}