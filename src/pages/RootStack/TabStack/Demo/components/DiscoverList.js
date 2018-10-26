/**
 * @component DiscoverList.js
 * @description 发现音屏组件
 * @time 2018/10/26
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toJS } from 'mobx';

import theme from '../../../../../constants/theme';
// import { theme } from '../../../constants';

// components
import { VerticalDivider } from '../../../../../components/Layout/Styles';

const ContainerView = styled.View`
  background-color: #ffffff;
`;

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

const VideoItemView = styled.View`
   flex: 1;
   flex-direction: row;
   justify-content: flex-end;
`;

const VideoDeleteButton = styled.TouchableOpacity`
   align-items: center;
   justify-content: center;
   min-width: ${theme.moderateScale(60)};
`;

const VideoDeleteText = styled.Text`
   color: ${theme.primaryColor};
`;

const DiscoverList = ({
  videoList,
  onPlayItemReq,
  onDeleteItemReq,
}) => {
  function renderVideoItem() {
    console.log(toJS(videoList));
    if (!(videoList.length)) return null;
    return videoList.map((_, i) => {
      return (
        <VideoItem key={i}>
          <VideoItemView>
            <TextView>{_.uri}</TextView>
          </VideoItemView>
          <VideoItemView>
            <VideoDeleteButton
              onPress={() => onPlayItemReq(_.uri)}
            >
              <VideoDeleteText>Play</VideoDeleteText>
            </VideoDeleteButton>
            <VerticalDivider />
            <VideoDeleteButton
              onPress={() => onDeleteItemReq(_.uri, i)}
            >
              <VideoDeleteText>Delete</VideoDeleteText>
            </VideoDeleteButton>
          </VideoItemView>
        </VideoItem>
      );
    });
  }
  return (
    <ContainerView>
      {renderVideoItem()}
    </ContainerView>
  );
};

DiscoverList.defaultProps = {
  onPlayItemReq: () => null,
  onDeleteItemReq: () => null,
};

DiscoverList.propTypes = {
  videoList: PropTypes.objectOf(PropTypes.any).isRequired,
  onPlayItemReq: PropTypes.func,
  onDeleteItemReq: PropTypes.func,
};

export default DiscoverList;
