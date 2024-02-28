import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import './Project.css'
import moment from 'moment'
const Projects = () => {
    const [projects, setProjects] = useState([])
    const [updated, setUpdated] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/projects')
            .then(res => {
                // console.log(res)
                setProjects(res.data)
                setUpdated(!updated)
            })
            .catch(err => console.log(err))
    }, [updated])
    const changeState = (id, state) => {
        // e.preventDefault()
        console.log(state)
        console.log(id)
        axios.patch('http://localhost:8000/api/projects/' + id, { state: state })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    const parseDueDate = (dueDate) => {
        return moment(dueDate).format('MMM Do YY');
    };

    const removeproject = (id) => {
        console.log(id)
        axios.delete('http://localhost:8000/api/projects/' + id)
            .then(res => {
                console.log(res)
                setProjects(projects.filter(project => project._id !== id))
            })
    }
    return (
        <>

            <div className="container">
                <div className="column">
                    <div className="title">
                        <h1>Backlog</h1>

                    </div>
                    <div className="scrollable">
                        {projects.filter(e => e.state === 'Backlog').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((project, index) => {
                            const dueDate = parseDueDate(project.dueDate);
                            const isPastDue = moment(project.dueDate).isBefore(moment(), 'day');
                            return (
                                <div key={index} className="card">
                                    <div className="bold-text">
                                        {project.name}
                                    </div>
                                    <div >
                                        Due date:  <span className={`${isPastDue ? 'past-due' : ''}`}> {dueDate} </span> 
                                    </div>
                                    <button className="yellow" onClick={() => changeState(project._id, "in progress")}>Start Project</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="column">
                    <div className="title-progres">
                        <h1>In Progress</h1>
                    </div>
                    <div className="scrollable-content">
                        {projects.filter(e => e.state === 'in progress').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((project, index) => {
                             const dueDate = parseDueDate(project.dueDate);
                             const isPastDue = moment(project.dueDate).isBefore(moment(), 'day');
                            return (
                                <div key={index} className="card">
                                    <div className="bold-text">
                                        {project.name}
                                    </div>
                                    <div >
                                        Due date:  <span className={`${isPastDue ? 'past-due' : ''}`}> {dueDate} </span> 
                                    </div>
                                    <button className="green" onClick={() => changeState(project._id, "completed")}>Move to Completed</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="column">
                    <div className="title-completed">
                        <h1>Completed</h1>
                    </div>
                    <div className="scrollable-content">
                        {projects.filter(e => e.state === 'completed').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((project, index) => {
                            const dueDate = parseDueDate(project.dueDate);
                            const isPastDue = moment(project.dueDate).isBefore(moment(), 'day');
                            return(
                            <div key={index} className="card">
                                <div className="bold-text">
                                    {project.name}
                                </div>
                                <div >
                                        Due date:  <span className={`${isPastDue ? 'past-due' : ''}`}> {dueDate} </span> 
                                    </div>
                                <button className="red" onClick={() => removeproject(project._id)}>
                                    Remove Project
                                </button>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
            <Link to="/projects/new">Add new Project</Link>


        </>
    )
}
export default Projects