import { AppRegistry, YellowBox } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

if (!__DEV__) {
  global.console = {
    info: () => {
    },
    log: () => {
    },
    warn: () => {
    },
    error: () => {
    },
  };
} else {
  YellowBox.ignoreWarnings([
    // 'Warning: The "extend" API will be removed',
    'Warning: "Provider": It is not recommended to assign props directly to ',
  ]);
}

AppRegistry.registerComponent(appName, () => App);
