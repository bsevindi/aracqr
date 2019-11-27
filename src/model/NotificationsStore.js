import { observable, action, computed } from 'mobx';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { Platform } from 'react-native';
import noop from '../util/noop';

export default class NotificationsStore {

  @observable notificationsToken = '';
  @observable clientId = ''; // todo sil

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.tokenRefreshState = 'completed';
    // app is opened from notification
    firebase.messaging().getInitialNotification()
    .then((notification) => {
      // when the app is first opened, FCM sends a null notification.
      // this notification should not cause app to display NotificationsStore
      // screen.
      if (this.shouldNotificationCauseNavigation(notification)) {
        const resetAction = this.getRouteResetAction(notification);
        this.rootStore.navigationStrore
        .dispatch(resetAction);
      }
    })
    .catch(() => {
      // cannot do anything if notification fails
      noop();
    });

    // app is running
    firebase.messaging().onMessage((notification) => {
      if (this.shouldNotificationCauseNavigation(notification)) {
        const resetAction = this.getRouteResetAction(notification);
        this.rootStore.navigationStrore
        .dispatch(resetAction);
      }
    });

    firebase.messaging().onTokenRefresh(() => {
      //console.log('Network IO: NotificationsStore.constructor..onTokenRefresh');
      firebase.messaging().getToken()
      .then(newToken => {
        this.setNotificationsToken(newToken);
        return this.rootStore.parametersStore
          .updateClientParameters(newToken);
      })
      .catch(() => {
        // cannot do anything now. when the app starts again,
        // initializing logic will try again.
        noop();
      });
    });
  }

  @computed get isNotificationsTokenSet() {
    return this.notificationsToken !== '';
  }

  @action setNotificationsToken(token) {
    this.notificationsToken = token;
  }

  @action initializeNotificationsClient() {
    if (this.isNotificationsTokenSet) return Promise.resolve(this.notificationsToken);
    return new Promise((resolve, reject) => {
      firebase.messaging().getToken()
      .then((newToken) => {
        this.setNotificationsToken(newToken);
        return this.rootStore.parametersStore
          .updateClientParameters(newToken);
      })
      .then(() => resolve())
      .catch((err) => reject(err));
    });
  }

  shouldNotificationCauseNavigation(notification) {
    let result = false;

    if (Platform.OS === 'ios' && typeof notification !== 'undefined') {
      result = true;
    }

    if (Platform.OS === 'android' && notification.opened_from_tray === true
        && notification.fcm.action !== null) {
      result = true;
    }

    if (Platform.OS === 'android' && typeof notification.fcm.title !== 'undefined') {
      result = true;
    }

    return result;
  }

  getRouteResetAction(payload) {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'ToHome' }),
        NavigationActions.navigate({
          routeName: 'ToNotifications',
          params: { payload }
        }),
      ]
    });
    return resetAction;
  }
}
