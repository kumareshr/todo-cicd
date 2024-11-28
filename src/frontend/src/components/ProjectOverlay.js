import React from 'react';
import { useProjectsValue } from '../context';

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const { projects } = useProjectsValue();

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li key={project.project_id}>
              <div
                onClick={() => {
                  setProject(project.project_id);
                  setShowProjectOverlay(false);
                }}
              >
                {project.project_name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};