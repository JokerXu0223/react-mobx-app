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