/**
 * @component index
 * @description download demo页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';

// constants
import { routers } from '../../../../constants';

// components
import CommStatusBar from '../../../../components/Layout/CommStatusBar';
import LeftBackIcon from '../../../../components/Layout/LeftBackIcon';
import { ContainerScrollView, HorizontalDivider } from '../../../../components/Layout/Styles';
import Button from '../../../../components/Button';
import VideoList from './components/VideoList';

const TextView = styled.Text.attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
`;

@inject(({ rootStore }) => ({
  downloadFileStore: rootStore.downloadFileStore,
}))
@observer
class Download extends React.Component {
  state = {
  };
  componentDidMount() {
    this.props.downloadFileStore.getVideoListReq();
  }
  // initVideo = async () => {
  //   try {
  //     const { edges } = await CameraRoll.getPhotos({
  //       first: 20,
  //       assetType: 'Videos',
  //     });
  //     if (!(Array.isArray(edges) && edges.length)) return;
  //     const videoList = edges.map(value => value.node.image);
  //     this.setState({ videoList });
  //     console.log(videoList);
  //   } catch (err) {
  //     Toast.showError(err.message);
  //   }
  // };
  render() {
    const {
      props: {
        downloadFileStore: {
          loading,
          videoList,
          getDownloadReq,
          clearStrongListReq,
          onDeleteItemReq,
        },
        navigation: {
          navigate,
        },
      },
    } = this;
    const videoListProps = {
      videoList,
      onDeleteItemReq,
      onPlayItemReq: (uri) => {
        navigate(routers.videoPlay, { videoUrl: uri });
      },
    };
    return (
      <ContainerScrollView>
        <CommStatusBar />
        <TextView>
          Download
        </TextView>
        <HorizontalDivider />
        <VideoList {...videoListProps} />
        <HorizontalDivider />
        <Button
          loading={loading}
          onPress={getDownloadReq}
          text="下载"
        />
        <HorizontalDivider />
        <Button
          onPress={() => navigate(routers.demo)}
          text="Go mobx demo"
        />
        <HorizontalDivider />
        <Button
          onPress={clearStrongListReq}
          text="Clear Strong"
        />
        <HorizontalDivider />
      </ContainerScrollView>
    );
  }
}

Download.navigationOptions = ({ navigation }) => ({
  title: 'download',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

Download.defaultProps = {
  downloadFileStore: {},
};

Download.propTypes = {
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
  downloadFileStore: PropTypes.objectOf(PropTypes.any),
};

export default Download;
