import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { WeatherConditions } from '../utils/WeatherConditions';


export default class ForecastListItem extends Component {
    render() {
        const { date, temp, icon } = this.props;
        console.log("props passed to listItem", this.props);
        return (
            <View key style={styles.rootContainer}>
                <MaterialCommunityIcons
                    name={WeatherConditions[icon].icon}
                    size={50}
                    color='white'

                />
                <View style={styles.tempContainer}>
                    <Text style={styles.tempStyle}>{temp}</Text>
                    <MaterialCommunityIcons name="circle-outline" size={10} color="white" style={styles.degreeStyle} />
                </View>

                <Text style={styles.dateStyle}>{date}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 13
    },
    tempContainer: {
        flexDirection: 'row'
    },
    tempStyle: {
        color: 'white',
        fontSize: 30
    },
    dateStyle: {
        color: 'white',
        fontSize: 20
    },
    degreeStyle: {
        paddingTop: 4
    }
});
