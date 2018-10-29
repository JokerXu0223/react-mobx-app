/**
 * @component index.js
 * @description 入口轮播
 * @time 2018/10/29
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'native-base';
import { View } from 'react-native';
import uuidv1 from 'uuid/v1';

// static source
import beginnerGuide1 from '../../assets/images/beginnerGuide/beginnerGuide1.png';
import beginnerGuide2 from '../../assets/images/beginnerGuide/beginnerGuide2.png';
import beginnerGuide3 from '../../assets/images/beginnerGuide/beginnerGuide3.png';
import beginnerGuide4 from '../../assets/images/beginnerGuide/beginnerGuide4.png';

// constants
import { theme, routers } from '../../constants';

// utils
import { deviceWidth, deviceHeight } from '../../utils/device';

// components
import { IndicatorViewPager, PagerDotIndicator } from '../../components/ViewPager';
import CommStatusBar from '../../components/Layout/CommStatusBar';

const ContainerView = styled(Container)`
  background-color: #4F6D7A;
`;

const ImageNormal = styled.Image`
  width: ${deviceWidth};
  height: ${deviceWidth};
  margin-top: ${theme.moderateScale(60)};
`;

const ImageStretch = styled.Image`
  width: ${deviceWidth};
  height: ${deviceHeight};
`;

const NormalText = styled.Text`
  color: ${theme.textColor};
  font-size: ${theme.moderateScale(12)};
  font-weight: 400;
  text-align: center;
  margin-bottom: ${theme.moderateScale(8)};
`;

const FontText = styled.Text`
  color: #3D65E8;
  font-size: ${theme.moderateScale(24)};
  font-weight: 400;
  text-align: center;
  margin: 0px ${theme.moderateScale(6)}px ${theme.moderateScale(8)}px ${theme.moderateScale(6)}px;
`;

const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: ${theme.moderateScale(80)};
  left: ${(deviceWidth - theme.moderateScale(150)) / 2};
  align-items: center;
  justify-content: center;
  padding: ${theme.moderateScale(10)}px ${theme.moderateScale(64)}px;
  background-color: ${theme.primaryColor};
  border-radius: ${theme.moderateScale(25)};
  border-width: 0px;
  border-color: ${theme.whiteColor};
`;

const ButtonText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.whiteColor};
`;

const TextView = styled.View`
  flex: 1;
  justify-content: center;
`;

const dotStyle = {
  width: theme.moderateScale(7),
  height: theme.moderateScale(7),
  backgroundColor: theme.primaryColor,
};

const selectedDotStyle = {
  width: theme.moderateScale(30),
  height: theme.moderateScale(7),
  backgroundColor: theme.primaryColor,
};


const imgList = [
  {
    key: uuidv1(),
    image: beginnerGuide1,
  },
  {
    key: uuidv1(),
    image: beginnerGuide2,
  },
  {
    key: uuidv1(),
    image: beginnerGuide3,
  },
  {
    key: uuidv1(),
    image: beginnerGuide4,
  },
];

class BeginnerGuide extends React.Component {
  renderDotIndicator = (count) => {
    return (
      <PagerDotIndicator pageCount={count} dotStyle={dotStyle} selectedDotStyle={selectedDotStyle} />
    );
  };

  renderViews = () => {
    const {
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    const views = [];
    const v1 = (
      <View
        key={imgList[0].key}
        style={{
          width: deviceWidth,
          height: deviceHeight,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <ImageNormal source={imgList[0].image} />
        <TextView>
          <NormalText>矿机列表，算力提醒，矿工积分，其它更多功能</NormalText>
          <FontText>矿工必备</FontText>
        </TextView>
      </View>
    );
    const v2 = (
      <View
        key={imgList[1].key}
        style={{
          width: deviceWidth,
          height: deviceHeight,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <ImageNormal source={imgList[1].image} />
        <TextView>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <NormalText>上线全新</NormalText>
            <FontText>积分系统</FontText>
            <NormalText>，一键提取积分至主账户</NormalText>
          </View>
          <NormalText>后续可兑换多重惊喜</NormalText>
        </TextView>
      </View>
    );
    const v3 = (
      <View
        key={imgList[2].key}
        style={{
          width: deviceWidth,
          height: deviceHeight,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <ImageNormal source={imgList[2].image} />
        <TextView>
          <NormalText>开启手机推送提醒</NormalText>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
            <NormalText>随时获得</NormalText>
            <FontText>算力异常提醒</FontText>
          </View>
        </TextView>
      </View>
    );
    const v4 = (
      <View
        key={imgList[3].key}
        style={{
          width: deviceWidth,
          height: deviceHeight,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <ImageStretch source={imgList[3].image} />
        <Button
          onPress={() => navigate(routers.home)}
          style={{
            shadowColor: '#3D65E8',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 4,
            zIndex: 999,
          }}
        >
          <ButtonText>ENTER</ButtonText>
        </Button>
      </View>
    );
    views.push(v1);
    views.push(v2);
    views.push(v3);
    views.push(v4);
    return views;
  };


  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <IndicatorViewPager
          style={{ height: deviceHeight }}
          indicator={this.renderDotIndicator(imgList.length)}
        >
          { this.renderViews() }
        </IndicatorViewPager>
      </ContainerView>
    );
  }
}

BeginnerGuide.defaultProps = {};

BeginnerGuide.propTypes = {
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

export default BeginnerGuide;
