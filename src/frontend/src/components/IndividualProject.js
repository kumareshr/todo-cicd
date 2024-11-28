import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelectedProjectValue } from '../context';
import { API_BASE_URL } from '../constants';


export const IndividualProject = ({ project, setActive }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (id) => {

    fetch('${API_BASE_URL}/api/v1/projects/delete/' + id, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(() => window.location.reload())
    .catch(err => console.log(err))
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <p className="sidebar__project-name" style={{width: "100vw", margin: "0"}} onClick={() => {
            setActive(project.project_id)
            setSelectedProject(project.project_id)
            window.location.reload()
        }}>{project.project_name}</p>
      
      
      <span
        className="sidebar__project-delete"
        onClick={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button onClick={() => deleteProject(project.project_id)}>
                Delete
              </button>
              <span onClick={() => setShowConfirm(!showConfirm)}>
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
