import React, { useState } from 'react';
import {Header} from "./components/layouts/header"
import {NonAuthHeader} from "./components/layouts/nonAuthHeader"
import {Content} from "./components/layouts/content"
import "./App.css"

import {ProjectsProvider, SelectedProjectProvider, UsersProvider} from "./context"
import { Login } from './components/Login';

export function App({darkModeDefault=false}) {

  const [darkMode, setDarkMode] = useState(darkModeDefault)

  const [auth, setAuth] = useState(localStorage.getItem('auth') || false)

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <UsersProvider>
        {auth && (localStorage.getItem('auth')==="true") ?
          (
            <main className={localStorage.getItem("dark-mode") === "true" ? "darkmode" : undefined}>
              <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
              <Content/>
            </main>
          )
          :
          (
            <main className={localStorage.getItem("dark-mode") === "true" ? "darkmode" : undefined}>
              <NonAuthHeader darkMode={darkMode} setDarkMode={setDarkMode}/>
              <Login auth={auth} setAuth={setAuth}/>
            </main>
          )
          }
        </UsersProvider>
      </ProjectsProvider>
    </SelectedProjectProvider>
  )
}

export default App;
