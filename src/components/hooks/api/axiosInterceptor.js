import axios from "axios";

const useApi = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

useApi.interceptors.response.use(
  (response) => response,
  (err) => {
    const errCode = err.response.data.code;
    if (errCode === -424) {
      window.location.href = "/auth/signin";
    } else return Promise.reject(err);
  }
);

export default useApi;
