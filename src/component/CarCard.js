import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import ThumbnailImage from './ThumbnailImage';

class CarCard extends Component {
  render() {
    const { car } = this.props;
    return (
      <TouchableOpacity
        style={styles.viewBackground}
        onPress={this.props.onPress}
      >
        <View style={styles.viewImage}>
          <ThumbnailImage imgNr={car.icon} />
        </View>
        <View style={styles.viewText}>
          <Text style={styles.textHeader}> {car.name} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
   viewBackground: {
    flex: 1,
    backgroundColor: '#71A5A4',
    borderRadius: 2,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewImage: {
    alignItems: 'center',
    margin: 5,
    flex: 1,
  },
  viewText: {
      flex: 2,
  },
    textHeader: {
      color: 'rgb(255,245,219)',
    },
});

export default CarCard;
