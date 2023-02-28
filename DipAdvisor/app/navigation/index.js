import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import AuthenticatedStack from "./AuthenticatedStack";
import UnauthenticatedStack from "./UnauthenticatedStack";

const Navigation = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      }
    });

    return unsubscribe;
  }, []);
  return authenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />;
};

export default Navigation;
