import axios from 'axios';
import { API_KEY } from './WeatherAPIKey';

export const fetchForecast = (long, lat) => {

    //const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`;
    //https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589
    //const url = `http://api.darksky.net/forecast/ae142412eff64babeb1168658d4f2f2c/${lat},${long}`;

    //open weather map api key
    //const url  = `http://api.openweathermap.org/data/2.5/weather?id=524901&appid=${key}`;
    //5c2858738450f4c0c981e4a223d81c21
    const url = `https://api.darksky.net/forecast/5c2858738450f4c0c981e4a223d81c21/${lat},${long}`;
    
    return axios
    .get(url)
    .then(response => {
        console.info('Successfully fetched forecast!', response);

        // const convertedDate = new Date(response.data.list[0].dt * 1000);
        // console.log('value of convertedDate: ', convertedDate);
        // const forecastArray = response.data.list.map((entry, index) => {
        //     const date = new Date(entry.dt * 1000);
        //     const dateString = date.toString();
        //     // if (dateString.includes('13:00')) {
        //     //     console.log("string at 13:00: ", dateString);
        //     //     const weekDay = dateString.slice(0, 4);
        //     //     weatherForecastArray[index] = { weekDay: weekDay, temp: entry.main.temp }
        //     // }
        //     return dateString;
        // });

        // console.log('value of forecastArray: ', forecastArray);
        // return response.data;
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
//                     console.log("string at 13:00: ", dateString);
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