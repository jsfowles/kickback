'use strict';

import React from 'react';
import {
  ScrollView,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { connect } from 'react-redux';

import Card from './FeaturedSearchCard';
import {
  changeCarouselPosition,
  fetchSearch,
} from '../../../actions';

const {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get('window');

/**
 * @component: FeaturedSearchesCarosel
 * @description: This component is on the initail searches page to give an idea of brands you can search for.
 *               Data comes from the FeaturedProducts reducer. It is an array of image urls and search terms.
 *               Updates on app active state change.
 * @props: featuredSearches - Array of Objects
 * @props: changeCarouselPosition - function - sends the new carousel position to the reducer
 * @props: selectedIndex - tells the component what slide the carousel is on
 *
 * @TODO: Figure out if the bg we have is what we want to do. We might want to content offset top to show a different color if scolled up.
 */
class FeaturedSearchesCarousel extends React.Component {
  static propTypes = {
    featuredSearches: React.PropTypes.array.isRequired,
    changeCarouselPosition: React.PropTypes.func.isRequired,
    selectedIndex: React.PropTypes.number.isRequired,
    searching: React.PropTypes.string,
    fetchSearch: React.PropTypes.func.isRequired,
  };

  /**
   * @description: Gets the width and height for the slide, 0.55 is the ratio of width to height that we want
   */
  static slide = {
    height: deviceWidth * 0.55,
    width: deviceWidth,
  }

  /**
   * When component mounts start the carousel
   */
  componentDidMount() {
    if (!this.props.searching) {
      this.setupTimer();
    }
  }

  /**
   * Pausl carousel when search is up
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searching !== this.props.searching && nextProps.searching) {
      clearTimeout(this.timer);
    } else if (nextProps.searching !== this.props.searching && !nextProps.searching) {
      this.setupTimer();
    }
  }

  /**
   * Make sure we clear the carousel when leaving the component
   */
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * Timer function, we clear it at first to make sure there are no other instances, then we animateToNext after 5s
   */
  setupTimer = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.animateToNext, 5000);
  }

  /**
   * Animate to next figures out what the new pos is from the old postion, scrolls to it and restarts the timer.
   */
  animateToNext = () => {
    let { featuredSearches, selectedIndex } = this.props;
    let newPosition = (featuredSearches.length === selectedIndex + 1) ? 0 : selectedIndex + 1;
    this.refs.scrollView.scrollTo({ x: newPosition * deviceWidth });
    this.setupTimer();
  }

  /**
   * After scrolling we need to change the position in the store
   */
  handleMomentumScroll = (e) => {
    let { carouselPaused, changeCarouselPosition } = this.props;

    if (!carouselPaused) {
      changeCarouselPosition(e.nativeEvent.contentOffset.x / deviceWidth);
    }
  }

  /**
   * When we begin to drag with our finger clear the timer.
   */
  beginDrag = () => clearTimeout(this.timer)

  render() {
    return (
      <ScrollView
        ref='scrollView'
        contentOffset={{ x: deviceWidth * this.props.selectedIndex, y: 0 }}
        horizontal={ true }
        style={{ backgroundColor: '#f7f8f9' }}
        automaticallyAdjustContentInsets={ false }
        showsHorizontalScrollIndicator={ false }
        showsVerticalScrollIndicator={ false }
        onScrollBeginDrag={ this.beginDrag }
        onScrollEndDrag={ this.setupTimer }
        onMomentumScrollEnd={ this.handleMomentumScroll }
        onScroll={ this.handleScroll }
        scrollEventThrottle={ 16 }
        directionalLockEnabled={ true }
        removeClippedSubviews={ true }
        scrollsToTop={ false }
        bounces={ true }
        pagingEnabled={ true }
      >
        { this.props.featuredSearches.map((search, i) => (
          <Card
            key={ i }
            dimensions={ FeaturedSearchesCarousel.slide }
            onPress={ this.props.fetchSearch }
            imageUrl={ `${search.imageUrl}%40${PixelRatio.get()}x.jpg` }
            searchTerm={ search.searchTerm }
          />
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  featuredSearches: state.feed.featuredSearches,
  selectedIndex: state.feed.productFeed.selectedIndex,
  searching: state.search.searching,
  carouselPaused: state.search.carouselPaused,
});

const mapActionsToProps = (dispatch) => ({
  changeCarouselPosition: (i) => dispatch(changeCarouselPosition(i)),
  fetchSearch: (s) => dispatch(fetchSearch(s)),
});

export default connect(mapStateToProps, mapActionsToProps)(FeaturedSearchesCarousel);
