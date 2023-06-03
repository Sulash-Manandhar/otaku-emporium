import { createContext, useState, useContext } from "react";

interface IsLoggedInContextData {
  loggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

const IsLoggedInContext = createContext<IsLoggedInContextData>({
  loggedIn: true,
  logIn: () => {},
  logOut: () => {},
});

export const useIsLoggedInContext = () => useContext(IsLoggedInContext);

type Props = {
  children: any;
};

const IsLoggedInProvider: React.FC<Props> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  function logIn() {
    setLoggedIn(true);
  }

  function logOut() {
    setLoggedIn(false);
  }

  const value: IsLoggedInContextData = {
    loggedIn,
    logIn,
    logOut,
  };

  return (
    <IsLoggedInContext.Provider value={value}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInProvider;
