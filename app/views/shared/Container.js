'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ParallaxBackground from './ParallaxBackground';

class Container extends React.Component {
  static propTypes = {
    headerHeight: React.PropTypes.number,
    style: React.PropTypes.number,
    children: React.PropTypes.node,
  };

  static defaultProps = {
    headerHeight: 0,
  };

  renderContent() {
    const { children } = this.props;
    return React.Children.map(children, (child, _) => {
      if (child === null) { return null; }

      return React.cloneElement(child, {});
    });
  }

  render() {
    const { style, headerHeight } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <View style={ styles.headerWrapper }>
          <ParallaxBackground
            height={ headerHeight }
          />
        </View>

        { this.renderContent() }
      </View>
    );
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
