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
  ({
    // error control
    response: {
      data: { code, message },
    },
  }) => {
    if (code === -424) {
      alert(message);
      window.location.href = "/auth/signin";
    }
  }
);

export default useApi;
