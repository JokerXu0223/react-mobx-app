/**
 * @component index.js
 * @description home路由配置
 * @time 2018/10/24
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { routers, theme } from '../../../../constants';
import HomeScreen from './Home';

// static source
import homeIcon from '../../../../assets/img/tabbar/home.png';
import homeActiveIcon from '../../../../assets/img/tabbar/home-blue.png';
import { DefaultHeaderView } from '../../../../components/Layout/Styles';

const RouteConfig = {
  [routers.home]: HomeScreen,
};

const navigatorConfig = {
  initialRouteName: routers.home,
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
    source={focused ? homeActiveIcon : homeIcon}
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
    tabBarLabel: '首页',
    tabBarIcon,
  };
};

export default HomeStack;
