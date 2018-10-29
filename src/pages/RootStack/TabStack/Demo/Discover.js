/**
 * @component Discover.js
 * @description 发现页面
 * @time 2018/10/26
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'native-base';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { routers } from '../../../../constants';

// components
import LeftBackIcon from '../../../../components/Layout/LeftBackIcon';
import FlatListTable from '../../../../components/FlatListTable';
import DiscoverItem from './components/DiscoverItem';
import CommStatusBar from '../../../../components/Layout/CommStatusBar';

const ContainerView = styled(Container)``;

@inject(({ rootStore }) => ({
  discoverStore: rootStore.discoverStore,
}))
@observer
class Discover extends React.Component {
  componentDidMount() {
    this.getData();
  }
  getData = (pageNumber = 1) => {
    this.props.discoverStore.getVideoListReq({ pageNumber });
  };
  render() {
    const {
      props: {
        discoverStore: {
          videoList: {
            refreshing,
            loadingMore,
            list,
          },
        },
        navigation: {
          navigate,
        },
      },
    } = this;
    const discoverItemProps = {
      onPlayItem: (item) => {
        navigate(routers.videoPlay, { video: item });
      },
      onDownloadItem: () => {
        // TODO
      },
    };
    const flatProps = {
      data: list,
      renderItemElem: <DiscoverItem {...discoverItemProps} />,
      onRefresh: this.getData,
      // onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    console.log(toJS(list));
    return (
      <ContainerView>
        <CommStatusBar />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

Discover.navigationOptions = ({ navigation }) => ({
  title: 'discover',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

Discover.defaultProps = {
  discoverStore: {},
};

Discover.propTypes = {
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
  discoverStore: PropTypes.objectOf(PropTypes.any),
};

export default Discover;
