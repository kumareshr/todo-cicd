import React, { useEffect } from 'react';
import { useTasks } from '../hooks';
import { Checkbox } from "./Checkbox"

import { useProjectsValue} from '../context'
import { AddTask } from './AddTask';

export const Tasks = () => {
  const {projects} = useProjectsValue();
  const {tasks} = useTasks();

  useEffect(() => {
    document.title = `Todoist`;
  });

  if (projects.length > 0) {
    return (
      <div className="tasks" data-testid="tasks">
        <h2>Tasks</h2>
  
        <ul className="tasks__list">
          {tasks.map((task) => (
            <li key={`${task.task_id}`}>
              <Checkbox id={task.task_id} taskDesc={task.task} />
              <span>{task.task}</span>
              <span style={{marginLeft:"20px"}}>{task.date}</span>
            </li>
          ))}
        </ul>
  
        <AddTask />
      </div>
    );
  } else {
    return (
      <div className="tasks" data-testid="tasks">
        <h2>Tasks</h2>
  
        <p>Add a project, before you add a task!</p>
      </div>
    );
  }
}