/**
 * @component index.js
 * @description 路由配置
 * @time 2018/10/23
 * @author JUSTIN XU
 */
// import PropTypes from 'prop-types';
import { createSwitchNavigator } from 'react-navigation';
import { routers } from '../constants/index';
// import { moderateScale } from './utils/scale';

import RootStack from './RootStack';
import AuthStack from './AuthStack';

const routeConfig = {
  [routers.root]: RootStack,
  [routers.auth]: AuthStack,
};

const navigatorConfig = {
  initialRouteName: routers.root,
  // initialRouteName: routeIds.authLoading,
  cardStyle: { shadowColor: 'transparent' },
  headerMode: 'none',
};

export default createSwitchNavigator(routeConfig, navigatorConfig);
