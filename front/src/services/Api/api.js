import axios from 'axios';
import { API_URL } from './config';
export default axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type":"application/json",
        'Access-Control-Allow-Headers': 'Authorization',
        "x-access-token": localStorage.getItem('@accessToken'),
        'Authorization': 'Bearer ' + localStorage.getItem('@accessToken'),
    },
})
