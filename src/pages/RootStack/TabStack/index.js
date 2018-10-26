/**
 * @component index.js
 * @description tabView路由配置
 * @time 2018/10/24
 * @author JUSTIN XU
 */
import { createBottomTabNavigator } from 'react-navigation';
import { routers, theme } from '../../../constants';

import HomeScreen from './Home';
import DemoScreen from './Demo';
import MineScreen from './Mine';

const RouteConfig = {
  [routers.home]: HomeScreen,
  [routers.demo]: DemoScreen,
  [routers.mine]: MineScreen,
};

const navigatorConfig = {
  initialRouteName: routers.demo,
  tabBarOptions: {
    activeTintColor: theme.primaryColor,
    inactiveTintColor: theme.textColor,
    labelStyle: {
      fontSize: theme.moderateScale(10),
      marginLeft: 0,
    },
    style: {
      height: theme.moderateScale(49),
      backgroundColor: theme.headerColor,
      shadowOpacity: 0.05,
      shadowRadius: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      elevation: 2,
    },
    tabStyle: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'center',
    },
  },
};

const TabStack = createBottomTabNavigator(RouteConfig, navigatorConfig);

TabStack.navigationOptions = {
  header: null,
};

export default TabStack;
