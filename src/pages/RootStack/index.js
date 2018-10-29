import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { routers, theme } from '../../constants';

// components
import { DefaultHeaderView } from '../../components/Layout/Styles';


import SearchModalScreen from './Modals/Search';
import VideoPlayScreen from './Modals/VideoPlay';
import TabStack from './TabStack';

const RouteConfigs = {
  /** Tab Stack */
  [routers.tabView]: TabStack,
  /** Modals Screen */
  // home
  [routers.search]: SearchModalScreen,
  [routers.videoPlay]: VideoPlayScreen,
};

const NavigatorConfig = {
  initialRouteName: routers.tabView,
  mode: 'modal',
  // headerMode: 'none',
  cardStyle: { shadowColor: 'transparent' },
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
