import React, { useState } from 'react'
import {useProjectsValue} from "../context"
import { API_BASE_URL } from '../constants'

export const AddProject = ({shouldShow = false}) => {
  const [show, setShow] = useState(shouldShow)
  const [projectName, setProjectName] = useState('')

  const {setProjects} = useProjectsValue()


  const addProject = () => {
    let currentUser = JSON.parse(localStorage.getItem("user"))

    let userId = 0;

    if (currentUser !== null) {
      userId = currentUser.id
    }

    fetch(`${API_BASE_URL}/api/v1/projects/users/${userId}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({project_name: projectName})
    })


      setProjects([])
      setProjectName('')
      setShow(false)

      window.location.reload()

    return projectName
  }

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input">
          <input 
            value={projectName}
            onChange={ e => setProjectName(e.target.value)}
            className="add-project__name"
            type="text"
            placeholder="Name of your project"
          />
          <button
            className="add-project__submit"
            onClick={() => addProject()}
          >
            Add project
          </button>
          <span
            className="add-project__cancel"
            onClick={() => setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
        <span
          className="add-project__text"
          onClick={() => setShow(!show)}
        >
          Add project
        </span>
    </div>
  )

}