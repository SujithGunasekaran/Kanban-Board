import axios from 'axios';
import { userUrl } from './apiUrl';

export const userAxios = axios.create({
    baseURL: `${userUrl}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
