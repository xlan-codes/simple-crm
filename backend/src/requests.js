import axios from 'axios';
import { CONSTANTS } from './constants';

const API_ROOT =  CONSTANTS.url

axios.defaults.baseURL = API_ROOT;

export const fetchRooms = () => {
    return axios.get(`/room`)
    .then(res => res.data)
}