import axios from 'axios';

let API = axios.create({
    baseURL: "https://demo7276224.mockable.io/",
    headers: {
        Pragma: 'no-cache'
    }
});

export default API;