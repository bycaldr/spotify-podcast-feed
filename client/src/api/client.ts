import Axios from "axios";

const apiClient = Axios.create({
  baseURL: process.env.API_LOCATION,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { apiClient };
