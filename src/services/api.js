import axios from 'axios';

export const api = axios.create({
  baseURL: "https://rocketnotes-api-1ukc.onrender.com"
});