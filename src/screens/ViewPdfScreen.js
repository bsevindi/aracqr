import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import Pdf from 'react-native-pdf';
import noop from '../util/noop';
import { locale } from '../util/locale';
import { singleButtonNoopAlert } from '../component/Alerts';

export default class ViewPdfScreen extends Component {
  static navigationOptions = () => ({
    title: locale.strings.viewPdfScreenTitle,
  });

  exportPdf = () => {
    const { state } = this.props.navigation;
    const source = state.params.pdfSource;
    // console.log(`pdfSource: ${source}`);
    Share.open({
      title: locale.strings.sharePdfTitle,
      message: locale.strings.sharePdfMessage,
      url: `file://${source}`,
      subject: locale.strings.sharePdfTitle,
    })
    .then(() => {
      // user shared
      noop();
    })
    .catch(() => {
      // user dismissed
      noop();
    });
  }

  render() {
      const { state } = this.props.navigation;
      const source = { uri: state.params.pdfSource };

      return (
          <View style={styles.container}>
            <Pdf
                source={source}
                onError={() => {
                  singleButtonNoopAlert(locale.strings.error,
                    locale.strings.pdfCreateError,
                    locale.strings.ok);
                }}
                style={styles.pdf}
            />
            <TouchableOpacity
              style={styles.buttonbg}
              onPress={this.exportPdf}
            >
              <Text style={styles.buttonText}> {locale.strings.export} </Text>
            </TouchableOpacity>

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
    pdf: {
        flex: 1,
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
});
