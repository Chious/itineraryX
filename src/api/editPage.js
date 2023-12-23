import axios from "axios";

//////////////////// config ////////////////////

const baseUrl = import.meta.env.VITE_BASE_URL;

//////////////////// itinerary API ////////////////////

// fetch the data of a certain itinerary by id
export const getItinerary = async (id) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const url = baseUrl + `/itineraries/${id}`;
  try {
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    return { statusCode: error.response.status };
  }
};

//////////////////// destinations API ////////////////////

// fetch the destinations of a certain itinerary by id & date
export const getDestinations = async (id, date) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url = baseUrl + `/destinations/?itineraryId=${id}&date=${date}`;
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    if (error.response.status !== 404)
      console.log('[GET destinations failed]: ', error);
  }
};

// create Place data
export const postMaps = async (placeId) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url = baseUrl + `/maps`;
    const reqBody = { placeId: placeId };
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// create Destination data
export const postDestinations = async (reqBody) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url = baseUrl + `/destinations`;
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// modify Destination data
export const patchDestinations = async (destinationId, date) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url = baseUrl + `/destinations`;
    const reqBody = {
      destinationId: destinationId,
      date: date,
    };
    const res = await axios.patch(url, reqBody, config);
  } catch (error) {
    console.log(error);
  }
};

// delete Destination data
export const deleteDestinations = async (destinationId) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url = baseUrl + `/destinations/${destinationId}`;
    const res = await axios.delete(url, config);
  } catch (error) {
    console.log(error);
  }
};

//////////////////// routes API ////////////////////

// get the route between the two locations
export const getRoutes = async (itId, oId, dId) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url =
      baseUrl +
      `/routes/?itineraryId=${itId}&originId=${oId}&destinationId=${dId}`;
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    if (error.response.status !== 404)
      console.log('[GET routes failed]: ', error);
  }
};

// create the route data between the two locations
export const postRoutes = async (reqBody) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url = baseUrl + `/routes`;
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// modify the route data between the two locations
export const patchRoutes = async (routeId, mode) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const url = baseUrl + `/routes`;
    const reqBody = {
      routeId: routeId,
      transportationMode: mode,
    };
    const res = await axios.patch(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
