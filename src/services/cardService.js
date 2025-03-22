import axios from "axios";
import { API_ROUTES } from "../config/apiRoutes";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const fetchCards = async () => {
  const res = await axios.get(`${API_BASE}${API_ROUTES.DRAW_CARDS}`);
  return res.data.response;
};

export const sortCards = async (cards) => {
  const res = await axios.post(`${API_BASE}${API_ROUTES.SORT_CARDS}`, { cards });
  return res.data.response;
};