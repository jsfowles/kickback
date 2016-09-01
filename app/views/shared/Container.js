'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';

import ParallaxBackground from './ParallaxBackground';
import Header from './Header';

class Container extends React.Component {
  static defaultProps = {
    customHeader: false,
  };

  constructor() {
    super(...arguments);
    this.state = ({
      anim: new Animated.Value(0),
    });
  }

  handleScroll = (e) => {
    if (!this.props.hasScrolled) { this.props.setHasScrolled(); }
    this.state.anim.setValue(e.nativeEvent.contentOffset.y);
  }

  render() {
    const {
      children,
      parallaxContent,
      style,
      headerHeight,
      leftItem,
      rightItem,
      headerColors,
      customHeader,
      title,
    } = this.props;

    const content = React.cloneElement(children, {
      onScroll: (e) => this.handleScroll(e),
      scrollEventThrottle: 16,
      offset: this.state.anim,
    });

    return (
      <View style={[ styles.container, style ]}>
        <View style={ styles.header }>
          { parallaxContent && <ParallaxBackground
            parallaxContent={ parallaxContent }
            offset={ this.state.anim }
            minHeight={ 14 }
            maxHeight={ 14 + headerHeight }
          /> }
        </View>

        { !customHeader && <Header
          rightItem={ rightItem }
          leftItem={ leftItem }
          headerColors={ headerColors }
          title={ title }
        /> }

        { content }
      </View>
    );
  }
}

Container.propTypes = {
  hasScrolled: React.PropTypes.bool,
  setHasScrolled: React.PropTypes.func,
  header: React.PropTypes.object,
  children: React.PropTypes.object,
  rightItem: React.PropTypes.object,
  leftItem: React.PropTypes.object,
  parallaxContent: React.PropTypes.bool,
  style: React.PropTypes.object,
  headerHeight: React.PropTypes.number,
  headerColors: React.PropTypes.array,
  customHeader: React.PropTypes.bool,
  title: React.PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f7f8f9',
  },
});

export default Container;
