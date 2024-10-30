import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth";

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);
  return response.data;
};

export default { register }
