'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  NativeModules,
} from 'react-native';

import {
  toggleSearchOverlay,
  fetchSearch,
  pop,
} from '../../../actions';

import SearchInput from './SearchInput';
import SearchBtn from './SearchBtn';
import CancelBtn from './CancelBtn';
import BackBtn from './BackBtn';

const BACK_BUTTON_SIZE = 22;

class Header extends React.Component {
  static propTypes = {
    route: React.PropTypes.shape({
      index: React.PropTypes.number.isRequired,
    }).isRequired,
    backBtn: React.PropTypes.func.isRequired,
    fetchSearch: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.buttonWidth = new Animated.Value(0);
    this.buttonPosX = new Animated.Value(0);
    this.backButtonPosX = new Animated.Value(-BACK_BUTTON_SIZE);
    this.textPosX = new Animated.Value(0);
    this.searchTextWidth = 0;

    this.state = {
      showInput: false,
      searchTerm: null,
    };
  }

  onLayout = (e, type) => {
    if (!this.state[type]) {
      return this.setState({ [type]: e.nativeEvent.layout }, _ => {
        /*
         * When we initially mount the component get the width of the container
         */
        if (type === 'layout') {
          this.buttonWidth.setValue(this.state.layout.width);
        }

        /*
         * After we get the width of the container lets set the width of the searchText and
         * position it where it is supposed to be (centered)
         */
        if (
          this.state.searchTextLayout &&
          this.state.searchIconLayout &&
          this.state.layout
        ) {
          this.searchTextWidth = this.state.searchTextLayout.width + this.state.searchIconLayout.width;
          this.textPosX.setValue((this.state.layout.width / 2) - (this.searchTextWidth / 2));
        }

        /*
         * If we have reset the searchTextWidth by typing in new text and we are on the search
         * route lets recenter the textin the button
         */
        if (
          this.state.searchTextLayout &&
          this.state.searchIconLayout &&
          this.state.layout &&
          this.searchTextWidth &&
          this.props.route.index
        ) {
          this.buttonWidth.setValue(this.state.layout.width - BACK_BUTTON_SIZE);
          this.buttonPosX.setValue(BACK_BUTTON_SIZE);
          this.backButtonPosX.setValue(0);
          this.textPosX.setValue((this.state.layout.width / 2) - (this.searchTextWidth / 2) - BACK_BUTTON_SIZE);
        }

        /*
         * If we are on the feed route and we have reset the text to "Search" lets make sure
         * everything is recentered and resized appropriately.
         */
        if (
          this.state.searchTextLayout &&
          this.state.searchIconLayout &&
          this.state.layout &&
          this.searchTextWidth &&
          !this.props.route.index
        ) {
          this.buttonWidth.setValue(this.state.layout.width);
          this.buttonPosX.setValue(0);
          this.backButtonPosX.setValue(-BACK_BUTTON_SIZE);
          this.textPosX.setValue((this.state.layout.width / 2) - (this.searchTextWidth / 2));
        }
      });
    }
  }

  onPress = _ => {
    const {
      showForm,
      layout,
      cancelLayout,
    } = this.state;

    /**
     * If we are currently showing the form and we are on the feed route
     */
    if (showForm && !this.props.route.index) {
      return this.setState({ showForm: false, searchTerm: null, searchTextLayout: null }, () => {
        Animated.parallel([
          this.createAnimation(this.buttonWidth, layout.width),
          this.createAnimation(this.buttonPosX, 0),
          this.createAnimation(this.textPosX, (layout.width / 2) - (this.searchTextWidth / 2)),
          this.createAnimation(this.backButtonPosX, -BACK_BUTTON_SIZE),
        ]).start();
      });
    }

    /**
     * If we are currently showing the form and we are on the search route
     * - Don't reset the searchTerm and searchTextWidth because it should still be the same as what you started with.
     */
    if (showForm && this.props.route.index) {
      return this.setState({ showForm: false }, () => {
        Animated.parallel([
          this.createAnimation(this.buttonWidth, layout.width - BACK_BUTTON_SIZE),
          this.createAnimation(this.buttonPosX, BACK_BUTTON_SIZE),
          this.createAnimation(this.textPosX, ((layout.width) / 2) - (this.searchTextWidth / 2) - BACK_BUTTON_SIZE),
          this.createAnimation(this.backButtonPosX, 0),
        ]).start();
      });
    }

    /**
     * If we are currently not showing the form and we are on search
     */
    if (!showForm && this.props.route.index) {
      NativeModules.RNAmplitude.logEvent('Search Tap', { route: 'Featured Products Feed' });
      return Animated.parallel([
        this.createAnimation(this.buttonWidth, layout.width - cancelLayout.width - BACK_BUTTON_SIZE),
        this.createAnimation(this.buttonPosX, BACK_BUTTON_SIZE),
        this.createAnimation(this.textPosX, BACK_BUTTON_SIZE * 2),
        this.createAnimation(this.backButtonPosX, 0),
      ]).start(() => this.setState({ showForm: true }));
    }

    /**
     * If we are currently not showing the form and are on the feed route
     */
    NativeModules.RNAmplitude.logEvent('Search Tap', { route: 'Searching Feed' });
    return Animated.parallel([
      this.createAnimation(this.buttonWidth, layout.width - cancelLayout.width),
      this.createAnimation(this.buttonPosX, 0),
      this.createAnimation(this.textPosX, 20),
    ]).start(() => this.setState({ showForm: true }));
  }

  createAnimation = (value, toValue, duration = 125, easing = Easing.Linear, delay = 0) => {
    return Animated.timing(value, { toValue, duration, easing, delay });
  }

  updateSearchTerm = searchTerm => {
    this.setState({ searchTerm, searchTextLayout: null });
  }

  onBackPress = () => {
    const { layout } = this.state;
    this.props.backBtn();

    return this.setState({ showForm: false, searchTerm: null, searchTextLayout: null }, () => {
      Animated.parallel([
        this.createAnimation(this.buttonWidth, layout.width),
        this.createAnimation(this.buttonPosX, 0),
        this.createAnimation(this.textPosX, (layout.width / 2) - (this.searchTextWidth / 2)),
        this.createAnimation(this.backButtonPosX, -BACK_BUTTON_SIZE),
      ]).start();
    });
  }

  search = () => {
    const { layout } = this.state;
    this.props.fetchSearch(this.state.searchTerm);

    return this.setState({ showForm: false }, () => {
      Animated.parallel([
        this.createAnimation(this.buttonWidth, layout.width - BACK_BUTTON_SIZE),
        this.createAnimation(this.buttonPosX, BACK_BUTTON_SIZE),
        this.createAnimation(this.textPosX, (layout.width / 2) - (this.searchTextWidth / 2) - (BACK_BUTTON_SIZE / 2)),
        this.createAnimation(this.backButtonPosX, 0),
      ]).start();
    });
  }

  render() {
    let { searchTerm, layout } = this.state;

    return (
      <View
        style={[ styles.headerContainer, { opacity: layout ? 1 : 0 }]}
        onLayout={ (e) => this.onLayout(e, 'layout') }
      >
        <BackBtn
          btnSize={ BACK_BUTTON_SIZE }
          onBackPress={ this.onBackPress }
          backButtonPosX={ this.backButtonPosX }
        />

        { this.state.showForm ? (
          <SearchInput
            value={ searchTerm }
            buttonPosX={ this.buttonPosX }
            inputStyles={ styles.button }
            buttonWidth={ this.buttonWidth }
            updateSearchTerm={ this.updateSearchTerm }
            search={ this.search }
          />
        ) : (
          <SearchBtn
            buttonWidth={ this.buttonWidth }
            buttonPosX={ this.buttonPosX }
            buttonStyles={ styles.button }
            textPosX={ this.textPosX }
            placeholder={ searchTerm || 'Search' }
            onPress={ this.onPress }
            onLayout={ this.onLayout }
          />
        )}

        <CancelBtn
          onPress={ this.onPress }
          onLayout={ this.onLayout }
          posX={ this.props.route.index ? 20 : 0 }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },

  button: {
    backgroundColor: 'rgba(11, 87, 119, 0.15)',
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#2dadcd',
    height: 30,
  },
});

const mapStateToProps = state => ({
  searchText: state.search.searchText,
  route: state.navigation.shopping,
});

const mapActionsToProps = dispatch => ({
  toggleSearchOverlay: _ => dispatch(toggleSearchOverlay()),
  fetchSearch: v => dispatch(fetchSearch(v)),
  backBtn: _ => dispatch(pop('shopping')),
});

export default connect(mapStateToProps, mapActionsToProps)(Header);
