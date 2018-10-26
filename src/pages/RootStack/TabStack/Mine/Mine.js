/**
 * @component index.js
 * @description 我的
 * @time 2018/10/25
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text } from 'native-base';
import PropTypes from 'prop-types';

import routers from '../../../../constants/routers';
// import { theme } from '../../../constants';

// components
import CommStatusBar from '../../../../components/Layout/CommStatusBar';

const ContainerView = styled.View``;

const TextView = styled.Text``;

class Mine extends React.Component {
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
          Mine
        </TextView>
        <Button onPress={() => navigate(routers.signIn, { fromRouteId: routers.mine })}>
          <Text>Go signIn</Text>
        </Button>
        <Button onPress={() => navigate(routers.search)}>
          <Text>Go search</Text>
        </Button>
      </ContainerView>
    );
  }
}

Mine.navigationOptions = () => ({
  title: 'mine',
});

Mine.defaultProps = {};

Mine.propTypes = {
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

export default Mine;
