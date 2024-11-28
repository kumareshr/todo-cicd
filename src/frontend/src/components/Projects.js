import React, { useState } from "react"
import { useProjectsValue } from "../context"
import { IndividualProject } from "./IndividualProject";

export const Projects = ({activeValue = true}) => {
  const [active, setActive] = useState(activeValue)
  const {projects} = useProjectsValue();

  return (
    projects && 
    projects.map( project => (
      <li key={`${project.project_id}`}
        className={active === project.project_id ? 'active sidebar__project' : 'sidebar__project'}
        onClick={() => {
            localStorage.setItem("active-project", project.project_id)
        }}
      >
        <IndividualProject project={project} setActive={setActive} />
      </li>
    ))
  )
}