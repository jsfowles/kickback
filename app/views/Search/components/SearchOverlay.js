'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  ListView,
  StyleSheet,
  Dimensions,
  Animated,
  DeviceEventEmitter,
  Image,
  TouchableHighlight,
} from 'react-native'

import { requestProducts } from '../../../actions'

const {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get('window')

class Search extends React.Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 !== r2
    })

    this.state = {
      fadeAnim: new Animated.Value(0),
      ds: ds.cloneWithRows(props.categories),
      keyboardHeight: 0,
    }

    this.renderRow = this.renderRow.bind(this)
  }

  componentWillMount() {
    this.keyboardWillShow = DeviceEventEmitter.addListener('keyboardWillShow', e => {
      this.setState({ keyboardHeight: e.endCoordinates.height })
    })

    this.keyboardWillHide = DeviceEventEmitter.addListener('keyboardWillHide', e => {
      this.setState({ keyboardHeight: 0 })
    })
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1, duration: 200 }
    ).start()
  }

  componentWillUnmount() {
    this.keyboardWillShow.remove()
    this.keyboardWillHide.remove()
  }

  renderRow = (data) => (
    <TouchableHighlight
      underlayColor='#f7f8f9'
      style={{ paddingLeft: 16 }}
      onPress={ () => { this.props.requestProducts(data.title) }}
    >
      <View style={ styles.categoryContainer }>
        <Text style={ styles.categoryText }>{ data.title }</Text>
        <Image source={ require('image!forward') } style={{ marginTop: 2.5 }} />
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
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
})

const mapStateToProps = (state) => ({
  categories: state.productFeed.featuredCategories
})

const mapActionsToProps = (dispatch) => ({
  requestProducts: (s) => dispatch(requestProducts(s)),
})

export default connect(mapStateToProps, mapActionsToProps)(Search)
