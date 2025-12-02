import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '#'; 

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  };

  const { data } = await axios.get(BASE_URL, { params });
  return data; 

}
