import { createContext, useEffect, useState } from "react";
import { getAllLocations } from "../utils/api";

export const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllLocations().then((data) => {
      setLocations(data);
    });
  }, []);

  const updatedView = () => {
    getAllLocations().then((data) => {
      setLocations(data);
    });
  };

  return (
    <LocationsContext.Provider value={{ locations, setLocations, updatedView }}>
      {children}
    </LocationsContext.Provider>
  );
};
