import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import Weather from './src/components/Weather';

export default class App extends React.Component {

  render() {

    return (
      <LinearGradient
        colors={['#5B2BEA', '#370A98', '#0E0668']}
        style={styles.container}>

        <Weather />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)',]}
          rotation={90}
          start={[0.5, 0.3]}
          style={styles.overlayGradient}
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
  overlayGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 800,
  }
});
