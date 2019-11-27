import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';
import noop from '../util/noop';

export default class CarStore {
  @observable carList = [];

  constructor(rootStore) {
    this.carCollection = firebase.firestore().collection('cars');
    this.rootStore = rootStore;
    this.isCarListInitialized = false;
  }

  @action addCarToLocalList(car) {
    this.carList.push(car);
  }

  @action removeCarFromLocalList(car) {
    this.carList = this.carList.filter((l) => l.qrKey !== car.qrKey);
  }

  @action addCar(car) {
    //console.log('Network IO: CarStore.addCar');
    const carToSave = car;
    const prom = this.carCollection.add(carToSave);
    prom.then((persistedCar) => {
      carToSave.id = persistedCar.id;
      this.addCarToLocalList(carToSave);
    })
    .catch(() => {
      noop();
    });
    return prom;
  }

  @action initializeCarList = () => {
    if (this.isCarListInitialized) return Promise.resolve();
    return new Promise((resolve, reject) => {
      // first initialize notifications client id which is used
      // while queryings cars associated with this client.
      this.getCarsFromRemoteDatabase()
      .then(() => {
        this.isCarListInitialized = true;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  @action getCarsFromRemoteDatabase = () => {
    //console.log('Network IO: CarStore.getCarsFromRemoteDatabase');
    const prom = this.carCollection
      .where('clientId', '==', this.rootStore.parametersStore.clientId)
      .limit(this.rootStore.parametersStore.carLimit)
      .get();
    prom.then((querySnapshot) => {
      querySnapshot.forEach((car) => {
          const curCar = car.data();
          curCar.id = car.id;
          this.addCarToLocalList(curCar);
      });
    })
    .catch(() => {
      // nothing can be done here. just added this noop catch block because it
      // is a good practice.
      noop();
    });
    return prom;
  }

  isQrAvailable(qrKey) {
    //console.log('Network IO: CarStore.carExists');
    return new Promise((resolve, reject) => {
      this.carCollection.where('qrKey', '==', qrKey)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        resolve(querySnapshot.docs.length === 0);
      })
      .catch(err => reject(err));
    });
  }
}
