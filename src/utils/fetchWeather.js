import axios from 'axios';
import { OPEN_WEATHER_MAP_API_KEY } from '../config/WeatherAPIKey';

export const fetchWeather = (long, lat) => {

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${OPEN_WEATHER_MAP_API_KEY}&units=imperial`;

    return axios
    .post(url)
    .then(response => {
      console.info('Successfully fetched weather!', response);
      return response.data;
    })
    .catch(error => {
      console.warn('Failed to fetch weather', {error});
    });
};


