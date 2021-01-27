import axios from 'axios';
import { API_KEY } from './WeatherAPIKey';

export const fetchWeather = (long, lat) => {

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`;

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


/*
 fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`
        )
            .then(res => res.json())
            .then(results => {
                const description = results.weather[0].main;
                setTemp(results.main.temp);
                setLoading(false);
                setWeather(description);
                //this.setState({ temp: results.main.temp, loading: false, weatherCondition: description })
            })
            .catch((err) => console.log(err));
*/