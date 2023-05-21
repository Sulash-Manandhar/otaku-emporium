import { createContext, useState, useContext } from "react";

interface IsLoggedInContextData {
  loggedIn: boolean;
  handleLogIn: () => void;
  handleLogOut: () => void;
}

const IsLoggedInContext = createContext<IsLoggedInContextData>({
  loggedIn: true,
  handleLogIn: () => {},
  handleLogOut: () => {},
});

export const useIsLoggedInContext = () => useContext(IsLoggedInContext);

type Props = {
  children: any;
};

const IsLoggedInProvider: React.FC<Props> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  function handleLogIn() {
    setLoggedIn(true);
  }

  function handleLogOut() {
    setLoggedIn(false);
  }

  const value: IsLoggedInContextData = {
    loggedIn,
    handleLogIn,
    handleLogOut,
  };

  return (
    <IsLoggedInContext.Provider value={value}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInProvider;
