'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

class Container extends React.Component {
  renderContent() {
    const { children } = this.props;
    return React.Children.map(children, (child, _) => {
      if (child === null) { return null; }

      return React.cloneElement(child, {});
    });
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        { this.renderContent() }
      </View>
    );
  }
}

Container.propTypes = {
  style: React.PropTypes.number,
  children: React.PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f7f8f9',
  },
});

export default Container;
