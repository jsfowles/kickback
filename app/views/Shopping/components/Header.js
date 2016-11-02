'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Animated,
} from 'react-native';

import {
  toggleSearchOverlay,
  fetchSearch,
  cancelSearch,
  pop,
} from '../../../actions';

import SearchInput from './SearchInput';
import SearchBtn from './SearchBtn';
import CancelBtn from './CancelBtn';
import BackBtn from './BackBtn';

class Header extends React.Component {
  static propTypes = {
    toggleSearchOverlay: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { showForm: this.props.searchOverlay };
  }

  componentWillMount() {
    if (this.props.searchOverlay) {
      this.setState({ animCancel: new Animated.Value(1) });
    } else {
      this.setState({ animCancel: new Animated.Value(0) });
    }

    if (this.props.route.index) {
      this.setState({ animBackButton: new Animated.Value(1) });
    } else {
      this.setState({ animBackButton: new Animated.Value(0) });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchOverlay !== this.props.searchOverlay) {
      this.animateSearching(nextProps.searchOverlay);
    }

    if (nextProps.route !== 0) {
      this.animateBack(nextProps.route);
    }
  }

  animateSearching = (searchOverlay) => {
    let toValue = searchOverlay ? 1 : 0;
    let animationConfig = { duration: 250 };

    Animated.timing(this.state.animCancel, {
      toValue: toValue,
      ...animationConfig,
    })
    .start(() => {
      this.setState({ showForm: this.props.searchOverlay });
    });
  }

  animateBack = (route) => {
    let toValue = route.index ? 1 : 0;
    let animationConfig = { duration: 250 };

    Animated.timing(this.state.animBackButton, {
      toValue: toValue,
      ...animationConfig,
    }).start();
  }

  render() {
    let { navigator, toggleSearchOverlay, searchText, searchOverlay, fetchSearch } = this.props;
    let placeholder = searchText ? searchText : 'Search';

    return (
      <Animated.View style={ styles.headerContainer } >
        <BackBtn
          cancelSearch={ this.props.cancelSearch }
          width={ this.state.animBackButton.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ 0, 21 ],
          })}
        />

        { this.state.showForm ? (
          <SearchInput
            requestProducts={ fetchSearch }
            style={ styles.button }
            navigator={ navigator }
            toggleSearchOverlay={ toggleSearchOverlay }
            placeholder={ placeholder }
          />
        ) : (
          <SearchBtn
            toggleSearchOverlay={ toggleSearchOverlay }
            style={ styles.button }
            placeholder={ placeholder }
            route={ this.props.route }
            searchOverlay={ searchOverlay }
            anim={ this.state.animCancel }
          />
        )}

        <CancelBtn
          width={ this.state.animCancel.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ 0, 54.5 ],
          })}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'rgba(11, 87, 119, 0.15)',
    height: 30,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#2dadcd',
    overflow: 'hidden',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  searchOverlay: state.search.searchOverlay,
  searchText: state.search.searchText,
  route: state.navigation.shopping,
});

const mapActionsToProps = (dispatch) => ({
  toggleSearchOverlay: () => dispatch(toggleSearchOverlay()),
  fetchSearch: (e) => dispatch(fetchSearch(e.nativeEvent.text)),
  cancelSearch: () => dispatch(pop('shopping')),
});

export default connect(mapStateToProps, mapActionsToProps)(Header);
