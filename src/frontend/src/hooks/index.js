import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';


let currentUser = JSON.parse(localStorage.getItem("user"))
let userId = 0;

if (currentUser !== null) {
  userId = currentUser.id
}

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    
    fetch("${API_BASE_URL}/api/v1/tasks")
    .then( tasks => tasks.json())
    .then( tasks => tasks.filter(task => task.user.user_id === userId)) // user-id <--- working
    .then( tasks => tasks.filter(task => task.archived === false)) // archived <--- working
    .then( tasks => tasks.filter(task => task.project.project_id === (localStorage.getItem("active-project") ? parseInt(localStorage.getItem("active-project")) : 1)
      // localStorage.setItem("active-project", project.project_id)
    )) // user-id <--- working
    .then( json => {

      if (JSON.stringify(json) !== JSON.stringify(tasks)) {
        setTasks([...json]);
      }
    })
   
}, [tasks]);

  return { tasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    fetch("${API_BASE_URL}/api/v1/projects")
    .then( projects => projects.json())
    .then( projects => projects.filter(project => project.user.user_id === userId)) // user-id <--- working
    .then( json => {  
      if (JSON.stringify(json) !== JSON.stringify(projects)) {
        setProjects([...json]);
      }
    })
  }, [projects]);

  return { projects, setProjects };
};


export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("${API_BASE_URL}/api/v1/users")
    .then( projects => projects.json())
    // .then( projects => projects.filter(project => project.user.user_id === getProject)) // user-id <--- working
    .then( json => {  
      if (JSON.stringify(json) !== JSON.stringify(users)) {
        setUsers([...json]);
      }
    })
  }, [users]);

  return { users, setUsers };
};