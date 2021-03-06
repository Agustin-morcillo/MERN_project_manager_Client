import React, { useContext, useState, useEffect } from "react"

import ProyectContext from "../../context/projects/ProjectContext"
import TaskContext from "../../context/tasks/TaskContext"

export default function TaskForm() {
  const [newTask, setNewTask] = useState({
    name: "",
    projectId: null,
  })
  const { name } = newTask

  const ProjectsContext = useContext(ProyectContext)
  const { projectSelected } = ProjectsContext

  const TasksContext = useContext(TaskContext)
  const {
    addTask,
    formError,
    showFormError,
    getTasks,
    taskSelected,
    editTask,
  } = TasksContext

  useEffect(() => {
    if (taskSelected) {
      setNewTask(taskSelected)
    }
    // eslint-disable-next-line
  }, [taskSelected])

  if (projectSelected.length < 1) {
    return null
  }
  const [currentProject] = projectSelected

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      return showFormError()
    }

    if (taskSelected) {
      editTask(newTask)
    } else {
      newTask.projectId = currentProject._id
      addTask(newTask)
    }

    getTasks(currentProject._id)

    setNewTask({
      ...newTask,
      name: "",
    })
  }

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>

        <div className="input-container">
          <button className="btn btn-primary btn-submit btn-block">
            {taskSelected ? "Editar Tarea" : "Agregar Tarea"}
          </button>
        </div>
        {formError && (
          <p className="message error">El nombre de la tarea es obligatorio</p>
        )}
      </form>
    </div>
  )
}
