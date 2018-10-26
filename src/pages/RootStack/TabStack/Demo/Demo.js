/**
 * @component index
 * @description mobx demo页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Text } from 'native-base';

// components
import CommStatusBar from '../../../../components/Layout/CommStatusBar';
import Button from '../../../../components/Button';

import { routers } from '../../../../constants';
// import DemoStore from '../../../../models/demo';

const ContainerView = styled.View`
`;

const TextView = styled.Text``;

@inject(({ rootStore }) => ({
  demoStore: rootStore.demoStore,
}))
@observer
class Demo extends React.Component {
  render() {
    const {
      props: {
        demoStore,
        navigation: {
          navigate,
        },
      },
    } = this;
    const { loading } = demoStore;
    return (
      <ContainerView>
        <CommStatusBar />
        <TextView>
          demo
        </TextView>
        <Text>Counter: {demoStore.counter}</Text>
        <Text>Total clicks: {demoStore.total}</Text>
        <Button
          onPress={demoStore.increase}
          loading={loading === 'increase'}
          disabled={loading && loading !== 'increase'}
          text="+"
        />
        <Button
          onPress={demoStore.decrease}
          loading={loading === 'decrease'}
          disabled={loading && loading !== 'decrease'}
          text="-"
        />
        <Button onPress={() => navigate(routers.download)}>
          <Text>Go download</Text>
        </Button>
      </ContainerView>
    );
  }
}

// { navigation }
Demo.navigationOptions = () => ({
  title: 'Demo',
});

Demo.defaultProps = {
  demoStore: {},
};

Demo.propTypes = {
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
  demoStore: PropTypes.objectOf(PropTypes.any),
};

export default Demo;
