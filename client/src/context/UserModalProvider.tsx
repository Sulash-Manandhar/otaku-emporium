import React, { useState, createContext, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

interface UserModalInterface {
  isUserModalOpen: boolean;
  setIsUserModalOpen: (value: boolean) => void;
}

export const UserModalContext = createContext<UserModalInterface>({
  isUserModalOpen: false,
  setIsUserModalOpen: (value: boolean) => {},
});

export const useUserModalContext = () => useContext(UserModalContext);

const UserModalProvider: React.FC<Props> = ({ children }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  console.log(isUserModalOpen);

  return (
    <UserModalContext.Provider value={{ isUserModalOpen, setIsUserModalOpen }}>
      {children}
    </UserModalContext.Provider>
  );
};

export default UserModalProvider;
