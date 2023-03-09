import Axios from 'axios';

export const surakshaAPI = Axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});
