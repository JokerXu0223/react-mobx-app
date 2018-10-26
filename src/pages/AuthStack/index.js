/**
 * @component index.js
 * @description 权限路由配置
 * @time 2018/10/24
 * @author JUSTIN XU
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { routers } from '../../constants';
import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import theme from '../../constants/theme';
import { DefaultHeaderView } from '../../components/Layout/Styles';

const RouteConfigs = {
  [routers.signIn]: SignInScreen,
  [routers.signUp]: SignUpScreen,
};

const NavigatorConfig = {
  initialRouteName: routers.signIn,
  mode: 'modal',
  // headerMode: 'none',
  navigationOptions: {
    headerStyle: theme.headerStyle,
    headerTitleStyle: theme.headerTitleStyle,
    headerLeft: (
      <DefaultHeaderView />
    ),
    headerRight: (
      <DefaultHeaderView />
    ),
  },
};

export default createStackNavigator(RouteConfigs, NavigatorConfig);
