import axios from "axios";
import queryString from "query-string";

const baseURL = "https://moonflix-api.vercel.app/api/v1/";

const publicClient = axios.create({
    baseURL,
    timeout: 5000, // Set a timeout of 5 seconds
    paramsSerializer: {
        encode: (params) => queryString.stringify(params), // Serialize query parameters
    },
});

// Request Interceptor
publicClient.interceptors.request.use(
    async (config) => {
        // Set common headers for public requests
        return {
            ...config,
            headers: {
                "Content-Type": "application/json",
            },
        };
    },
    (error) => {
        console.error("Public Client Request Error:", error.message);
        return Promise.reject(error);
    }
);

// Response Interceptor
publicClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data; // Return the actual data
        return response; // Return full response if no data
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error("Request timed out");
        } else if (error.response) {
            console.error("Public Client Response Error:", error.response.data || error.message);
        } else {
            console.error("Network Error:", error.message);
        }
        // Throw a meaningful error object
        return Promise.reject(error.response?.data || { message: "Network or server error" });
    }
);

export default publicClient;