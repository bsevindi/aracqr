import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity
 } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { NavigationActions } from 'react-navigation';
import { inject } from 'mobx-react/native';
import { locale } from '../util/locale';
import { singleButtonNoopAlert } from '../component/Alerts';

const bgParkingImage = require('../img/bgParking.png');

@inject('rootStore')
class ViewQRScreen extends Component {
  static navigationOptions = () => ({
    title: locale.strings.viewQrScreenTitle,
  });

  constructor(props) {
    super(props);
    this.state = {
      svg: {},
      qrPath: 'Not available yet.',
      pdfPath: 'Not available yet.',
      savePdfButtonDisabled: false
    };
    // console.log(`RNFS.DocumentDirectoryPath: ${RNFS.DocumentDirectoryPath}`);
  }

  getRouteResetAction(pdfPath) {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'ToHome' }),
        NavigationActions.navigate({
          routeName: 'ToViewPdf',
          params: { pdfSource: pdfPath }
        }),
      ]
    });
    return resetAction;
  }

  showPdf = () => {
    this.toggleSavePdfButton();
    this.state.svg.toDataURL(this.savePdfAndNavigate);
  }

  savePdfAndNavigate = async (svgDataUrl) => {
    try {
      await this.savePdf(svgDataUrl);
      const resetAction = this.getRouteResetAction(this.state.pdfPath);
      if (Platform.OS === 'iOS') {
        this.toggleSavePdfButton();
        this.props.navigation.dispatch(resetAction);
      } else { // Wait 1 second in Android for the completion of PDF file write operation
        const that = this;
        setTimeout(() => {
          this.toggleSavePdfButton();
          that.props.navigation.dispatch(resetAction);
        }, 1000);
      }
    } catch (err) {
      this.displayPdfError();
    }
  }

  savePdf = async (svgDataUrl) => {
    const qrPath = `data:image/png;base64,${svgDataUrl}`;
    const { state } = this.props.navigation;
    const url = `${this.props.rootStore.parametersStore.baseUrl}/${state.params.qrKey}`;
    const html = `
      <div align="center">
        <br/>
        <img src="${qrPath}">
        <br/>
        <h1>${locale.strings.reachMe}</h1>
        <h1 style="color:blue;">${url}</h1>
      </div>
    `;
    const options = {
      html,
      fileName: `${state.params.qrKey}`,
      directory: `${RNFS.DocumentDirectoryPath}`
    };

    const file = await RNHTMLtoPDF.convert(options);
    // console.log(`PDF saved successfully ${file.filePath}`);
    this.keepPdfFilePath(file.filePath);
  }

  displayPdfError = () => {
    singleButtonNoopAlert(locale.strings.error,
      locale.strings.pdfCreateError,
      locale.strings.ok);
  }

  keepPdfFilePath = (pdfFilePath) => {
    this.setState(previousState => {
      const preState = previousState;
      preState.pdfPath = pdfFilePath;
      return preState;
    });
  }

  toggleSavePdfButton = () => {
    this.setState(previousState => {
      const preState = previousState;
      preState.savePdfButtonDisabled = !preState.savePdfButtonDisabled;
      return preState;
    });
  }

  render() {
    const { state } = this.props.navigation;
    const qrVal = `${this.props.rootStore.parametersStore.baseUrl}/${state.params.qrKey}`;
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgStyle}
          source={bgParkingImage}
        />
        <View style={styles.qrWrap}>
          <QRCode
            value={qrVal}
            getRef={(c) => (this.state.svg = c)}
          />
        </View>
        <View style={styles.textWrap}>
            <View style={styles.textView}>
              <Text style={styles.upperText}>{locale.strings.reachMe}</Text>
              <Text style={styles.bottomText}>{qrVal}</Text>
            </View>
            <View style={styles.buttonWrap}>
                  <TouchableOpacity
                      style={styles.buttonbg}
                      onPress={this.showPdf}
                      disabled={this.state.savePdfButtonDisabled}
                  >
                      <Text
                      style={!this.state.buttonDisabled ? styles.buttonText :
                        styles.disabledButtonText}
                      >
                      {locale.strings.saveAsPdf} </Text>
                  </TouchableOpacity>
              </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 2,
    backgroundColor: 'rgb(120,169,169)',
  },
  bgStyle: {
      position: 'absolute',
      height: '100%',
      width: '100%',
  },
  qrWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperText: {
    fontSize: 16,
    color: 'rgb(233,233,233)',
  },
  bottomText: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.5)',
  },
  buttonWrap: {
    justifyContent: 'flex-end',
  },
  buttonbg: {
    backgroundColor: '#A6CCCC',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 30,
  },
  buttonText:
  {
    color: '#286D6D',
    fontSize: 20
  },
});

export default ViewQRScreen;
