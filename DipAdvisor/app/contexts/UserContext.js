import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({ name: "Ben" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

/* 
To use the context, you need to:
1) import the components
        import { UserContext } from "../contexts/UserContext";
        import { useContext } from "react";
2) create a variable of the value in your function
        const userValue = useContext(UserContext);
*/
