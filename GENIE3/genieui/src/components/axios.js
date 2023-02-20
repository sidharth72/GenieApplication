import axios from "axios";
import { useRouter } from "next/router";

const baseURL = process.env.RESTURL_SPEAKERS;
const windowURL = "http://genie-frontend.herokuapp.com/login"


var get_data = "";

if (typeof window !== "undefined") {
  get_data = localStorage.getItem("access_token");
} else {
  null
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    Authorization: get_data ? "Bearer " + get_data : null,

    "Content-Type": "application/json",
    accept: "application/json",
  }


});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === baseURL + "api/token/refresh/") {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      // Checking if token is not valid
      (error.response.data.code === "token_not_valid" &&
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized")
      ||
      // Check if not authenticated
      error.response.status === 403 && error.response.statusText === "Forbidden" ||
      error.response.status === 500
    ) {

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken && refreshToken !== "undefined") {
        const tokenParts = JSON.parse(window.atob(refreshToken.split(".")[1]));
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          try {
            const response = await axiosInstance.post("api/token/refresh/", { refresh: refreshToken });
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            axiosInstance.defaults.headers["Authorization"] = "Bearer " + response.data.access;
            originalRequest.headers["Authorization"] = "Bearer " + response.data.access;

            return axiosInstance(originalRequest);
          } catch (err) {
            // Handle error while refreshing token
            console.log("Error while refreshing token:", err);

            // Redirect user to login page
            window.location.href = "/login/";
            return Promise.reject(error);
          }
        } else {
          // Redirect user to login page as the refresh token is expired
          window.location.href = "/login/";
          return Promise.reject(error);
        }
      } else {
        // Refresh token not available, redirect to login page
        window.location.href = "/login/";
        return Promise.reject(error);
      }
    }

    // Specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;