// axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with your actual base URL
  //baseURL: "http://192.168.2.97:8001",
});

export default instance;
