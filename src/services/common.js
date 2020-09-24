import api from "./api";

export const getPlanetsService = data => api.get(`https://reqres.in/api/users?page=2`);