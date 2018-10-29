import { NavigationActions, StackActions } from 'react-navigation';

let topNavigator;

export const registerTopNavigator = (navigatorRef) => {
  topNavigator = navigatorRef;
};

export const reset = (routeName, params) => {
  topNavigator.dispatch(StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
        params,
      }),
    ],
  }));
};

export const replace = ({
  key,
  newKey = null,
  routeName,
  params = null,
  action = null,
  immediate = null,
}) => {
  topNavigator.dispatch(StackActions.replace({
    key,
    newKey,
    routeName,
    params,
    action,
    immediate,
  }));
};

export const push = (routeName, params) => {
  topNavigator.dispatch(StackActions.push({
    routeName,
    params,
  }));
};

export const pop = (n) => {
  topNavigator.dispatch(StackActions.pop({
    n,
  }));
};

export const navigate = (routeName, params) => {
  topNavigator.dispatch(NavigationActions.navigate({
    routeName,
    params,
  }));
};

/**
 * Notice! behavior is not always same with props.navigation.goBack in View component
 * in the case of nested navigators, use props.navigation.goBack instead!
 */
export const goBack = (key = null) => {
  topNavigator.dispatch(NavigationActions.back({ key }));
};
