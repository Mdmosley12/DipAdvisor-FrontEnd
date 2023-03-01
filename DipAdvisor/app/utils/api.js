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

export const getTopLocations = () => {
  return DipAdvisorAPI.get("/locations").then(({ data: { locations } }) => {
    const topSixLocations = locations
      .sort((a, b) => a.votes - b.votes)
      .slice(0, 6);

    return topSixLocations;
  });
};

export const addLocation = (body) => {
  console.log(body, "axios body received");
  return DipAdvisorAPI.post("/locations", body).then(({ data }) => {
    console.log(data, "axios data returned");
    return data;
  });
};

export const getAllLocations = () => {
  return DipAdvisorAPI.get("/locations").then(({ data: { locations } }) => {
    return locations;
  });
};

export const addPhotoToLocation = (body, location_id) => {
  return DipAdvisorAPI.patch(`/photos/${location_id}`, body).then(
    ({ data: { location } }) => {
      return location;
    }
  );
};
