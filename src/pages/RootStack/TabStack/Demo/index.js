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
// import { getHeaderPadding, getHeaderHeight } from '../../../../utils/device';
// import { moderateScale } from '../../../../utils/scale';
import DemoScreen from './Demo';
import DownloadScreen from './Download';
import VideoPlayScreen from './VideoPlay';

// import { DefaultHeaderView } from '../../../../components/Layout/Styles';

// static source
import demoIcon from '../../../../assets/img/tabbar/discover.png';
import demoActiveIcon from '../../../../assets/img/tabbar/discover-blue.png';

const RouteConfig = {
  [routers.demo]: DemoScreen,
  [routers.download]: DownloadScreen,
  [routers.videoPlay]: VideoPlayScreen,
};

const navigatorConfig = {
  initialRouteName: routers.download,
  cardStyle: { shadowColor: 'transparent' },
  mode: 'card',
  // headerMode: 'none',
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
