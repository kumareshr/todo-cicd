import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';
import { API_BASE_URL } from '../constants';


export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = async () => {
    const projectId = project || selectedProject;
    console.log(`projectId: ${projectId}, project: ${project}, selectedProject: ${selectedProject}`)

    let currentUser = JSON.parse(localStorage.getItem("user"))
    let userId = 0;

    if (currentUser !== null) {
      userId = currentUser.id
    }

    fetch('${API_BASE_URL}/api/v1/tasks/create', {
      // method: 'GET',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "task":task,
        "project_id": projectId,
        "user_id": userId,
        "date": taskDate || ""
      })
    })

    setTask('');
    setProject('');
    setShowMain('');
    setShowProjectOverlay(false);

    window.location.reload()

    return (
      task &&
      projectId 
      // &&
      // firebase
      // .firestore()
      // .collection('tasks')
      // .add({
      //   archived: false,
      //   projectId,
      //   task,
      //   date: collatedDate || taskDate,
      //   userId: '1',
      // })
      // .then( () => {
      //   setTask('');
      //   setProject('');
      //   setShowMain('');
      //   setShowProjectOverlay(false);
      // })

      
    );
  };

  return (
    <div className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}>
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="add-task__submit"
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            }
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            onClick={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};