import axios from "axios";

const token = localStorage.getItem("token");
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getLatLng = async ({ day, itineraryId }) => {
  const url = `${baseUrl}/routes/latLng`;
  const queryParams = {
    itineraryId: itineraryId,
    startDate: "2023-01-01",
    endDate: "2023-01-03",
  };
  const config = {
    params: queryParams,
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios
    .get(url, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => console.log(err));

  const filterValue = Object.values(response)[day - 1];
  console.log(filterValue);

  return filterValue;
};
