import axios from "axios";

const baseURL = process.env.RESTURL_SPEAKERS;

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
  },
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
      (//error.response.data.code === "token_not_valid" &&
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized") ||
      (error.response.status === 403 && error.response.statusText === "Forbidden")
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken && refreshToken !== "undefined") {
        const tokenParts = JSON.parse(window.atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        //console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("api/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] = "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] = "Bearer " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
       // console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;