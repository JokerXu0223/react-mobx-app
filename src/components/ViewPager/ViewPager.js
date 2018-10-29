import React, { Component } from 'react';
import {
  PanResponder,
  Platform,
  ScrollView,
  View,
  ViewPagerAndroid,
} from 'react-native';
import PropType from 'prop-types';

const SCROLL_STATE = {
  idle: 'idle',
  settling: 'settling',
  dragging: 'dragging',
};

class ViewPager extends Component {
    static propTypes = {
      ...ViewPagerAndroid.propTypes,
      initialPage: PropType.number,
      keyboardDismissMode: PropType.string,
      onPageScroll: PropType.func,
      onPageSelected: PropType.func,
      onPageScrollStateChanged: PropType.func,
      pageMargin: PropType.number,
      horizontalScroll: PropType.bool,
    }

    static defaultProps = {
      initialPage: 0,
      keyboardDismissMode: 'on-drag',
      onPageScroll: null,
      onPageSelected: null,
      onPageScrollStateChanged: null,
      pageMargin: 0,
      horizontalScroll: true,
    }

    constructor(props) {
      super(props);

      this.state = {
        width: 0,
        height: 0,
        page: props.initialPage,
      };
    }

    onScrollViewLayout = (event) => {
      const { width, height } = event.nativeEvent.layout;
      this.setState({ width, height }, () => Platform.OS === 'ios' && this.setPageWithoutAnimation(this.state.page));
    }

    onScrollOnIOS = (e) => {
      const { x } = e.nativeEvent.contentOffset;
      const position = Math.floor(x / this.state.width);
      if (x === this.preScrollX) return;
      this.preScrollX = x;
      const offset = (x / this.state.width) - position;

      if (this.props.onPageScroll) this.props.onPageScroll({ offset, position });

      if (this.props.onPageSelected && offset === 0) {
        this.props.onPageSelected({ position });
        if (this.props.onPageScrollStateChanged) {
          this.setScrollState(SCROLL_STATE.idle);
        }
        this.setState({ page: position });
      }
    }

    onPageScrollOnAndroid = (e) => {
      if (this.props.onPageScroll) this.props.onPageScroll(e.nativeEvent);
    }

    onPageSelectedOnAndroid = (e) => {
      if (this.props.onPageSelected) this.props.onPageSelected(e.nativeEvent);
    }

    setPageWithoutAnimation = (selectedPage) => {
      this.setState({ page: selectedPage });
      if (this.props.forceScrollView || Platform.OS === 'ios') {
        this.viewPagerIOS.scrollTo({ x: this.state.width * selectedPage, animated: false });
      } else {
        this.viewPagerAndroid.setPageWithoutAnimation(selectedPage);
        if (this.props.onPageSelected) this.props.onPageSelected({ position: selectedPage });
      }
    }

    setScrollState = (scrollState) => {
      if (scrollState === this.scrollState) return;
      if (this.props.onPageScrollStateChanged) {
        this.props.onPageScrollStateChanged(scrollState);
      }
      this.scrollState = scrollState;
    }

    setPage = (selectedPage) => {
      this.setState({ page: selectedPage });
      if (this.props.forceScrollView || Platform.OS === 'ios') this.viewPagerIOS.scrollTo({ x: this.state.width * selectedPage });
      else {
        this.viewPagerAndroid.setPage(selectedPage);
        if (this.props.onPageSelected) this.props.onPageSelected({ position: selectedPage });
      }
    }

    getScrollEventThrottle = (needMonitorScroll) => {
      if (needMonitorScroll) {
        return this.props.onPageScroll ? 8 : 1;
      }
      return 0;
    }

    childrenWithOverridenStyle = () => {
      if (this.state.width === 0 || this.state.height === 0) return null;
      return React.Children.map(this.props.children, (child) => {
        if (!child) return null;
        const newProps = {
          ...child.props,
          style: [child.props.style, {
            width: this.state.width,
            height: this.state.height,
            position: null,
          }],
          collapsable: false,
        };
        if (child.type &&
                child.type.displayName &&
                (child.type.displayName !== 'RCTView') &&
                (!['View', 'TouchableOpacity'].includes(child.type.displayName))) {
          // console.warn(`Each ViewPager child must be a <View> or <TouchableOpacity>. Was ${child.type.displayName}`);
        }
        return React.createElement(child.type, newProps);
      });
    }

    iosRef = (ref) => { this.viewPagerIOS = ref; }

    androidRef = (ref) => { this.viewPagerAndroid = ref; }

    scrollState = SCROLL_STATE.idle

    preScrollX = null

    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => this.setScrollState(SCROLL_STATE.dragging),
      onPanResponderMove: () => null,
      onPanResponderRelease: () => this.setScrollState(SCROLL_STATE.settling),
      onPanResponderTerminate: () => null,
      onPanResponderTerminationRequest: () => true,
    })

    renderOnIOS = () => {
      const childrenCount = this.props.children ? this.props.children.length : 0;
      const initialPage = Math.min(Math.max(0, this.props.initialPage), childrenCount - 1);
      const needMonitorScroll = !!this.props.onPageScroll || !!this.props.onPageSelected || !!this.props.onPageScrollStateChanged;
      const needMonitorTouch = !!this.props.onPageScrollStateChanged;
      const scrollEventThrottle = this.getScrollEventThrottle(needMonitorScroll);
      let props = {
        ...this.props,
        ref: this.iosRef,
        onLayout: this.onScrollViewLayout,
        horizontal: true,
        pagingEnabled: !!this.props.horizontalScroll,
        scrollEnabled: !!this.props.horizontalScroll,
        scrollsToTop: false,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        children: this.childrenWithOverridenStyle(),
        contentOffset: { x: this.state.width * initialPage, y: 0 },
        decelerationRate: 0.9,
        onScroll: needMonitorScroll ? this.onScrollOnIOS : null,
        scrollEventThrottle,
      };
      if (needMonitorTouch) props = Object.assign(props, this.panResponder.panHandlers);
      const scrollViewStyle = {
        overflow: 'visible',
        marginHorizontal: -this.props.pageMargin / 2,
      };
      if (this.props.style && !this.props.style.height) { return <ScrollView {...props} style={[scrollViewStyle, this.props.style]} />; }
      return (
        <View style={this.props.style} >
          <ScrollView {...props} style={scrollViewStyle} />
        </View>
      );
    }

    render() {
      return (this.props.forceScrollView || Platform.OS === 'ios') ? this.renderOnIOS() : (
        <ViewPagerAndroid
          {...this.props}
          scrollEnabled={!!this.props.horizontalScroll}
          ref={this.androidRef}
          key={this.props.children ? this.props.children.length : 0}
          onPageScroll={this.onPageScrollOnAndroid}
          onPageSelected={this.onPageSelectedOnAndroid}
        />
      );
    }
}

export default ViewPager;
