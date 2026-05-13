import axios from "axios";

const API_URL = "http://localhost:5000";

export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_URL}/photos`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des photos :", error);
    return [];
  }
};