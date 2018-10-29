import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import ViewPager from './ViewPager';
import { startCountdown } from '../../utils/timer';

const styles = StyleSheet.create({
  container: {},
  pager: { flex: 1 },
});

class IndicatorViewPager extends Component {
    static propTypes = {
      ...ViewPager.propTypes,
      indicator: PropTypes.node,
      pagerStyle: ViewPropTypes.style,
      initialPage: PropTypes.number,
      autoPlayEnable: PropTypes.bool,
      autoPlayInterval: PropTypes.number,
      horizontalScroll: PropTypes.bool,
    }

    static defaultProps = {
      indicator: null,
      pagerStyle: {},
      initialPage: 0,
      autoPlayInterval: 3000,
      autoPlayEnable: false,
      horizontalScroll: true,
    }

    constructor(props) {
      super(props);
      this.currentIndex = props.initialPage;
      this.childrenCount = React.Children.count(props.children);
    }

    componentDidMount() {
      const {
        autoPlayEnable,
        stopInterval = null,
        startInterval = null,
      } = this.props;
      if (autoPlayEnable) this.startAutoPlay();
      else this.stopAutoPlay();
      if (stopInterval) stopInterval(this.stopAutoPlay);
      if (startInterval) startInterval(this.startAutoPlay);
    }

    componentWillUpdate(nextProps) {
      this.childrenCount = React.Children.count(nextProps.children);
      if (this.props.autoPlayEnable !== nextProps.autoPlayEnable) {
        if (nextProps.autoPlayEnable) {
          this.startAutoPlay();
        } else {
          this.stopAutoPlay();
        }
      }
    }

    componentWillUnmount() {
      this.stopAutoPlay();
    }

    onPageScroll = (params) => {
      const indicator = this.indicatorRef;
      if (indicator && indicator.onPageScroll) {
        indicator.onPageScroll(params);
      }
      if (this.props.onPageScroll) {
        this.props.onPageScroll(params);
      }
    }

    onPageSelected = (params) => {
      const indicator = this.indicatorRef;
      if (indicator && indicator.onPageSelected) {
        indicator.onPageSelected(params);
      }
      if (this.props.onPageSelected) {
        this.props.onPageSelected(params);
      }
      this.currentIndex = params.position;
    }

    setPage = (selectedPage) => {
      this.viewpagerRef.setPage(selectedPage);
    }

    setPageWithoutAnimation = (selectedPage) => {
      this.viewpagerRef.setPageWithoutAnimation(selectedPage);
    }

    setIndicatorRef = (ref) => { this.indicatorRef = ref; }

    setViewpagerRef = (ref) => { this.viewpagerRef = ref; }

    goToNextPage = () => {
      if (this.childrenCount === 0) return;
      const nextIndex = (this.currentIndex + 1) % this.childrenCount;
      this.setPage(nextIndex);
    }

    startAutoPlay = () => {
      if (this.timer) { return; }
      startCountdown({
        seconds: this.props.autoPlayInterval,
        loopFunc: (timer) => {
          this.timer = timer;
          this.goToNextPage();
        },
      });
    }

    stopAutoPlay = () => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }

    renderIndicator = () => {
      const { indicator, initialPage } = this.props;
      if (!indicator) return null;
      return React.cloneElement(
        indicator,
        {
          ref: this.setIndicatorRef,
          pager: this,
          initialPage,
        },
      );
    }

    render() {
      return (
        <View style={[styles.container, this.props.style]} >
          <ViewPager
            {...this.props}
            horizontalScroll={this.props.horizontalScroll}
            ref={this.setViewpagerRef}
            style={[styles.pager, this.props.pagerStyle]}
            onPageScroll={this.onPageScroll}
            onPageSelected={this.onPageSelected}
          />
          {this.renderIndicator()}
        </View>
      );
    }
}

export default IndicatorViewPager;
