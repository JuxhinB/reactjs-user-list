import React, { createContext, Dispatch, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import global from "../global";

interface UserProviderProps {
  children: JSX.Element;
}

interface UserContextTypes {
  isLoading: boolean;
  setIsLoading: Dispatch<boolean>;
}

const USER_CONTEXT_INITIAL_VALUES = {
  isLoading: false,
  setIsLoading: (isLoading: boolean) => undefined,
};

export const UserContext = createContext<UserContextTypes>({
  ...USER_CONTEXT_INITIAL_VALUES,
});

function UserProvider({ children }: UserProviderProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const providerValue = {
    isLoading,
    setIsLoading,
  };

  return (
    <UserContext.Provider value={providerValue}>
      <>
        {isLoading && <global.Loader/>}
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
