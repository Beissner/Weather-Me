
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Linking, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';
import { WeatherConditions } from '../utils/WeatherConditions';
import { fetchWeather } from '../utils/fetchWeather';
import { fetchForecast } from '../utils/fetchForecast';
import Carousel from 'react-native-snap-carousel';
import { getDate } from '../utils/getDate';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_HOURLY_ITEM_WIDTH = 60;
const CAROUSEL_WEEK_ITEM_WIDTH = 80;


export const Weather = (props) => {

    const [city, setCity] = useState(null);
    const [errorMessage, setErrorMsg] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [weatherDetails, setWeatherDetails] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0); 
    const [showHourly, setShowHourly] = useState(true); 

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

            //fetch current weather data
            const longitude = coordinatesData.coords.longitude;
            const latitude = coordinatesData.coords.latitude;

            const forecast = await fetchForecast(longitude, latitude);
            setForecast(forecast);

            setWeatherDetails(WeatherConditions[forecast.icon]);
       }
 
       fetchData();

    }, []);

    const renderHourlyItem = ({item}) => {
        return (
            <View style={{ alignItems: 'center',  paddingHorizontal: 4 }}>
                <Text style={{ color: '#fff', fontSize: 18, paddingBottom: 12}}>{ item.time }</Text>
                <View style={styles.rowContainer}>
                    <Text style={{ color: '#fff', fontSize: 22, fontWeight: '500' }}>{ item.temp }</Text>
                    <MaterialCommunityIcons name="circle-outline" size={8} color="white" style={{ marginTop: -10, fontWeight: '300' }} />
                </View>
            </View>
        );
    };

    const renderWeekItem = ({item}) => {
        return (
            <View style={{ alignItems: 'center',  paddingHorizontal: 4 }}>
                <Text style={{ color: '#fff', fontSize: 18, paddingBottom: 12}}>{ item.day }</Text>
                <View style={styles.rowContainer}>
                    <Text style={{ color: '#fff', fontSize: 22, fontWeight: '500' }}>{item.tempHigh}</Text>
                    <MaterialCommunityIcons name="circle-outline" size={8} color="white" style={{ marginTop: -10, fontWeight: '300' }} />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>{item.tempLow}</Text>
                    <MaterialCommunityIcons name="circle-outline" size={7} color="white" style={{ marginTop: -10, fontWeight: '300' }} />
                </View>
            </View>
        );
    };

    const hourlyCarousel = () => <Carousel
        data={forecast.hourlyForecast}
        onSnapToItem={(index) => setActiveSlide(index)} // we will update active slide index
        renderItem={renderHourlyItem}
        sliderWidth={SCREEN_WIDTH-20}
        itemWidth={CAROUSEL_HOURLY_ITEM_WIDTH}
        firstItem={3}
    />;

    const weeklyCarousel = () => <Carousel
        data={forecast.weekForecast}
        onSnapToItem={(index) => setActiveSlide(index)} 
        renderItem={renderWeekItem}
        sliderWidth={SCREEN_WIDTH-20}
        itemWidth={CAROUSEL_WEEK_ITEM_WIDTH}
        firstItem={3}
    />;

    const renderWeather = () => {
        const {container, rowContainer, tempTxt } = styles;

        return (
                <ImageBackground 
                    source={require('../../assets/backgrounds/background2.png')} 
                    resizeMode='cover' 
                    style={container}
                >
                    <View style={{position: 'absolute', top: 50, alignItems: 'center'}}>
                        <Text style={{color: '#FFF', fontSize: 26, opacity: 0.8}}>{getDate()}</Text>
                        <Text style={{color: '#FFF', fontSize: 20, opacity: 0.8}}>{city}</Text>
                    </View>

                   
                    <Text style={{color: '#FFF', fontSize: 22, marginVertical: 10}}>{forecast.title}</Text>

                    <View style={rowContainer}>
                        <Text style={tempTxt}>{forecast.temp}</Text>
                        <MaterialCommunityIcons name="circle-outline" size={15} color="white" style={{ marginTop: -40, fontWeight: '300' }} />
                    </View>
                    <View style={rowContainer}>
                        <MaterialCommunityIcons name="weather-windy" size={20} color="white" style={{opacity: 0.8}}/>
                        <Text style={styles.windTxt}>{forecast.wind}</Text>
                        <MaterialCommunityIcons name="water-outline" size={20} color="white" style={{opacity: 0.8}}/>
                        <Text style={styles.humidityTxt}>{`${forecast.humidity} %`}</Text>
                    </View>

                    <View style={{position: 'absolute', bottom: 60}}>
                        <View style={[rowContainer, {alignSelf: 'center', marginBottom: 15}]}>
                            <TouchableOpacity onPress={() => setShowHourly(true)}>
                                <Text style={showHourly ? styles.active : styles.inactive}>Hourly</Text>
                            </TouchableOpacity>
                            <View style={{width: 1.5, height: 15, backgroundColor: '#fff', opacity: 0.7, marginHorizontal: 10}}/>
                            <TouchableOpacity onPress={() => setShowHourly(false)}>
                                <Text style={showHourly ? styles.inactive : styles.active}>Week</Text>
                            </TouchableOpacity>
                        </View>
                        {showHourly ? hourlyCarousel() : weeklyCarousel()}
                    </View>

                    <Text 
                        onPress={() => Linking.openURL('https://darksky.net/poweredby/')}
                        style={{position: 'absolute', bottom: 30, alignItems: 'center', color: '#FFF', fontSize: 14, opacity: 0.8}}>
                        Powered by Dark Sky
                    </Text>
                </ImageBackground>
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
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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
    inactive: {
        color: '#fff',
    },
    active: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500'
    }
});

/*
 <MaterialCommunityIcons
    name={weatherDetails.icon}
    size={125}
    color='white'
/>
*/
