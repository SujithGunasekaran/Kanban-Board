import axios from 'axios';
import { userUrl } from 'src/api/apiUrl';

export const userAxios = axios.create({
    baseURL: `${userUrl}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
