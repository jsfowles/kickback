'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ParallaxBackground from './ParallaxBackground';
import Header from './Header';

class Container extends React.Component {
  static propTypes = {
    headerHeight: React.PropTypes.number,
    style: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.number,
    ]),
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    parallaxContent: React.PropTypes.func,
  };

  static defaultProps = {
    headerHeight: 0,
  };

  renderContent() {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      if (child === null) { return null; }

      return React.cloneElement(child, {});
    });
  }

  render() {
    const { style, headerHeight } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        { (this.props.rightItem || this.props.leftItem) && <Header { ...this.props } /> }

        <ParallaxBackground height={ headerHeight }>
          { this.renderParallaxContent() }
        </ParallaxBackground>

        { this.renderContent() }
      </View>
    );
  }

  renderParallaxContent() {
    let { parallaxContent } = this.props;

    if (!parallaxContent) { return null; }
    return parallaxContent();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f7f8f9',
  },
});

export default Container;
