/**
 * @component index.js
 * @description 首页
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import routers from '../../constants/routers';
import DemoStore from '../../models/demo';
// import { theme } from '../../../constants';

const ContainerView = styled.View``;

const TextView = styled.Text``;

@observer
class Home extends React.Component {
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
          HOME
        </TextView>
        <Text>Counter: {DemoStore.counter}</Text>
        <Text>Total clicks: {DemoStore.total}</Text>
        <Button onPress={DemoStore.increase}>
          <Text>+</Text>
        </Button>
        <Button onPress={DemoStore.decrease}>
          <Text>-</Text>
        </Button>
        <Button onPress={() => navigate(routers.signIn)}>
          <Text>Go signIn</Text>
        </Button>
      </ContainerView>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {
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

export default Home;
