import React,{useContext, useState} from 'react'
import ProyectContext from "../../context/projects/ProjectContext"

export default function NewProject() {

    const ProjectsContext = useContext(ProyectContext)
    const {newProjectForm,showForm,addProject,formError,showError} = ProjectsContext

    const [newProject, setNewProject] = useState({
        name:"",
        id:""
    })
    const {name} = newProject

    const handleChange = (e) => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!name.trim()) {
            return showError()
        }
        
        addProject(newProject)
        
        setNewProject({
            name:""
        })
    }

    return (
        <>
            <button
                className="btn btn-block btn-primary"
                onClick={()=> showForm()}
            >Nuevo Proyecto</button>

            {
                newProjectForm
                &&
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={handleSubmit}
                >
                    <input 
                        type="text"
                        className="input-text"
                        value={name}
                        placeholder="Nombre Proyecto"
                        name="name"
                        onChange={handleChange}
                    />
    
                    <button
                        className="btn btn-block btn-primary"
                    >Agregar Proyecto</button>
                </form>
            }
             {formError && <p className="mensaje error">Debes ingresar un nombre</p>}
        </>
        
    )
}
