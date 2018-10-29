/**
 * @component index.js
 * @description 路由配置
 * @time 2018/10/23
 * @author JUSTIN XU
 */
// import PropTypes from 'prop-types';
import { createSwitchNavigator } from 'react-navigation';
import { routers } from '../constants';

import AuthStack from './AuthStack';
import BeginnerGuideStack from './BeginnerGuide';
import RootStack from './RootStack';

const routeConfig = {
  [routers.auth]: AuthStack,
  [routers.beginnerGuide]: BeginnerGuideStack,
  [routers.root]: RootStack,
};

const navigatorConfig = {
  initialRouteName: routers.beginnerGuide,
  // initialRouteName: routeIds.authLoading,
  cardStyle: { shadowColor: 'transparent' },
  headerMode: 'none',
};

export default createSwitchNavigator(routeConfig, navigatorConfig);
