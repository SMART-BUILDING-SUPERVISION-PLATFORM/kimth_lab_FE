import axios from "axios";

const useApi = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default useApi;
