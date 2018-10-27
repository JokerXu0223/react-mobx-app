/**
 * @component index.js
 * @description demo路由配置
 * @time 2018/10/24
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { routers, theme } from '../../../../constants';

import DemoScreen from './Demo';
import DiscoverScreen from './Discover';
import DownloadScreen from './Download';

// static source
import demoIcon from '../../../../assets/images/tabbar/discover.png';
import demoActiveIcon from '../../../../assets/images/tabbar/discover-blue.png';
import { DefaultHeaderView } from '../../../../components/Layout/Styles';

const RouteConfig = {
  [routers.demo]: DemoScreen,
  [routers.discover]: DiscoverScreen,
  [routers.download]: DownloadScreen,
};

const navigatorConfig = {
  initialRouteName: routers.discover,
  cardStyle: { shadowColor: 'transparent' },
  mode: 'card',
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

const HomeStack = createStackNavigator(RouteConfig, navigatorConfig);

const tabBarIcon = ({ focused }) => (
  <Image
    source={focused ? demoActiveIcon : demoIcon}
    style={{ height: theme.moderateScale(22), width: theme.moderateScale(28) }}
    resizeMode="contain"
  />
);

tabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

HomeStack.navigationOptions = ({ navigation }) => {
  const { index } = navigation.state;
  return {
    tabBarVisible: index === 0,
    tabBarLabel: 'Demo',
    tabBarIcon,
  };
};

export default HomeStack;
