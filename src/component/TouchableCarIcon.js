import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import ThumbnailImage from './ThumbnailImage';

export default class TouchableCarIcon extends Component {
  onPress = () => {
    this.props.onIconSelect(this.props.imgNr);
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        onPress={this.onPress}
      >
        <ThumbnailImage imgNr={this.props.imgNr} />
      </TouchableOpacity>
    );
  }
}
