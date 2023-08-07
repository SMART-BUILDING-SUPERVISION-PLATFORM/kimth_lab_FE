import axios from "axios";

const useApi = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Credentials": "true",
  },
});

useApi.interceptors.response.use(
  (response) => response,
  (err) => {
    const { code: errCode } = err.response.data;
    if (errCode === -424) {
      window.location.href = "/auth/signin";
    } else return Promise.reject(err);
  }
);

export default useApi;
