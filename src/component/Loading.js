import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color='#286D6D' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginVertical: 30,
  },
});

export default Loading;
