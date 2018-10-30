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
import AuthLoadingStack from './AuthLoading';

const routeConfig = {
  [routers.auth]: AuthStack,
  [routers.beginnerGuide]: BeginnerGuideStack,
  [routers.root]: RootStack,
  [routers.authLoading]: AuthLoadingStack,
};

const navigatorConfig = {
  // initialRouteName: routers.root,
  initialRouteName: routers.authLoading,
  cardStyle: { shadowColor: 'transparent' },
  headerMode: 'none',
};

export default createSwitchNavigator(routeConfig, navigatorConfig);
