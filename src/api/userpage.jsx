import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL

export const getItinerary = async (id) => {
  const url = baseUrl+`/itineraries/${id}`

  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const result = await axios.get(url, config)

  return result.data.data
}

export const createItinerary = async (payload) => {
  const url = baseUrl+'/itineraries/'
  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const result = await axios.post(url, payload, config)

  return result.data.data
}

export const getItineraries = async () => {
  const url = baseUrl+'/itineraries/'
  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const result = await axios.get(url, config)

  return result.data.data
}

export const deleteItinerary = async (payload) => {
  const url = baseUrl+'/itineraries/'
  const params = {itineraryId: payload}
  const token = localStorage.getItem('token')
  const config = { 
    headers: { Authorization: `Bearer ${token}` },
    data: params
  }
  const result = await axios.delete(url, config)

  return result.data.data
}

export const editItinerary = async (payload) => {
  const url = baseUrl+'/itineraries/'
  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const result = await axios.put(url, payload, config)

  return result.data.data
}

export const editUser = async (username, file) => {
  const formData = new FormData();
  const token = localStorage.getItem('token')
  const url = baseUrl+'/users/'
  formData.append("name", username);
  formData.append("avatar", file);

  const response = await axios({
    method: 'put',
    url: url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};


export const deleteParticipant = async (payload) => {
  const url = baseUrl+`/itineraries/participant?itineraryId=${payload.itineraryId}&participantId=${payload.participantId}`
  const token = localStorage.getItem('token')
  const config = { 
    headers: { Authorization: `Bearer ${token}` },
    data: payload
  }
  const result = await axios.delete(url, config)

  return result.data.data
}

export const addParticipant = async (payload) => {
  const url = baseUrl+'/itineraries/participant'
  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  try {
    const result = await axios.post(url, payload, config)
    return result.data
  } catch (error) {
    console.error('Error:', error.response.data);
    throw error;
  }
}