/**
 * @component router.js
 * @description 路由配置
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';
import { BackHandler } from 'react-native';
import { routers } from './constants';
// import { moderateScale } from './utils/scale';
import { registerTopNavigator, goBack } from './utils/navigationService';

// root page -> common card
// root page -> common modal
// root page -> home
import HomeScreen from './pages/Home';
import SignInScreen from './pages/SignIn';
import SignUpScreen from './pages/SignUp';


const RootRouteConfig = {
  [routers.home]: { screen: HomeScreen },
  [routers.signIn]: { screen: SignInScreen },
  [routers.signUp]: { screen: SignUpScreen },
};

const RootNavigatorConfig = {
  initialRouteName: routers.home,
};

const RootNavigator = createStackNavigator(RootRouteConfig, RootNavigatorConfig);

class Routers extends React.Component {
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
      <RootNavigator
        ref={(navigatorRef) => {
          this.navigatorRef = navigatorRef;
          registerTopNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default Routers;
