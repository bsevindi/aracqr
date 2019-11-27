import React from 'react';
import { StyleSheet, Image } from 'react-native';

const img0 = require('../img/carIcons/1A.png');
const img1 = require('../img/carIcons/2A.png');
const img2 = require('../img/carIcons/3A.png');
const img3 = require('../img/carIcons/4A.png');
const img4 = require('../img/carIcons/5A.png');
const img5 = require('../img/carIcons/6A.png');

const images = [img0, img1, img2, img3, img4, img5];

const ThumbnailImage = (props) => (
    <Image
      style={styles.imageContainer}
      source={images[props.imgNr]}
    />
);

const styles = StyleSheet.create({
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 25,
  },
});

export default ThumbnailImage;
