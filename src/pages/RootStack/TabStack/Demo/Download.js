/**
 * @component index
 * @description download demo页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text } from 'native-base';

import { routers } from '../../../../constants';
import { downloadFile } from '../../../../utils/downloadFile';
// components
import CommStatusBar from '../../../../components/Layout/CommStatusBar';

const ContainerView = styled.View`
`;

const TextView = styled.Text``;

class Download extends React.Component {
  onPressDownload = () => {
    // downloadFile('https://btccpool.com/static/images/bg.jpg', (pro) => {
    //   console.log('@pro', pro);
    // });
    downloadFile('https://hashcloudmining.com//hashcloud_video_grey.mp4', (pro) => {
      console.log('@pro', pro);
    });
  };
  render() {
    const {
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
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
      </ContainerView>
    );
  }
}

Download.navigationOptions = ({ navigation }) => ({
  title: 'download',
});

Download.defaultProps = {};

Download.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default Download;
