import axios from 'axios';
import { API_KEY } from './WeatherAPIKey';

export const fetchForecast = (long, lat) => {

    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`;
  
    return axios
    .post(url)
    .then(response => {
      console.log('Successfully fetched forecast!', response);
      return response.data;
    })
    .catch(error => {
      console.log('Failed to fetch forecast', {error, long, lat});
    });
};

// const fetchForecast = (long, lat) => {
//     fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`
//     ).then(res => res.json())
//         .then(jsonResults => {
//             const convertedDate = new Date(jsonResults.list[0].dt * 1000);
//             const weatherForecastArray = [];
//             let index = 0;
//             const datesArray = jsonResults.list.map((entry) => {
//                 const date = new Date(entry.dt * 1000);
//                 const dateString = date.toString();
//                 if (dateString.includes('13:00')) {
//                     //fconsole.log("string at 13:00: ", dateString);
//                     const weekDay = dateString.slice(0, 4);
//                     weatherForecastArray[index] = { weekDay: weekDay, temp: entry.main.temp }
//                     index++;
//                 }
//                 return new Date(entry.dt * 1000);
//             });
//             //this.setState({ weatherForecastArray });
//             setForecast(weatherForecastArray);
//         })
//         .catch((err) => console.log(err));
// };