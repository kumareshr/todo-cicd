import React from "react";
import {FaHashtag, FaPizzaSlice} from "react-icons/fa";

export const NonAuthHeader = ({darkMode, setDarkMode}) => {

  return (
    <header>
      <nav>
      <div className="logo">
          <FaHashtag/>
        </div>
        <div className="settings">
          <ul>
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
          </ul>
        </div>
      </nav>

    </header>
  )
}