import axios from 'axios';
import { getAccessToken } from './AuthService';
const BASE_URL = 'https://restcountries.eu/rest/v1/all';

export { getCountryData };

function getCountryData() {
    
    console.log("in api call " + getAccessToken());
    return axios.get(BASE_URL).then(response => {
        console.log(response.data);
        return response.data;

    }
        );
}
