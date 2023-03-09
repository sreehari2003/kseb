import Axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

export const surakshaAPI = Axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

Session.addAxiosInterceptors(surakshaAPI);