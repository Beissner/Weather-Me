// TODO figure out how to have gradient behind swiper

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import AnimatedEllipsis from 'react-native-animated-ellipsis';
import _ from 'lodash';
//import Swiper from 'react-native-swiper';
import { API_KEY } from '../utils/WeatherAPIKey';
import { WeatherConditions } from '../utils/WeatherConditions';
import { fetchWeather } from '../utils/fetchWeather';
import { fetchForecast } from '../utils/fetchForecast';
import ForecastList from '../components/ForecastList';


export const Weather = (props) => {

    useEffect(() => {
       const fetchData = async () => {

            //get location permission
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            //get coordinates
            const coordinatesData = await Location.getCurrentPositionAsync({});
            const location = await Location.reverseGeocodeAsync(coordinatesData.coords);
            setCity(location[0].city);
            setCountry(location[0].country);

            //fetch current weather data
            const longitude = coordinatesData.coords.longitude;
            const latitude = coordinatesData.coords.latitude;

            const weather = await fetchWeather(longitude, latitude);
            const forecast = await fetchForecast(longitude, latitude);
       }
 
       fetchData();

    }, []);

    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [errorMessage, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [temp, setTemp] = useState(null);
    const [weatherCondition, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

   

    const renderWeather = () => {
        //const { city, country, temp, weatherCondition, weatherForecastArray } = this.state;
        //<Swiper activeDotColor={'white'}>
        //<ForecastList forecastList={forecast} />

    //     <MaterialCommunityIcons
    //     name={WeatherConditions[weatherCondition].icon}
    //     size={95}
    //     color='white'
    // />
    // <Text style={styles.cityTxt}>{city}</Text>
    // <Text style={styles.countryTxt}>{country}</Text>
    //<MaterialCommunityIcons name="circle-outline" size={10} color="white" style={{ marginTop: -25 }} />
        return (
           
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       
                        <Text style={{ fontSize: 50, marginLeft: 15, fontWeight: '100' }}>weather stuff here</Text>
                        
                    </View>
                   
                </View>
        );
    };

    // const renderLoading = () => {
    //     return <AnimatedEllipsis style={styles.ellipses} />;
    // };

    return (
        
        <View style={styles.container}>
            {loading ? null : renderWeather()}
        </View>
    )

        
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
