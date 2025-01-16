import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    timeout: 2000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true; // Include cookies in requests
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // simply return the response if no error occurs
        return response;
    },
    async (error) => {
        const originalRequest = error.config; // remember the original request
        console.log(error);

        // unauthorized user error
        if (error.response && error.response.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                // send post request to refresh the token
                await axios.post("/api/v1/users/refreshed-token", {}, { withCredentials: true });

                // retry the original request with the refreshed token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed, redirecting to login:", refreshError);
                // redirect to signup or login page
                window.location.href = "/signup";
            }
        }

        // reject the promise with the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
