import axios from "axios";

const DipAdvisorAPI = axios.create({
  baseURL: "https://dipadvisor.onrender.com/api",
});

export const getSingleLocation = (location_id) => {
  return DipAdvisorAPI.get(`/locations/${location_id}`).then(({ data }) => {
    return data.location;
  });
};

export const patchLocation = (location_id) => {
  return DipAdvisorAPI.patch(`/locations/${location_id}`).then(({ data }) => {
    return data.updatedLocation;
  });
};
