import { observable, action } from 'mobx';
import { AppNavigation } from '../navigation/AppNavigation';

export default class NavigationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable.ref navigationState = {
    index: 0,
    routes: [
      { key: 'ToHome', routeName: 'ToHome' },
    ],
  }

  @action dispatch = (navAction, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null;
    this.navigationState = AppNavigation
        .router
        .getStateForAction(navAction, previousNavState);
    return this.navigationState;
  }
}
