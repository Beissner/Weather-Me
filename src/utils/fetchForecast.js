import axios from 'axios';
import { API_KEY2 } from '../config/WeatherAPIKey';

export const fetchForecast = (long, lat) => {

    //const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`;
    const url = `https://api.darksky.net/forecast/${API_KEY2}/${lat},${long}`;
    
    return axios
    .get(url)
    .then(response => {
        console.info('Successfully fetched forecast!', response);
        const weatherObj = {temp: response.data.currently.apparentTemperature};
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