import axios from 'axios';
import { DARK_SKY_API_KEY } from '../config/WeatherAPIKey';

export const fetchForecast = (long, lat) => {

    const url = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${long}`;
    
    return axios
    .get(url)
    .then(response => {

        const { currently, hourly, daily } = response.data;
        const humidity = currently.humidity * 100;
        const weatherObj = {
          temp: Math.round(currently.apparentTemperature), 
          title: currently.summary, 
          humidity, 
          wind: Math.round(currently.windSpeed),
          summary: hourly.summary,
          icon: daily.icon
        };
        
        //  hourly forecast (only need first 24)
        let hourlyForecast = [];
        for(let i=0; i <= 24; i++) {
          const date = new Date(hourly.data[i].time * 1000);
          let hour = date.getHours();
          let prettyTime = '';
        
           //convert if needed
           if(hour > 12) {
            hour = hour - 12;
            prettyTime = `${hour} PM`;
          } else if(hour == 0) {
            prettyTime = '12 AM';
          } else {
            prettyTime = `${hour} AM`;
          }

          hourlyForecast.push({ time: prettyTime, summary: hourly.data[i].summary, temp: Math.round(hourly.data[i].temperature), icon: hourly.data[i].icon });
        }

        //week forecast
        const weekArray = daily.data.map(entry => {
          const date = new Date(entry.time * 1000);
          const days = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
          let day = days[date.getDay()];

          return { day, icon: entry.icon, summary: entry.summary, tempHigh: Math.round(entry.temperatureHigh), tempLow: Math.round(entry.temperatureLow), precipProb: entry.precipProbablility };
        });

        weatherObj.hourlyForecast = hourlyForecast;
        weatherObj.weekForecast = weekArray;
        return weatherObj;
    })
    .catch(error => {
      console.warn('Failed to fetch forecast', {error, long, lat});
    });
};
