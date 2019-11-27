import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import randomString from 'random-string';
import { inject } from 'mobx-react/native';
import { NavigationActions } from 'react-navigation';
import CarIconSelect from '../component/CarIconSelect';
import { locale } from '../util/locale';
import { singleButtonNoopAlert } from '../component/Alerts';

const bgParkingImage = require('../img/bgParking.png');
const carIcon = require('../img/carIcon.png');

@inject('rootStore')
class NewCarScreen extends Component {
  static navigationOptions = () => ({
    title: locale.strings.newCarScreenTitle,
  });

  constructor(props) {
    super(props);
    this.state = {
      car: {
        qrKey: '',
        name: '',
        clientId: '',
      },
      buttonDisabled: true,
    };
  }

  onIconSelect = (selectedIconNr) => {
    this.selectedIconNr = selectedIconNr;
  };

  getRouteResetAction(qrKey) {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'ToHome' }),
        NavigationActions.navigate({
          routeName: 'ToViewQR',
          params: { qrKey }
        }),
      ]
    });
    return resetAction;
  }

  setCarName = (name) => {
      this.setState({ buttonDisabled: name.trim().length === 0 });
      const car = this.state.car;
      car.name = name;
  }

  saveCar = async () => {
    if (this.props.rootStore.carStore.carList.length
        >= this.props.rootStore.parametersStore.carLimit) {
      singleButtonNoopAlert(locale.strings.error,
        `${locale.strings.maxCarLimit}: ${this.props.rootStore.parametersStore.carLimit}`,
        locale.strings.ok);
      return;
    }
    this.setState({ buttonDisabled: true });
    const car = this.state.car;

    car.qrKey = this.generateQrKey();
    // check to see if qrKey already exists and generate a new key if it does.
    try {
      while (!await this.isQrAvailable(car.qrKey)) {
        car.qrKey = this.generateQrKey();
      }
    } catch (err) {
      this.setState({ buttonDisabled: false });
      singleButtonNoopAlert(locale.strings.error,
        locale.strings.vehicleNotSaved,
        locale.strings.ok);
      return;
    }

    car.clientId = this.props.rootStore.parametersStore.clientId;
    car.icon = this.selectedIconNr;
    const resetAction = this.getRouteResetAction(car.qrKey);
    this.props.rootStore.carStore.addCar(car)
    .then(() => {
      this.setState({ buttonDisabled: false });
      this.props.navigation.dispatch(resetAction);
    })
    .catch((err) => {
      console.log(`carStore.add failed: ${err}`);
      this.setState({ buttonDisabled: false });
      singleButtonNoopAlert(locale.strings.error,
        locale.strings.vehicleNotSaved,
        locale.strings.ok);
    });
  }

  generateQrKey = () => {
    const randOpts = {
      length: this.props.rootStore.parametersStore.qrLength,
      numeric: true,
      letters: true,
      special: false,
      exclude: ['q', 'Q', 'i', 'I', 'l', 'L', 'o', 'O', '0', '1']
    };

    return randomString(randOpts).toLowerCase();
  }

  isQrAvailable(qrKey) {
    return this.props.rootStore.carStore.isQrAvailable(qrKey);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Image
            style={styles.bgStyle}
            source={bgParkingImage}
          />

          <View style={styles.carImageStyle}>
            <CarIconSelect onIconSelect={this.onIconSelect} />
          </View>

          <View style={styles.carNameStyle}>
              <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                  <Image source={carIcon} style={styles.icon} resizeMode="contain" />
                </View>
                <TextInput
                  placeholder={locale.strings.plateOrText}
                  placeholderTextColor="#rgba(0,0,0,0.3)"
                  style={styles.input}
                  onChangeText={(name) => this.setCarName(name)}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonbg}
                onPress={this.saveCar}
                disabled={this.state.buttonDisabled}
              >
                <Text
                  style={!this.state.buttonDisabled ? styles.buttonText : styles.disabledButtonText}
                >{locale.strings.save}
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgb(120,169,169)',
  },
  bgStyle: {
      position: 'absolute',
      height: '100%',
      width: '100%',
  },
  carNameStyle: {
      flex: 1,
  },
  carImageStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#ffe01f',
    fontSize: 13,
  },
  icon: {
    height: 30,
    width: 30,
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 60,
    borderRadius: 10,
    margin: 30,
    backgroundColor: '#rgba(255,255,255,0.1)',
  },
  buttonbg: {
    backgroundColor: '#rgba(255,255,255,0.8)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 30,
  },
  buttonText: {
    color: '#286D6D',
    fontSize: 20
  },
  disabledButtonText:
  {
    color: 'rgba(119,168,168,0.4)',
    fontSize: 20
  }
});
export default NewCarScreen;
