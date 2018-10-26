/**
 * @component Discover.js
 * @description 发现页面
 * @time 2018/10/26
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import LeftBackIcon from '../../../../components/Layout/LeftBackIcon';
// import { theme } from '../../../constants';

const ContainerView = styled.View``;
const TextView = styled.Text``;

class Discover extends React.Component {
  render() {
    return (
      <ContainerView>
        <TextView>
          Discover
        </TextView>
      </ContainerView>
    );
  }
}

Discover.navigationOptions = ({ navigation }) => ({
  title: 'discover',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

Discover.defaultProps = {};

Discover.propTypes = {};

export default Discover;
