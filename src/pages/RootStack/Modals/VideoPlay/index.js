/**
 * @component index.js
 * @description 视频播放
 * @time 2018/10/24
 * @author JUSTIN XU
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import { Container, Icon } from 'native-base';

// utils
import { isIphoneX, deviceHeight, getVideoHeaderPadding, getVideoFooterBottom } from '../../../../utils/device';
import Toast from '../../../../utils/toast';

// constants
import { theme } from '../../../../constants';

// components
import CommStatusBar from '../../../../components/Layout/CommStatusBar';

const navHeight = 44;

// format media time
function formatMediaTime(duration) {
  let min = Math.floor(duration / 60);
  let second = duration - (min * 60);
  min = min >= 10 ? min : `0${min}`;
  second = second >= 10 ? second : `0${second}`;
  return `${min}:${second}`;
}

const ContainerView = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  justify-content: space-between;
  padding-top: ${props => props.paddingTop}px;
  background-color: ${theme.blackColor};
`;

const VideoView = styled(Video)`
  position: absolute;
  top: ${props => props.paddingTop}px;
  left: 0;
  bottom: 0;
  right: 0;
`;

// nav styles
const NavContainerView = styled.View`
  padding: 0 ${theme.moderateScale(10)}px;
  height: ${navHeight}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLeftView = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const NavLeftIconView = styled.TouchableOpacity`
`;

const NavLeftText = styled.Text`
  color: ${theme.whiteColor};
  margin-left: ${theme.moderateScale(10)};
`;

const NavRightView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NavRightIconView = styled.TouchableOpacity`
  margin: 0 ${theme.moderateScale(5)}px;
`;

const LockIconView = styled.TouchableOpacity`
  margin: 0 ${theme.moderateScale(10)}px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

// toolBar styles
const ToolBarView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.moderateScale(10)}px;
  margin-top: ${theme.moderateScale(10)};
  padding-bottom: ${props => props.paddingBottom}px;
  height: ${props => theme.moderateScale(30) + props.paddingBottom};
`;

const ProgressView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 ${theme.moderateScale(10)}px;
`;

const TimeText = styled.Text`
  min-width: ${theme.moderateScale(35)};
  color: ${theme.whiteColor};
  font-size: ${theme.moderateScale(12)};
`;

const SliderView = styled.Slider`
  flex: 1;
  margin: 0 ${theme.moderateScale(5)}px;
  height: ${theme.moderateScale(20)};
`;

class VideoPlay extends Component {
  static playerRef = null;

  state = {
    slideValue: 0.00,
    currentTime: 0.00,
    duration: 0.00,
    paused: false,
    playIcon: 'ios-pause',
    isTouchedScreen: true,
    isLock: false,
    videoWidth: deviceHeight,
    videoHeight: 280, // 默认16：9的宽高比
  };

  // / 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
  onLayout = (event) => {
    // 获取根View的宽高
    const { width, height } = event.nativeEvent.layout;
    console.log(`通过onLayout得到的宽度：${width}`);
    console.log(`通过onLayout得到的高度：${height}`);

    // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
    const isLandscape = (width > height);
    if (isLandscape) {
      this.setState({
        isFullScreen: true,
        videoWidth: width,
        videoHeight: height,
      });
    } else {
      this.setState({
        isFullScreen: false,
        videoWidth: width,
        videoHeight: (width * 9) / 16,
      });
    }
    Orientation.unlockAllOrientations();
  };

  // video func
  onLoadStart = (data) => {
    console.log('loadStart', data);
  };
  onLoad = (duration) => {
    this.setState({ duration: duration.duration });
  };
  onProgress = (data) => {
    const sliderValue = parseInt(this.state.currentTime, 10);
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime,
    });
  };
  onEnd = () => {
    this.playerRef.seek(0);
  };
  onError = () => {
    Toast.showError('播放器报错啦！');
  };
  onBuffer = (data) => {
    console.log('onBuffer', data);
  };
  onTimedMetadata = (data) => {
    console.log('onTimedMetadata', data);
  };

  play = () => {
    this.setState({
      paused: !this.state.paused,
      playIcon: this.state.paused ? 'ios-pause' : 'ios-play',
    });
  };

  renderNavContainer = () => {
    const {
      state: {
        isLock,
        isFullScreen,
      },
      props: {
        navigation,
      },
    } = this;
    const {
      videoTitle: title,
    } = navigation.getParam('video') || {};
    if (isLock) {
      return (
        <NavContainerView />
      );
    }
    return (
      <NavContainerView>
        <NavLeftView>
          <NavLeftIconView
            onPress={
              !isFullScreen ?
                () => navigation.goBack()
                :
                Orientation.lockToPortrait
            }
          >
            <Icon
              name="ios-close"
              style={{
                color: theme.whiteColor,
                fontSize: theme.moderateScale(25),
              }}
            />
          </NavLeftIconView>
          <NavLeftText>{title}</NavLeftText>
        </NavLeftView>
        <NavRightView>
          <NavRightIconView
            style={{
              borderColor: theme.whiteColor,
              borderWidth: 0.5,
              padding: 3,
            }}
            onPress={() => alert('开启弹幕！')}
          >
            <Text
              style={{
                color: theme.whiteColor,
                fontSize: 12,
              }}
            >
              弹
            </Text>
          </NavRightIconView>
          <NavRightIconView
            onPress={() => alert('下载！')}
          >
            <Icon
              name="md-download"
              style={{
                color: theme.whiteColor,
                fontSize: theme.moderateScale(20),
              }}
            />
          </NavRightIconView>
          <NavRightIconView
            onPress={() => alert('设置画面！')}
          >
            <Icon
              name="ios-aperture"
              style={{
                color: theme.whiteColor,
                fontSize: theme.moderateScale(20),
              }}
            />
          </NavRightIconView>
        </NavRightView>
      </NavContainerView>
    );
  };

  render() {
    const {
      state: {
        isFullScreen,
        isLock,
        paused,
        playIcon,
        videoWidth,
        videoHeight,
        currentTime,
        slideValue,
        duration,
      },
      props: {
        navigation,
      },
    } = this;
    const {
      url,
    } = navigation.getParam('video') || {};
    if (!url) {
      return (
        <View />
      );
    }
    const paddingTop = getVideoHeaderPadding(isFullScreen);
    console.log(paddingTop);
    return (
      <Container
        onLayout={this.onLayout}
      >
        <CommStatusBar />
        <ContainerView
          style={{
            width: videoWidth,
            height: isFullScreen ? videoHeight : videoHeight + navHeight + paddingTop,
          }}
          paddingTop={paddingTop}
          onPress={() => this.setState({ isTouchedScreen: !this.state.isTouchedScreen })}
        >
          <VideoView
            source={{ uri: url }}
            innerRef={(ref) => { this.playerRef = ref; }}
            rate={1.0}
            volume={1.0}
            muted={false}
            paused={paused}
            resizeMode="cover"
            repeat
            playInBackground={false}
            playWhenInactive={false}
            ignoreSilentSwitch="ignore"
            progressUpdateInterval={250.0}
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onError={this.onError}
            onBuffer={this.onBuffer}
            onTimedMetadata={this.onTimedMetadata}
            style={{
              width: videoWidth,
              height: isFullScreen ? videoHeight - paddingTop - getVideoFooterBottom() : videoHeight,
            }}
            top={isFullScreen ? paddingTop : navHeight + paddingTop}
          />
          {this.renderNavContainer()}
          {
            isFullScreen ?
              <LockIconView
                onPress={() => this.setState({ isLock: !this.state.isLock })}
              >
                <Icon
                  name={`${isLock ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'}`}
                  style={{
                    color: theme.whiteColor,
                    fontSize: theme.moderateScale(20),
                  }}
                />
              </LockIconView> : null
          }
          {
            // this.state.isTouchedScreen && !isLock ?
            !isLock ?
              <ToolBarView
                paddingBottom={
                  (isIphoneX() && isFullScreen) ? 20 : 0
                }
              >
                <TouchableOpacity onPress={() => this.play()}>
                  <Icon
                    name={playIcon}
                    style={{
                      color: theme.whiteColor,
                      fontSize: theme.moderateScale(18),
                    }}
                  />
                </TouchableOpacity>
                <ProgressView>
                  <TimeText>
                    {formatMediaTime(Math.floor(currentTime))}
                  </TimeText>
                  <SliderView
                    value={slideValue}
                    maximumValue={duration}
                    minimumTrackTintColor={theme.primaryColor}
                    maximumTrackTintColor={theme.textGrayColor}
                    step={1}
                    onValueChange={value => this.setState({ currentTime: value })}
                    onSlidingComplete={value => this.playerRef.seek(value)}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 35 }}>
                    <Text
                      style={{
                        color: theme.whiteColor,
                        fontSize: 12,
                      }}
                    >
                      {formatMediaTime(Math.floor(duration))}
                    </Text>
                  </View>
                </ProgressView>
                {
                  !isFullScreen ?
                    <TouchableOpacity onPress={Orientation.lockToLandscapeLeft}>
                      <Icon
                        name="ios-expand"
                        style={{
                          color: theme.whiteColor,
                          fontSize: theme.moderateScale(18),
                        }}
                      />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={Orientation.lockToPortrait}>
                      <Icon
                        name="ios-contract"
                        style={{
                          color: theme.whiteColor,
                          fontSize: theme.moderateScale(18),
                        }}
                      />
                    </TouchableOpacity>
                }
              </ToolBarView> : (
                <View style={{ height: navHeight }} />
              )
          }
        </ContainerView>
      </Container>
    );
  }
}

// { navigation }
VideoPlay.navigationOptions = () => ({
  header: null,
});

VideoPlay.defaultProps = {};

VideoPlay.propTypes = {
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

export default VideoPlay;
