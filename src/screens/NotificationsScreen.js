import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { locale } from '../util/locale';

const bgParkingImage = require('../img/bgParking.png');

export default class NotificationsScreen extends Component {
  static navigationOptions = () => ({
    title: locale.strings.notificationsScreenTitle,
  });

  render() {
    const { state } = this.props.navigation;
    const payload = state.params.payload;
    // TODO status goz onunde bulundurulabilir.
    // const status = state.params.status;
    return (
      <View style={styles.container}>
      <Image
        style={styles.bgStyle}
        source={bgParkingImage}
      />
        <View style={styles.mainFrame}>
          <Text>{`${payload.name}: ${locale.strings.called}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgb(120,169,169)',
  },
  bgStyle: {
      position: 'absolute',
      height: '100%',
      width: '100%',
  },
  mainFrame: {
    width: '80%',
    height: '30%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: '5%',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
