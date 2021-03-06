/**
 * @component index
 * @description 搜索页面
 * @time 2018/10/24
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
import styled from 'styled-components';
import { routers } from '../../../../constants';

import LeftBackIcon from '../../../../components/Layout/LeftBackIcon';
import CommStatusBar from '../../../../components/Layout/CommStatusBar';

const ContainerView = styled.View``;

const TextView = styled.Text``;

class Search extends React.Component {
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
          Search
        </TextView>
        <Button title="Go home" onPress={() => navigate(routers.home)} />
      </ContainerView>
    );
  }
}

Search.navigationOptions = ({ navigation }) => ({
  title: 'Search',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

Search.defaultProps = {};

Search.propTypes = {
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

export default Search;
