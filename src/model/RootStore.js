import CarStore from './CarStore';
import NotificationsStore from './NotificationsStore';
import NavigationStore from './NavigationStore';
import ParametersStore from './ParametersStore';
import AppInitializer from './AppInitializer';

export default class RootStore {
  constructor() {
    this.carStore = new CarStore(this);
    this.notificationsStore = new NotificationsStore(this);
    this.navigationStrore = new NavigationStore(this);
    this.parametersStore = new ParametersStore(this);
    this.appInitializer = new AppInitializer(this);
  }
}
