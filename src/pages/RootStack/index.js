import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { routers, theme } from '../../constants';
import TabStack from './TabStack';

import SearchModal from './Modals/Search';
import { getHeaderHeight, getHeaderPadding } from '../../utils/device';
import { moderateScale } from '../../utils/scale';
import { DefaultHeaderView } from '../../components/Styles/Layout';

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
    headerStyle: {
      paddingTop: getHeaderPadding(true),
      backgroundColor: theme.whiteColor,
      elevation: 0, // 去掉阴影
      height: getHeaderHeight() - getHeaderPadding(),
    },
    headerTitleStyle: {
      color: theme.textColor,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    headerLeft: (
      <DefaultHeaderView />
    ),
    headerRight: (
      <DefaultHeaderView />
    ),
  },
};

export default createStackNavigator(RouteConfigs, NavigatorConfig);
