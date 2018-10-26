import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { routers, theme } from '../../constants';
import TabStack from './TabStack';

import SearchModal from './Modals/Search';
import { DefaultHeaderView } from '../../components/Layout/Styles';

const RouteConfigs = {
  /** Tab Stack */
  [routers.tabView]: TabStack,
  /** Modals Screen */
  // home
  [routers.search]: SearchModal,
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
