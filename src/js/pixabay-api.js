import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53361848-9c0672c52b1512c0ed401e412'; 

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