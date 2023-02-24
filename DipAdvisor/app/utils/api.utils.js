import axios from "axios";

const dipAdvisor = axios.create({
  baseURL: "https://dipadvisor.onrender.com/api/",
});

export const addLocation = (body) => {
  return dipAdvisor.post("/locations", body).then(({ data }) => {
    return data;
    
export const getTopLocations = () => {
  return dipAdvisor.get("/locations").then(({ data: { locations } }) => {
    const topSixLocations = locations
      .sort((a, b) => a.votes - b.votes)
      .slice(0, 6);

    return topSixLocations;
  });
};
