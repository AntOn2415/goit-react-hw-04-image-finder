import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const apiKey = '35375960-33ece11f0993b514084206b61';
const perPage = 12;

async function fetchGallery(searchQuery, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );
    const gallery = response.data.hits;

    return gallery;
  } catch (error) {
    throw new Error(error);
  }
}

export { fetchGallery };
export { perPage };
