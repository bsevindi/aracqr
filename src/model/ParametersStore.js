import firebase from 'react-native-firebase';
import { observable, computed, action } from 'mobx';
import randomString from 'random-string';
import { AsyncStorage } from 'react-native';
import { locale } from '../util/locale';

export default class ParametersStore {
  @observable clientId = '';

  constructor(rootStore) {
    this.parametersRemote = firebase.firestore().collection('appParams');
    this.rootStore = rootStore;
    this.qrLength = 8; // default
    this.carLimit = 5; // default
    this.baseUrl = 'carqr.org'; //default
    this.isParametersInitialized = false;
  }

  @computed get isClientIdSet() {
    return this.clientId !== '';
  }

  @action setClientId(clientId) {
    this.clientId = clientId;
  }

  // TODO rename: retrieveGlobalParameters
  retrieveGlobalParameters() {
    // since the app has only one parameter, qrLength,
    // and it has a default value, this promise always
    // resolves even when server error occurs.
    if (this.isParametersInitialized) return Promise.resolve();
    //console.log('Network IO: ParameterStore.retrieveGlobalParameters');
    return new Promise((resolve) => {
      const docRef = this.parametersRemote.doc('params');
      docRef.get()
        .then((doc) => {
          this.isParametersInitialized = true;
          if (doc.exists) {
            const { qrLength, carLimit, baseUrl } = doc.data();
            this.qrLength = qrLength;
            this.carLimit = carLimit;
            this.baseUrl = baseUrl;
          }
          resolve();
        })
        .catch(() => resolve());
    });
  }

  // expects clientId to be initialized already
  updateClientParameters(notificationsToken) { // other parameters will be added as arguments
    //console.log('Network IO: ParameterStore.updateClientParameters');
    const clientParameters = {
      notificationsToken,
      language: locale.lang
    };
    return firebase.firestore()
            .collection('clients')
            .doc(this.clientId)
            .set(clientParameters);
  }

  @action initializeClientId() {
    // if clientId is already set, return a promise that always resolves
    if (this.isClientIdSet) {
      return Promise.resolve(this.clientId);
    }
    //console.log('Disk IO: ParametersStore.initializeClientId');
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('clientId').then(val => {
        if (val === null) {
          // clientId has not generated yet. generate one and save to disk.
          this.setClientId(randomString({ length: 12 }));
          AsyncStorage.setItem('clientId', this.clientId)
          .then(() => {
            resolve(this.clientId);
          })
          .catch(err => {
            reject(err);
          });
        } else {
          // clientId already generated and this value is read from storage.
          this.setClientId(val);
          resolve(val);
        }
      })
      .catch(err => {
        reject(err);
      });
    });
  }
}
