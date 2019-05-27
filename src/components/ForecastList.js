import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import ForecastListItem from './ForecastListItem';

export default class ForecastList extends Component {

    renderForecastList() {
        const { forecastList } = this.props;
        return forecastList.map((entry) => <ForecastListItem key={`${entry.weekDay} ${entry.temp}`} date={entry.weekDay} temp={entry.temp} icon={entry.icon} />);

    }


    render() {

        return (
            <View style={styles.rootContainer}>
                <Text style={styles.title}>5 Day Forecast</Text>
                <View style={styles.divider} />
                {this.renderForecastList()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingVertical: 40,
        paddingHorizontal: 15,
        backgroundColor: '#86c5da',
    },
    divider: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        marginVertical: 15,
    },
    title: {
        fontSize: 25,
        color: 'white'
    },
    listContainer: {

    }
});
