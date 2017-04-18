'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  Dimensions,
  Animated,
  Keyboard,
  Image,
  TouchableHighlight,
} from 'react-native';

import { fetchSearch } from '../../../actions';

const {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get('window');

class Search extends React.Component {
  static propTypes = {
    fetchSearch: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      fadeAnim: new Animated.Value(0),
      ds: ds.cloneWithRows(props.categories),
      keyboardHeight: 0,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
      this.setState({ keyboardHeight: e.endCoordinates.height + 64 });
    });

    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', e => {
      this.setState({ keyboardHeight: 0 });
    });
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1, duration: 200 }
    ).start();
  }

  componentWillUnmount() {
    this.keyboardWillShow.remove();
    this.keyboardWillHide.remove();
  }

  renderRow = (data) => (
    <TouchableHighlight
      underlayColor='#f7f8f9'
      style={{ paddingLeft: 16 }}
      onPress={ () => this.props.fetchSearch(data.searchTerm) }
    >
      <View style={ styles.categoryContainer }>
        <Text style={ styles.categoryText }>{ data.title }</Text>
        <Image source={ require('./assets/images/forward.png') } style={{ marginTop: 2.5 }} />
      </View>
    </TouchableHighlight>
  )

  render() {
    return (
      <Animated.View style={[ styles.container, { opacity: this.state.fadeAnim }]}>
        <ListView
          contentInset={{ top: 0, bottom: this.state.keyboardHeight }}
          dataSource={ this.state.ds }
          automaticallyAdjustContentInsets={ false }
          showsVerticalScrollIndicator={ false }
          renderRow={ this.renderRow }
          renderSeparator={ this.renderSeparator }
          keyboardShouldPersistTaps={ true }
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 16,
    borderBottomColor: '#e8edef',
    borderBottomWidth: 1,
  },

  categoryText: {
    fontSize:  16,
    color: '#6d7577',
  },
});

const mapStateToProps = state => ({
  categories: state.feed.featuredCategories,
});

const mapActionsToProps = dispatch => ({
  fetchSearch: (searchTerm) => dispatch(fetchSearch(searchTerm)),
});

export default connect(mapStateToProps, mapActionsToProps)(Search);
