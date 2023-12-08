import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL

// Fetch home page daily recommended card
export const destination = async () => {
  try {
    const url = baseUrl+'/maps/random'
    const token = localStorage.getItem('token')
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
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }
    
    const result = await axios.get(url, config)

    return result.data.data;
  } catch (error) {
    console.error('[Get notification failed]: ', error)
  }
}

// Change notification isRead prop
export const changeNotificationIsRead = async (payload) => {
  try {
    const url = baseUrl + '/users/notifications'
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const data = {notificationId: payload}

    const result = await axios.patch(url, data, config)

    return result.data.data
  } catch (error) {
    console.error('[Change notification isRead failed]: ', error)
  }
}