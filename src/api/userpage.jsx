import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem('token')
const config = { headers: { Authorization: `Bearer ${token}` } }

export const getItinerary = async () => {
  const url = baseUrl+'/itineraries/2'

  const result = await axios.get(url, config)

  return result.data.data
}

export const createItinerary = async (payload) => {
  const url = baseUrl+'/itineraries/'

  const result = await axios.post(url, payload, config)

  return result.data.data
}

export const getItineraries = async () => {
  const url = baseUrl+'/itineraries/'

  const result = await axios.get(url, config)

  return result.data.data
}

export const deleteItinerary = async (payload) => {
  const url = baseUrl+'/itineraries/'
  const params = {itineraryId: payload}
  const config = { 
    headers: { Authorization: `Bearer ${token}` },
    data: params
  }
  const result = await axios.delete(url, config)

  return result.data.data
}

export const editItinerary = async (payload) => {
  const url = baseUrl+'/itineraries/'
  
  const result = await axios.put(url, payload, config)

  return result.data.data
}