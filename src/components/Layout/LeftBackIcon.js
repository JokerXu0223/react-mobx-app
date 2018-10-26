/**
 * @component LeftBackIcon.jsx
 * @description 右侧返回
 * @time 2018/8/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'native-base';

// utils
import { goBack } from '../../utils/navigationService';

import { theme } from '../../constants';

import TouchableView from '../TouchableView';

const ContainerView = styled.View`
  flex-direction: row;
  flex: 1;
`;

class LeftBackIcon extends React.PureComponent {
  render() {
    const {
      props: { onPress },
    } = this;
    return (
      <ContainerView>
        <TouchableView
          onPress={onPress || (() => goBack())}
          style={{
            paddingLeft: theme.moderateScale(10),
            paddingRight: theme.moderateScale(10),
            justifyContent: 'center',
          }}
        >
          <Icon
            name="ios-arrow-back"
            style={{
              color: theme.whiteColor,
              marginLeft: theme.moderateScale(8),
              fontSize: theme.moderateScale(23),
            }}
          />
        </TouchableView>
      </ContainerView>
    );
  }
}

LeftBackIcon.defaultProps = {
  onPress: null,
};

LeftBackIcon.propTypes = {
  onPress: PropTypes.func,
};


export default LeftBackIcon;
