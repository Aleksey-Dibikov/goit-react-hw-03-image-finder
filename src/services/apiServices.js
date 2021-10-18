import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23161944-2a0cfa2ec118e633f18262ab9';

axios.defaults.baseURL = BASE_URL;

const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  //   console.log(data);
  return data;
};

export default fetchImages;
