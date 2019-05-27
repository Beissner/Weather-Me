// TODO figure out how to have gradient behind swiper

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Permissions, Location, AppLoading } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import _ from 'lodash';
import Swiper from 'react-native-swiper';
import { API_KEY } from '../utils/WeatherAPIKey';
import { WeatherConditions } from '../utils/WeatherConditions';
import ForecastList from '../components/ForecastList';


export default class Weather extends Component {

    state = {
        city: null,
        country: null,
        errorMessage: null,
        loading: true,
        temp: null,
        weatherCondition: null,
        weatherForecastArray: []
    };

    async componentDidMount() {

        //get location permission
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        //get coordinates
        let coordinatesData = await Location.getCurrentPositionAsync({});
        let location = await Location.reverseGeocodeAsync(coordinatesData.coords);
        this.setState({ city: location[0].city, country: location[0].country });

        //fetch current weather data
        const longitude = coordinatesData.coords.longitude;
        const latitude = coordinatesData.coords.latitude;
        this.fetchWeather(longitude, latitude);

        //fetch forecast
        this.fetchForecast(longitude, latitude);
    }

    fetchForecast(long, lat) {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`
        ).then(res => res.json())
            .then(jsonResults => {
                const convertedDate = new Date(jsonResults.list[0].dt * 1000);
                const weatherForecastArray = [];
                let index = 0;
                const datesArray = jsonResults.list.map((entry) => {
                    const date = new Date(entry.dt * 1000);
                    const dateString = date.toString();
                    if (dateString.includes('13:00')) {
                        //fconsole.log("string at 13:00: ", dateString);
                        const weekDay = dateString.slice(0, 4);
                        weatherForecastArray[index] = { weekDay: weekDay, temp: entry.main.temp, icon: entry.weather[0].main }
                        index++;
                    }
                    return new Date(entry.dt * 1000);
                });
                this.setState({ weatherForecastArray });
            })
            .catch((err) => console.log(err));
    }

    fetchWeather(long, lat) {

        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`
        )
            .then(res => res.json())
            .then(results => {
                const description = results.weather[0].main;
                this.setState({ temp: results.main.temp, loading: false, weatherCondition: description })
            })
            .catch((err) => console.log(err));
    }

    renderWeather() {
        const { city, country, temp, weatherCondition, weatherForecastArray } = this.state;

        return (
            <Swiper activeDotColor={'white'}>
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: WeatherConditions[weatherCondition].color }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name={WeatherConditions[weatherCondition].icon}
                            size={95}
                            color='white'
                        />
                        <Text style={{ fontSize: 50, color: 'white', marginLeft: 15 }}>{temp}</Text>
                        <MaterialCommunityIcons name="circle-outline" size={10} color="white" style={{ marginTop: -25 }} />
                    </View>
                    <Text style={styles.cityTxt}>{city}</Text>
                    <Text style={styles.countryTxt}>{country}</Text>
                </View>

                <ForecastList forecastList={weatherForecastArray} />

            </Swiper>

        );
    }

    renderLoading() {
        return <AnimatedEllipsis style={styles.ellipses} />;
    }

    render() {

        const { loading, weatherCondition } = this.state;
        return (
            <View style={styles.container}>
                {loading ? this.renderLoading() : this.renderWeather()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cityTxt: {
        color: 'white',
        fontSize: 30,
        opacity: 0.9
    },
    countryTxt: {
        color: 'white',
        fontSize: 20,
        opacity: 0.7
    },
    ellipses: {
        fontSize: 70,
        color: "white",
        paddingBottom: -10
    }
});
