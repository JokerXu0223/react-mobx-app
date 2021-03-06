/**
 * @component Styles.js
 * @description 布局相关
 * @time 2018/8/7
 * @author JUSTIN XU
 */
import styled from 'styled-components';
import theme from '../../constants/theme';
import { getFooterBottom } from '../../utils/device';

// container styles
export const ContainerView = styled.View`
  flex: 1;
  background-color: ${props => props.backgroundColor || theme.pageBackColor};
  padding-bottom: ${props => props.paddingBottom ? getFooterBottom() : 0};
`;

export const ContainerScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.backgroundColor || theme.pageBackColor};
  padding-bottom: ${props => props.paddingBottom ? getFooterBottom() : 0};
`;

export const DefaultHeaderView = styled.View`
  flex: 1;
  flex-direction: row;
`;

// divider styles
export const HorizontalDivider = styled.View`
  width: 100%;
  height: ${props => theme.moderateScale(props.height || 10)};
  background-color: ${props => props.backgroundColor || theme.pageBackColor};
  border-bottom-width: ${props => props.boarderBottomWidth || 0};
  border-bottom-color: ${props => props.boarderBottomColor || 'transparent'};
`;

export const VerticalDivider = styled.View`
  width: 1px;
  height: ${props => theme.moderateScale(props.height || 43)};
  background-color: ${props => props.backgroundColor || theme.borderColor};
`;
