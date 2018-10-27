/**
 * @component DiscoverItem.js
 * @description 发现音屏组件
 * @time 2018/10/26
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../../../../constants/theme';
// import { theme } from '../../../constants';

// components
import { VerticalDivider } from '../../../../../components/Layout/Styles';

const TextView = styled.Text.attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
`;

const VideoItem = styled.View`
  min-height: ${theme.moderateScale(60)};
  padding: 0 ${theme.moderateScale(10)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.borderColor};
`;

const VideoLeftItemView = styled.View`
  flex: 1.5;
`;

const VideoRightItemView = styled.View`
   flex: 1;
   flex-direction: row;
   justify-content: flex-end;
`;

const VideoDeleteButton = styled.TouchableOpacity`
   align-items: center;
   justify-content: center;
   padding: 0 ${theme.moderateScale(10)}px;
`;

const VideoDeleteText = styled.Text`
   color: ${theme.primaryColor};
`;

class DiscoverItem extends React.PureComponent {
  render() {
    const {
      item,
      onPlayItem,
      onDownloadItem,
    } = this.props;
    return (
      <VideoItem>
        <VideoLeftItemView>
          <TextView>{item.movieName}</TextView>
        </VideoLeftItemView>
        <VideoRightItemView>
          <VideoDeleteButton
            onPress={() => onPlayItem(item)}
          >
            <VideoDeleteText>Play</VideoDeleteText>
          </VideoDeleteButton>
          <VerticalDivider />
          <VideoDeleteButton
            onPress={() => onDownloadItem(item)}
          >
            <VideoDeleteText>Download</VideoDeleteText>
          </VideoDeleteButton>
        </VideoRightItemView>
      </VideoItem>
    );
  }
}

DiscoverItem.defaultProps = {
  item: {},
  index: 0,
  isLast: false,
  onPlayItem: () => null,
  onDownloadItem: () => null,
};

DiscoverItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  isLast: PropTypes.bool,
  onPlayItem: PropTypes.func,
  onDownloadItem: PropTypes.func,
};

export default DiscoverItem;
