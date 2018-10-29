/**
 * @component index.js
 * @description 入口轮播
 * @time 2018/10/29
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'native-base';

// constants
import { theme } from '../../constants';

// components
import CommStatusBar from '../../components/Layout/CommStatusBar';

const ContainerView = styled(Container)`
  background-color: #4F6D7A;
  align-items: center;
  justify-content: center;
`;

const TextView = styled.Text`
  color: ${theme.whiteColor};
  text-align: center;
`;

class BeginnerGuide extends React.PureComponent {
  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <TextView>
          beginnerGuide page
        </TextView>
      </ContainerView>
    );
  }
}

BeginnerGuide.defaultProps = {};

BeginnerGuide.propTypes = {};

export default BeginnerGuide;
