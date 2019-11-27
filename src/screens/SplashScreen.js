import React, { Component } from 'react';
import { StyleSheet, View, Animated, Image, Easing } from 'react-native';

const SplashLight = require('../img/SplashLight.png');
const Logo = require('../img/Logo.png');
const FlatCatLogo = require('../img/Flat.png');

class SplashScreen extends Component {

  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {
    this.StartImageRotateFunction();
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(
      this.RotateValueHolder,
      {
        toValue: 1,
        duration: 50000,
        easing: Easing.linear
      }
    ).start(() => this.StartImageRotateFunction());
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={styles.container}>


      <View style={styles.animationStyle}>
       <Animated.Image
        style={{
          height: 1000,
          width: 1000,
          position: 'absolute',
          transform: [{ rotate: RotateData }] }}
          source={SplashLight}
       />
       </View>
       <Image
         style={styles.LogoStyle}
         source={Logo}
       />
       <Image
         style={styles.FlatCatLogoStyle}
         source={FlatCatLogo}
       />

      </View>


    );
  }
}

const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(128,172,172)',
  },
  animationStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe01f',
  },
  LogoStyle: {
    height: 400,
    width: 400,
    position: 'absolute',
  },
  FlatCatLogoStyle: {
    height: 200,
    width: 200,
    marginTop: 400,
  }
});

export default SplashScreen;
