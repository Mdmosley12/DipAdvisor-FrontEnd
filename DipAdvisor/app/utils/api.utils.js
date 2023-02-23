import axios from "axios";

const dipAdvisor = axios.create({
  baseURL: "https://dipadvisor.onrender.com/api/",
});

export const addLocation = (body) => {
  return dipAdvisor.post("/locations", body).then(({ data }) => {
    return data;
  });
};
