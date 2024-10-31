import axios from "axios";

export const callAPI = axios.create({
    baseURL: "http://localhost:2024",
});


