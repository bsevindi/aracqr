import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { observer, inject } from 'mobx-react/native';
import { addNavigationHelpers } from 'react-navigation';
import { AppNavigation } from './navigation/AppNavigation';
import RootStore from './model/RootStore';

export default class App extends Component {
  render() {
    return (
      <Provider rootStore={new RootStore()}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

@inject('rootStore')
@observer
class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigation
        navigation={addNavigationHelpers({
        dispatch: this.props.rootStore.navigationStrore.dispatch,
        state: this.props.rootStore.navigationStrore.navigationState,
        })}
      />
    );
  }
}
