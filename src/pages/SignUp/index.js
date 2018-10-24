/**
 * @component index
 * @description 注册页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-native';
import PropTypes from 'prop-types';
import routers from '../../constants/routers';
// import { theme } from '../../../constants';

const ContainerView = styled.View`
`;

const TextView = styled.Text``;

class SignUp extends React.Component {
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
        <TextView>
          SignUp
        </TextView>
        <Button title="Go Home" onPress={() => navigate(routers.home)} />
      </ContainerView>
    );
  }
}

SignUp.defaultProps = {};

SignUp.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default SignUp;
