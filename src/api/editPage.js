import axios from 'axios';

//////////////////// config ////////////////////

const baseUrl = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem('token');
const config = { headers: { Authorization: `Bearer ${token}` } };

//////////////////// itinerary API ////////////////////

//  透過 id 取得指定行程的資訊
export const getItinerary = async (id) => {
  const url = baseUrl + `/itineraries/${id}`;

  try {
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

//////////////////// destinations API ////////////////////

// 透過行程的 id & 日期 來取得該行程的景點資料
export const getDestinations = async (id, date) => {
  try {
    const url = baseUrl + `/destinations/?itineraryId=${id}&date=${date}`;
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 新增Place資料
export const postMaps = async (placeId) => {
  try {
    const url = baseUrl + `/maps`;
    const reqBody = { placeId: placeId };
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 新增Destination資料
export const postDestinations = async (reqBody) => {
  try {
    const url = baseUrl + `/destinations`;
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 修改Destination資料
export const patchDestinations = async (destinationId, date) => {
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

// 刪除Destination資料
export const deleteDestinations = async (destinationId) => {
  try {
    const url = baseUrl + `/destinations/${destinationId}`;
    const res = await axios.delete(url, config);
  } catch (error) {
    console.log(error);
  }
};

//////////////////// routes API ////////////////////

// 取得兩個景點之間的交通路線資訊
export const getRoutes = async (itId, oId, dId) => {
  try {
    const url =
      baseUrl +
      `/routes/?itineraryId=${itId}&originId=${oId}&destinationId=${dId}`;
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 新增兩個景點之間的交通路線資訊
export const postRoutes = async (reqBody) => {
  try {
    const url = baseUrl + `/routes`;
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 修改兩個景點之間的交通方式
export const patchRoutes = async (routeId, mode) => {
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
