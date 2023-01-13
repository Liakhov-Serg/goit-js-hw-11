import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = `32810341-69b544567d84cbcabae0736a6`;

export function getGallery(value) {
    const config = {
            key: API_KEY,
            q: value,
            image_type: "photo",
            orientation: "horizontal",
        safesearch: "true",
        page: 1,
        per_page: 40,
        
    }
 const response = axios.get(`${BASE_URL}`,{ params: config });
    return response;

   
} 