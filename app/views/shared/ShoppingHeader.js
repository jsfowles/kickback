'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'

import { navigateSearch } from '../../actions/navigation'

class FeaturedProductsHeader extends React.Component {
  static propTypes = {
    navigateSearch: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <TouchableOpacity
        style={ styles.button }
        activeOpacity={ 1 }
        onPress={ () => this.props.navigateSearch() }
      >
        <View style={ styles.buttonContainer }>
          <Image source={ require('image!search') } />
          <Text style={ styles.buttonText }>Search</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'rgba(11, 87, 119, 0.15)',
    height: 30,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#2dadcd',
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
})

const mapStateToProps = (state) => ({})
const mapActionsToProps = (dispatch) => ({
  navigateSearch: () => dispatch(navigateSearch()),
})

export default connect(mapStateToProps, mapActionsToProps)(FeaturedProductsHeader)
