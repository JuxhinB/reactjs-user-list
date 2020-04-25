import React, { createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserProviderProps {
  children: JSX.Element;
}
interface IUserContextTypes {}

const USER_CONTEXT_INITIAL_VALUES = {};

export const UserContext = createContext<IUserContextTypes>({
  ...USER_CONTEXT_INITIAL_VALUES,
});

function UserProvider({ children }: UserProviderProps) {
  const providerValue = {};

  return (
    <UserContext.Provider value={providerValue}>
      <>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          draggable={true}
          pauseOnHover={true}
        />
      </>
    </UserContext.Provider>
  );
}

export default UserProvider;
