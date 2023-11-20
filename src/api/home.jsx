import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem('token')

export const destination = async () => {
  const url = baseUrl+'/maps/random'
  const config = { headers: { Authorization: `Bearer ${token}` } }
  
  const result = await axios.get(url, config)

  return result.data.data;
};