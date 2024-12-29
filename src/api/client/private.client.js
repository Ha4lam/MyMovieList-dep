import axios from "axios";
import queryString from "query-string";

const baseURL = "https://moonflix-api.vercel.app/api/v1/";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params), // Serialize query parameters
  },
});

// Request Interceptor
privateClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("actkn"); // Retrieve token from localStorage
      if (!token) {
        console.warn("Authorization token is missing.");
      }
      return {
        ...config,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Add token to the Authorization header
        },
      };
    },
    (error) => {
      console.error("Private Client Request Error:", error.message);
      return Promise.reject(error);
    }
);

// Response Interceptor
privateClient.interceptors.response.use(
    (response) => {
      if (response && response.data) return response.data; // Return the actual data
      return response; // Return full response if no data
    },
    (error) => {
      console.error("Private Client Response Error:", error.response?.data || error.message);
      // Throw a meaningful error object
      return Promise.reject(error.response?.data || { message: "Network or server error" });
    }
);

export default privateClient;
