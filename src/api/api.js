import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api", // ✅ backend port must match STS
});
