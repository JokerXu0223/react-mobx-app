/**
 * @component AuthLoading.js
 * @description 处理权限页面
 * @time 2018/10/30
 * @author JUSTIN XU
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// constants
import { routers } from '../constants/index';

// const ContainerView = styled.View``;
// const TextView = styled.Text``;

class AuthLoading extends React.Component {
  componentDidMount() {
    this.initApp();
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  initApp = async () => {
    const {
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    this.timer = setTimeout(() => {
      navigate(routers.root);
    }, 5000);
    const appVersion = await AsyncStorage.getItem('appVersion');
    const lastAppVersion = DeviceInfo.getVersion();
    if (!appVersion || lastAppVersion > appVersion) {
      await AsyncStorage.setItem('appVersion', lastAppVersion);
      navigate(routers.beginnerGuide);
    } else {
      navigate(routers.root);
    }
  };
  clearTimer = () => {
    if (!this.timer) return;
    clearTimeout(this.timer);
    this.timer = null;
  };
  render() {
    return null;
  }
}

AuthLoading.defaultProps = {};

AuthLoading.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    getParam: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default AuthLoading;
