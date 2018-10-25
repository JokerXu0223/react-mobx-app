/**
 * @component index.js
 * @description 入口页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
import { BackHandler } from 'react-native';
import { Provider } from 'mobx-react';
import RootStore from './models';

import Navigator from './pages';
import { goBack, registerTopNavigator } from './utils/navigationService';

class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressAndroidBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressAndroidBack);
  }

  onPressAndroidBack = () => {
    const {
      state: {
        nav: { index = 0, routes = [] },
      } = {},
    } = this.navigatorRef;
    const currRoutes = routes[index].routes;
    const isRootPage = Array.isArray(currRoutes) && currRoutes.length === 1;
    if (isRootPage) {
      return false;
    }
    goBack();
    return true;
  };
  render() {
    return (
      <Provider rootStore={RootStore}>
        <Navigator
          ref={(navigatorRef) => {
            this.navigatorRef = navigatorRef;
            registerTopNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

export default App;
