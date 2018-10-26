/**
 * @component Button.js
 * @description 提供loading和disabled状态的按钮组件
 * @time 2018/10/25
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { theme } from '../constants';

const Container = styled.TouchableOpacity`
  background-color: ${props => (props.disabled && !props.loading) ? theme.textColor : props.backgroundColor};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  width: ${props => props.width};
  height: ${props => props.height};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: ${theme.moderateScale(23)}px;
`;

const Label = styled.Text`
  color: ${props => props.textColor};
  font-size: ${props => props.textSize};
  padding-left: ${theme.moderateScale(3)}px;
`;

const LoadingIcon = styled.ActivityIndicator``;

const Button = ({
  disabled,
  loading,
  text,
  onPress,
  textColor,
  textSize,
  width,
  height,
  backgroundColor,
  children,
}) => {
  function renderLoading() {
    if (disabled) return null;
    if (loading) {
      return (
        <LoadingIcon size="small" color={theme.whiteColor} />
      );
    }
    return null;
  }
  function renderChildren() {
    if (children) return children;
    return (
      <Label textColor={textColor} textSize={textSize}> {text} </Label>
    );
  }
  return (
    <Container
      backgroundColor={backgroundColor}
      disabled={!!loading || !!disabled}
      loading={!!loading}
      onPress={onPress}
      width={width}
      height={height}
      activeOpacity={0.7}
    >
      {renderLoading()}
      {renderChildren()}
    </Container>
  );
};

Button.defaultProps = {
  disabled: false,
  loading: false,
  text: 'login',
  onPress: null,
  textColor: theme.whiteColor,
  textSize: theme.moderateScale(16),
  width: theme.moderateScale(279),
  height: theme.moderateScale(45),
  backgroundColor: theme.primaryColor,
  children: null,
};

Button.propTypes = {
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  loading: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  text: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
