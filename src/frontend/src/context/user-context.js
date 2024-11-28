import React, { createContext, useContext } from 'react';

import { useUsers } from '../hooks';

export const UserContext = createContext();
export const UsersProvider = ({ children }) => {
  const { users, setUsers } = useUsers();

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsersValue = () => useContext(UserContext);
