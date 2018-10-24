import { AppRegistry } from 'react-native';
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
    console.ignoredYellowBox = [
        // 'Warning: checkPropTypes',
        // 'Warning: React.createClass',
        // 'Warning: PropTypes',
    ];
}

AppRegistry.registerComponent(appName, () => App);
