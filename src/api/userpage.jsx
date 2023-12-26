import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL

// For get itinerary participants use
export const getItinerary = async (id) => {
  try {
    const url = baseUrl+`/itineraries/${id}`
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const result = await axios.get(url, config)
    return result.data.data
  } catch (error) {
    console.error('[Get Itineraries failed]: ', error)
  }
}

// Create new Itinerary
export const createItinerary = async (payload) => {
  try {
    const url = baseUrl+'/itineraries/'
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const result = await axios.post(url, payload, config)
    return result.data.data
  } catch (error) {
    console.error('[Create Itinerary failed]: ', error)
  }
}

// Fetch user's total Itineraries
export const getItineraries = async () => {
  try {
    const url = baseUrl+'/itineraries/'
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const result = await axios.get(url, config)
    return result.data.data
  } catch (error) {
    console.error('[Get Itineraries failed]: ', error)
  }
}

// Delete single Itinerary
export const deleteItinerary = async (payload) => {
  try {
    const url = baseUrl+'/itineraries/'
    const params = {itineraryId: payload}
    const token = localStorage.getItem('token')
    const config = { 
      headers: { Authorization: `Bearer ${token}` },
      data: params
    }

    const result = await axios.delete(url, config)
    return result.data.data
  } catch (error) {
    console.error('[Delete Itinerary failed]: ', error)
  }
}

// Edit single Itinerary title, start day & end day
export const editItinerary = async (payload) => {
  try {
    const url = baseUrl+'/itineraries/'
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const result = await axios.put(url, payload, config)
    return result.data.data
  } catch (error) {
    console.error('[Edit Itinerary failed]: ', error)
  }
}

// Edit user name & avatar
export const editUser = async (username, file) => {
  try {
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
  } catch (error) {
    return error
  }
};

// Delete single participant inside a Itinerary
export const deleteParticipant = async (payload) => {
  try {
    const url = baseUrl+`/itineraries/participant?itineraryId=${payload.itineraryId}&participantId=${payload.participantId}`
    const token = localStorage.getItem('token')
    const config = { 
      headers: { Authorization: `Bearer ${token}` },
      data: payload
    }
    const result = await axios.delete(url, config)

    return result.data.data
  } catch (error) {
    console.error('[Delete Participant failed]: ', error)
  }
}

// Add participant to a Itinerary
export const addParticipant = async (payload) => {
  try {
    const url = baseUrl+'/itineraries/participant'
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const result = await axios.post(url, payload, config)
    return result.data
  } catch (error) {
    console.error('[Add Participant failed]: ', error);
  }
}

// Fetch total joined itineraries id
export const getJoinedItinerariesId = async () => {
  try {
    const url = baseUrl + '/users/itineraryId'
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const result = await axios.get(url, config)
    return result.data.data.itineraryId
  } catch (error) {
    console.error('[Get total joined itineraries id failed]: ', error)
  }
}