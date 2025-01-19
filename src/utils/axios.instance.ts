import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    timeout: 2000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true; // Include cookies in requests
        // console.log("request config : ", config)
        return config;
    },
    (error) => {
        // console.log("request error : ", error)
        return Promise.reject(error);
    }
);

//Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest.url === "/api/v1/users/current-user" && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.log("send request to refresh the token")
                await axios.post("/api/v1/users/refreshed-token", {}, { withCredentials: true });
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed, redirecting to login');
                 // Avoid redirect loop
                 if (window.location.pathname !== '/signup') {
                    window.location.href = '/signup'; // Only redirect once
                }
                return Promise.reject(refreshError); // Important: Reject the promise after redirect
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
