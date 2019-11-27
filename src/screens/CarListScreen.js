import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react/native';
import CarCard from '../component/CarCard';
import Loading from '../component/Loading';
import { locale } from '../util/locale';

const bgMain = require('../img/bgMain.png');


@inject('rootStore')
@observer
class CarListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: locale.strings.carListScreenTitle,
    headerRight: (
      <Text
        style={styles.headerButton}
        onPress={() => navigation.navigate('ToNewCar')}
      >
        { locale.strings.add }
      </Text>
    ), /*
    headerLeft: (
      <Text
        style={styles.headerButton}
        onPress={() => navigation.navigate('ToNotifications')}
      >
        Notifications
      </Text>
    ),*/

  });

  constructor(props) {
    super(props);
    this.state = { carListState: 'initializing' };
  }

  componentDidMount() {
    this.initializeApp();
  }

  initializeApp() {
    // uygulama aktif degilken notification geldiginde de
    // bu metot componentDidMount'tan cagiriliyor. tabi
    // notification geldigi icin, bu metodun calismasi
    // bitmeden NotificationsScreen'e geciyor ve react-
    // native unmounted bir ekranda setState cagirdin diye
    // warning veriyor. yapacak bir sey yok.
    this.props.rootStore.appInitializer.initializeApp()
    .then(() => {
      this.setState({ carListState: 'success' });
    })
    .catch(() => {
      this.setState({ carListState: 'error' });
    });
  }

  renderCarList() {
    return (
      <View style={styles.content}>
        <FlatList
          data={toJS(this.props.rootStore.carStore.carList)}
          renderItem={({ item }) => (
            <CarCard
              onPress={() => this.props.navigation.navigate('ToViewQR', { qrKey: item.qrKey })}
              car={item}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  renderConnectionProblem() {
    return (
      <View style={styles.content}>
        <Text>{ locale.strings.connectionProblem }</Text>
        <Button
          onPress={() => this.initializeApp()}
          title={locale.strings.tryAgain}
        />
      </View>
    );
  }

  renderEmptyCarList() {
    return (
      <View style={styles.content}>
        <Text>{ locale.strings.emptyCarList }</Text>
      </View>
    );
  }

  renderInitializingMessage() {
    return (
      <Loading />
    );
  }

  renderConditionally() {
    if (this.state.carListState === 'success') {
      if (this.props.rootStore.carStore.carList.length === 0) {
        return this.renderEmptyCarList();
      }
      return this.renderCarList();
    } else if (this.state.carListState === 'initializing') {
      return this.renderInitializingMessage();
    } else if (this.state.carListState === 'error') {
      return this.renderConnectionProblem();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
        style={styles.bgMainStyle}
        source={bgMain}
        />
        <View style={styles.containerList} />
        <View style={styles.TextViewStyle}>
            <View style={styles.UpperViewTextStyle}>
              <Text style={styles.UpperTextStyle}>{locale.strings.qrCommunication}</Text>
            </View>
            <View style={styles.BottomTextViewStyle} >
              <Text style={styles.BottomTextStyle}>{locale.strings.allowCommunication}</Text>
            </View>
        </View>
        <View style={styles.containerList}>
          {this.renderConditionally()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 2,
      backgroundColor: 'rgb(120,169,169)',
  },
  containerList: {
      flex: 1,
  },
  bgMainStyle: {
      position: 'absolute',
      height: '100%',
      width: '100%',
  },
  TextViewStyle: {
    alignItems: 'center',
    marginBottom: 8,
    marginTop: -30,
  },
  UpperTextViewStyle: {
    margin: 5,
  },
  BottomTextViewStyle: {
    marginTop: 10,
  },
  UpperTextStyle: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
  BottomTextStyle: {
    fontSize: 14,
    color: 'rgb(233,233,233)',
  },
  headerButton: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  content: {
    flex: 2
  }
});

export default CarListScreen;
