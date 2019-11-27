import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableCarIcon from './TouchableCarIcon';

class CarIconSelect extends Component {
  constructor() {
    super();
    this.state = {
      selectedIconNr: 0,
    };
  }

  componentDidMount() {
    // first icon is selected on default
    this.props.onIconSelect(0);
  }

  onIconSelect = (selectedIconNr) => {
    this.setState({
      selectedIconNr
    });
    this.props.onIconSelect(selectedIconNr);
  };

  render() {
    return (
      <View style={styles.mainFrame}>
        <View
          style={this.state.selectedIconNr === 0 ?
            styles.enabledImageFrame : styles.disabledImageFrame}
        >
          <TouchableCarIcon
            imgNr={0}
            disabled={this.state.selectedIconNr === 0}
            onIconSelect={this.onIconSelect}
          />
        </View>
        <View
          style={this.state.selectedIconNr === 1 ?
            styles.enabledImageFrame : styles.disabledImageFrame}
        >
          <TouchableCarIcon
            imgNr={1}
            disabled={this.state.selectedIconNr === 1}
            onIconSelect={this.onIconSelect}
          />
        </View>
        <View
          style={this.state.selectedIconNr === 2 ?
            styles.enabledImageFrame : styles.disabledImageFrame}
        >
          <TouchableCarIcon
            imgNr={2}
            disabled={this.state.selectedIconNr === 2}
            onIconSelect={this.onIconSelect}
          />
        </View>
        <View
          style={this.state.selectedIconNr === 3 ?
            styles.enabledImageFrame : styles.disabledImageFrame}
        >
          <TouchableCarIcon
            imgNr={3}
            disabled={this.state.selectedIconNr === 3}
            onIconSelect={this.onIconSelect}
          />
        </View>
        <View
          style={this.state.selectedIconNr === 4 ?
            styles.enabledImageFrame : styles.disabledImageFrame}
        >
          <TouchableCarIcon
            imgNr={4}
            disabled={this.state.selectedIconNr === 4}
            onIconSelect={this.onIconSelect}
          />
        </View>
        <View
          style={this.state.selectedIconNr === 5 ?
            styles.enabledImageFrame : styles.disabledImageFrame}
        >
          <TouchableCarIcon
            imgNr={5}
            disabled={this.state.selectedIconNr === 5}
            onIconSelect={this.onIconSelect}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
mainFrame: {
  width: '100%',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  margin: '5%',
},
enabledImageFrame: {
  width: '25%',
  margin: '0.1%',
  aspectRatio: 1,
  backgroundColor: '#rgba(0,0,0,0.1)',
  alignItems: 'center',
  justifyContent: 'center',

},
disabledImageFrame: {
  width: '25%',
  margin: '0.1%',
  aspectRatio: 1,
  backgroundColor: '#rgba(255,255,255,0.1)',
  alignItems: 'center',
  justifyContent: 'center',
},

});

export default CarIconSelect;
