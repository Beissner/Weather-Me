import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient, Permissions, Location } from 'expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class App extends React.Component {

  state = {
    city: null,
    country: null,
    errorMessage: null,
  };

  async componentDidMount() {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let locationData = await Location.getCurrentPositionAsync({});
    let location = await Location.reverseGeocodeAsync(locationData.coords);
    console.log(location);
    this.setState({ city: location[0].city, country: location[0].country });
  }


  render() {
    let text = 'Waiting..';
    const { city, country } = this.state;

    return (
      <LinearGradient
        colors={['#5B2BEA', '#370A98', '#0E0668']}
        style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="ios-sunny" size={80} color="white" />
          <Text style={{ fontSize: 50, color: 'white', marginLeft: 15 }}>63</Text>
          <MaterialCommunityIcons name="circle-outline" size={10} color="white" style={{ marginTop: -25 }} />
        </View>

        <Text style={styles.city}>{city}</Text>
        <Text style={styles.country}>{country}</Text>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)',]}
          rotation={90}
          start={[0.5, 0.3]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 800,
          }}
        />

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {
    color: 'white',
    fontSize: 30
  },
  country: {
    color: 'white',
    fontSize: 20
  }
});
