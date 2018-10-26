/**
 * @component index
 * @description download demo页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CameraRoll, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { Button, Text } from 'native-base';

import { routers } from '../../../../constants';

// utils
import { downloadFile } from '../../../../utils/downloadFile';
import Toast from '../../../../utils/toast';

// components
import CommStatusBar from '../../../../components/Layout/CommStatusBar';
import LeftBackIcon from '../../../../components/Layout/LeftBackIcon';

const ContainerView = styled.View`
`;

const TextView = styled.Text``;

class Download extends React.Component {
  state = {
    // videoList: [],
    url: '',
  };
  componentDidMount() {
    // this.initVideo();
    this.initVideoUrl();
  }
  onPressDownload = async () => {
    // downloadFile('https://btccpool.com/static/images/bg.jpg', (pro) => {
    //   console.log('@pro', pro);
    // });
    // const url = await downloadFile('https://hashcloudmining.com//hashcloud_video_grey.mp4', (pro) => {
    const url = await downloadFile('https://media.w3.org/2010/05/sintel/trailer.mp4', (pro) => {
      console.log('@pro', pro);
    });
    await AsyncStorage.setItem('videoUrl', url);
    this.setState({ url });
  };
  initVideoUrl = async () => {
    const url = await AsyncStorage.getItem('videoUrl');
    this.setState({ url });
  };
  initVideo = async () => {
    try {
      const { edges } = await CameraRoll.getPhotos({
        first: 20,
        assetType: 'Videos',
      });
      if (!(Array.isArray(edges) && edges.length)) return;
      const videoList = edges.map(value => value.node.image);
      // this.setState({ videoList });
      console.log(videoList);
    } catch (err) {
      Toast.showError(err.message);
    }
  };
  render() {
    const {
      state: {
        url,
      },
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    console.log('@url', url);
    return (
      <ContainerView>
        <CommStatusBar />
        <TextView>
          Download
        </TextView>
        <Button onPress={this.onPressDownload}>
          <Text>下载</Text>
        </Button>
        <Button onPress={() => navigate(routers.demo)}>
          <Text>Go mobx demo</Text>
        </Button>
        <Button onPress={() => navigate(routers.videoPlay, { videoUrl: url })}>
          <Text>Go video play</Text>
        </Button>
      </ContainerView>
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

Download.defaultProps = {};

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
};

export default Download;
