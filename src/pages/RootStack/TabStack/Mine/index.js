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
import MineScreen from './Mine';

// static source
import mineIcon from '../../../../assets/images/tabbar/mine.png';
import mineActiveIcon from '../../../../assets/images/tabbar/mine-blue.png';
import { DefaultHeaderView } from '../../../../components/Layout/Styles';

const RouteConfig = {
  [routers.mine]: MineScreen,
};

const navigatorConfig = {
  initialRouteName: routers.mine,
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

const MineStack = createStackNavigator(RouteConfig, navigatorConfig);

const tabBarIcon = ({ focused }) => (
  <Image
    source={focused ? mineActiveIcon : mineIcon}
    style={{ height: theme.moderateScale(22), width: theme.moderateScale(28) }}
    resizeMode="contain"
  />
);

tabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

MineStack.navigationOptions = ({ navigation }) => {
  const { index } = navigation.state;
  return {
    tabBarVisible: index === 0,
    tabBarLabel: '我的',
    tabBarIcon,
  };
};

export default MineStack;
