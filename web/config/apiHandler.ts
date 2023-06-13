import Axios from 'axios';
import { ENV } from './ENV';

export const surakshaAPI = Axios.create({
  baseURL: `${ENV.api_base_path}/api/v1`,
});
