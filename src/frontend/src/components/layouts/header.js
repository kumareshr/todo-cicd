import React, { useState } from "react";
import {FaHashtag, FaPizzaSlice, FaSignOutAlt} from "react-icons/fa";
import { AddTask } from "../AddTask";

export const Header = ({darkMode, setDarkMode}) => {

  const [shouldShowMain, setShouldShowMain] = useState()
  const [showQuickAddTask, setShowQuickAddTask] = useState()

  return (
    <header>
      <nav>
      <div className="logo">
          <FaHashtag/>
        </div>
        <div className="settings">
          <ul>
            <li 
              className="settings__add"
              onClick={() => {
                setShowQuickAddTask(true)
                setShouldShowMain(true)
              }}
            >
              +
            </li>
            <li 
              className="settings__darkmode"
              onClick={() => {
                setDarkMode(!darkMode)
                if (localStorage.getItem("dark-mode") === "true") {
                  localStorage.setItem("dark-mode", false)
                } else {
                  localStorage.setItem("dark-mode", true)
                }
              }}
            >
              <FaPizzaSlice/>
            </li>
            <li
              className="settings__darkmode"
              onClick={() => {
                localStorage.removeItem('auth');
                localStorage.removeItem('user');
                window.location.reload()
              }}
            >
              <FaSignOutAlt/>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask 
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  )
}