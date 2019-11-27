export default class AppInitializer {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  initializeApp() {
    // this call returns a promise but right now it is retrieving only
    // one global parameter, qrLength, which has a default value of 8.
    // so even if this call fails, it is not an issue.
    this.rootStore.parametersStore.retrieveGlobalParameters();
    return new Promise((resolve, reject) => {
      this.rootStore.parametersStore.initializeClientId()
      .then(() => (
        this.rootStore.notificationsStore.initializeNotificationsClient()
      ))
      .then(() => {
        this.rootStore.carStore.initializeCarList();
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}
