import axios from "axios"

const api = axios.create({
   baseURL: "/api", // vite api
   headers: {
      "Content-Type": "application/json",
   }
})
export default api;