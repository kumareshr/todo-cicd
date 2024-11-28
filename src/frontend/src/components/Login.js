import React, { useState } from 'react';
import { useUsersValue } from "../context"

export const Login = ({auth, setAuth}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {users} = useUsersValue();

  return (
    <section className="content" style={{marginTop: "50px"}}>

      <div className={'add-task add-task__overlay'}>

        <div className="add-task__main" data-testid="add-task-main">

            <label>
              <span>Username:</span>
              <input
                className="add-task__content"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
      
            <label>
              <span>Password:</span>
              <input
                className="add-task__content"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

          <button
            className="add-task__submit"
            onClick={() => {

              users.forEach(user => {
                if (user.user.username === username) {
                  if (user.user.password === password) {
                    setAuth(true)
                    localStorage.setItem('auth', true)
                    localStorage.setItem('user', JSON.stringify({id: user.user.user_id, username: username}))
                    window.location.reload();
                  }
                }
              });
            }
          }
          >
            Login
          </button>

        </div>

    </div>
    </section>
  )
}