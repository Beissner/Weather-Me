// TODO depending on weather description, swap out icons for appropriate one (cloudy, sunny, rainy)

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Permissions, Location } from 'expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import _ from 'lodash';
import { API_KEY } from '../utils/WeatherAPIKey';
import { WeatherConditions } from '../utils/WeatherConditions';

export default class Weather extends Component {

    state = {
        city: null,
        country: null,
        errorMessage: null,
        loading: true,
        temp: null,
        weatherCondition: null,
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

        //fetch weather data
        console.log("need long and lat", coordinatesData.coords);
        const longitude = coordinatesData.coords.longitude;
        const latitude = coordinatesData.coords.latitude;
        this.fetchWeather(longitude, latitude);

    }

    fetchWeather(longitude, latitude) {

        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=imperial`
        )
            .then(res => res.json())
            .then(results => {
                const description = results.weather[0].main;
                console.log("returning data from fetching weather", results);
                this.setState({ temp: results.main.temp, loading: false, weatherCondition: description })
            });
    }

    renderWeather() {
        const { city, country, temp, weatherCondition } = this.state;

        console.log("weatherInfo, condition", WeatherConditions, weatherCondition);
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name={WeatherConditions[weatherCondition].icon}
                        size={80}
                        color={WeatherConditions[weatherCondition].color}
                    />
                    <Text style={{ fontSize: 50, color: 'white', marginLeft: 15 }}>{temp}</Text>
                    <MaterialCommunityIcons name="circle-outline" size={10} color="white" style={{ marginTop: -25 }} />
                </View>
                <Text style={styles.cityTxt}>{city}</Text>
                <Text style={styles.countryTxt}>{country}</Text>
            </View>
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
