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

    console.log(error.response.data.code)

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
        // Check if not autheticated
      error.response.status === 403 && error.response.statusText === "Forbidden" ||
      error.response.status === 500
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
              //console.log(err);
            });
        } else {

          //router.push('/login')
          //console.log("Refresh token is expired", tokenParts.exp, now);
          
          if(window.location.href === windowURL){
            return Promise.reject(error);
          }else{
            window.location.href = "/login/";
          } 
        }
        return Promise.reject(error);
      } else {
       // console.log("Refresh token not available.");
       if(window.location.href === windowURL){
        return Promise.reject(error);
       }else{
        window.location.href = "/login/";
       }
       //router.push('/login')
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
