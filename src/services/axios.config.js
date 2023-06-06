import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 30000,
  timeoutErrorMessage: "Server timed out...",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "np",
  },
});
// login
// axiosInstance.post("v1/auth/login")

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 400, 401, 403, 500
    if (error.code === "UNAUTHORIZED") {
      throw error.response;
    } else if (error.code === "FORBIDDEN") {
      throw error.response;
    } else if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error("Internal server error: ", error);
    } else {
      throw error.response;
    }
    // console.log("Interceptor: ",error)
  }
);

export default axiosInstance;
