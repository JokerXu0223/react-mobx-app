/**
 * @component index
 * @description 登陆页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
import styled from 'styled-components';
import { routers } from '../../../constants';

// components
import CommStatusBar from '../../../components/Layout/CommStatusBar';
import LeftBackIcon from '../../../components/Layout/LeftBackIcon';

const ContainerView = styled.View`
`;

const TextView = styled.Text``;

class SignIn extends React.Component {
  render() {
    const {
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    return (
      <ContainerView>
        <CommStatusBar />
        <TextView>
          signIn
        </TextView>
        <Button title="Go signUp" onPress={() => navigate(routers.signUp)} />
      </ContainerView>
    );
  }
}

SignIn.navigationOptions = ({ navigation }) => {
  const fromRouteId = navigation.getParam('fromRouteId', routers.home);
  return {
    title: 'SignIn',
    headerLeft: (
      <LeftBackIcon
        onPress={() => navigation.navigate(fromRouteId)}
      />
    ),
  };
};

SignIn.defaultProps = {};

SignIn.propTypes = {
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

export default SignIn;
