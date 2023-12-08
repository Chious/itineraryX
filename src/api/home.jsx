import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem('token')

// Fetch home page daily recommended card
export const destination = async () => {
  try {
    const url = baseUrl+'/maps/random'
    const config = { headers: { Authorization: `Bearer ${token}` } }
    
    const result = await axios.get(url, config)

    return result.data.data;
  } catch (error) {
    console.error('[Get Daily Card failed]: ', error)
  }
};

// Get user notification
export const getNotification = async () => {
  try {
    const url = baseUrl + '/users/notifications'
    const config = { headers: { Authorization: `Bearer ${token}` } }
    
    const result = await axios.get(url, config)

    return result.data.data;
  } catch (error) {
    console.error('[Get notification failed]: ', error)
  }
}