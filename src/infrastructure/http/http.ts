import axios from "axios";
import { ApiUrls } from "../../environments/environments";

const http = axios.create({
  baseURL: ApiUrls.msSecurity,
  timeout: 10000,
});

http.interceptors.request.use((config) => {
  //const token = localStorage.getItem("accessToken");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTJmMzA4ZDk0YjQ4ZTg2ZDZiMDZlMyIsImVtYWlsIjoiZGFuaWVsb2FyaWFzMTFAZ21haWwuY29tIiwicm9sZSI6IkFETUlOSVNUUkFET1IiLCJmdWxsbmFtZSI6Ikplc3VzIEFyaWFzIiwiaWF0IjoxNzYxMjM2OTg4LCJleHAiOjE3NjEyNDc3ODh9.vWGqPq1PsDq3TEh5jNlo1H0f0UJVNWoBPo8icf88sf8";
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
