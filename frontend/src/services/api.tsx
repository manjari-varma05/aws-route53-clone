import axios from "axios";

const api = axios.create({
    baseURL: "https://aws-route53-clone-8.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;