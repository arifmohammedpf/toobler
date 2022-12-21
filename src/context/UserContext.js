import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  return (
    <AppContext.Provider
      value={{
        userList,
        setUserList,
        isUsersLoading,
        setIsUsersLoading,
        alert,
        setAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
