// TODO figure out how to have gradient behind swiper

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Linking } from 'react-native';
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
import { getDate } from '../utils/getDate';


export const Weather = (props) => {

    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [errorMessage, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [temp, setTemp] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [weatherDetails, setWeatherDetails] = useState(null);

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
            setWeather(weather);
            setForecast(await fetchForecast(longitude, latitude));
            setWeatherDetails(WeatherConditions[weather.weather[0].main]);
       }
 
       fetchData();

    }, []);

  
    const renderWeather = () => {
        const {container, rowContainer, tempTxt } = styles;

        return (
           
                <SafeAreaView style={[container,{backgroundColor: weatherDetails.color}]}>
                    <View style={{position: 'absolute', top: 50, alignItems: 'center'}}>
                        <Text style={{color: '#FFF', fontSize: 26, opacity: 0.8}}>{getDate()}</Text>
                        <Text style={{color: '#FFF', fontSize: 20, opacity: 0.8}}>{weather.name}</Text>
                    </View>

                    <MaterialCommunityIcons
                        name={weatherDetails.icon}
                        size={125}
                        color='white'
                    />
                    <Text style={{color: '#FFF', fontSize: 22, opacity: 0.8}}>{weatherDetails.title}</Text>

                    <View style={rowContainer}>
                        <Text style={tempTxt}>{Math.round(weather.main.temp)}</Text>
                        <MaterialCommunityIcons name="circle-outline" size={15} color="white" style={{ marginTop: -40, fontWeight: '300' }} />
                    </View>
                    <View style={rowContainer}>
                        <MaterialCommunityIcons name="weather-windy" size={20} color="white" style={{opacity: 0.8}}/>
                        <Text style={styles.windTxt}>{Math.round(weather.wind.speed)}</Text>
                        <MaterialCommunityIcons name="water-outline" size={20} color="white" style={{opacity: 0.8}}/>
                        <Text style={styles.humidityTxt}>{`${weather.main.humidity} %`}</Text>
                    </View>
                    <Text 
                        onPress={() => Linking.openURL('https://darksky.net/poweredby/')}
                        style={{position: 'absolute', bottom: 30, alignItems: 'center', color: '#FFF', fontSize: 14, opacity: 0.8}}>
                        Powered by Dark Sky
                    </Text>
                </SafeAreaView>
        );
    };

    return (
        
        <View style={styles.container}>
        {weatherDetails == null ? <ActivityIndicator size="large" color="#708090" /> : renderWeather()}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8
    },
    rowContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    tempTxt: {
        fontSize: 85, 
        color:'white',
        fontWeight: '200',
        marginRight: 5
    },
    windTxt: {
        color: 'white',
        fontSize: 20,
        marginRight: 15,
        marginLeft: 4,
        opacity: 0.8
    },
    humidityTxt: {
        color: 'white',
        fontSize: 20,
        marginLeft: 4,
        opacity: 0.8
    },
    ellipses: {
        fontSize: 70,
        color: "white",
        paddingBottom: -10
    }
});


/**
 * 
 *  //<Swiper activeDotColor={'white'}>
        //<ForecastList forecastList={forecast} />

    //     <MaterialCommunityIcons
    //     name={WeatherConditions[weatherCondition].icon}
    //     size={95}
    //     color='white'
    // />
    // <Text style={styles.cityTxt}>{city}</Text>
    // <Text style={styles.countryTxt}>{country}</Text>
    //<MaterialCommunityIcons name="circle-outline" size={10} color="white" style={{ marginTop: -25 }} />
 */