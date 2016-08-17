'use strict'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

const ParallaxContent = ({ logout }) => (
  <View style={ styles.container }>
    <Image
      style={ styles.profileImage }
      source={{ uri: 'https://pbs.twimg.com/profile_images/2863061875/0e3b0a3a183cdbec6fb70948f4e53d2a.jpeg' }}
    />

    <TouchableHighlight onPress={ logout } underlayColor='transparent'>
      <Text style={ styles.text }>Captain Ahab</Text>
    </TouchableHighlight>

    <View style={ styles.iconsContainer }>
      <View style={ styles.iconGroup }>
        <Image source={ require('image!earnings') } style={ styles.icon } />
        <Text style={ styles.amount }>$0</Text>
        <Text style={ styles.label }>Total Earned</Text>
      </View>

      <View style={ styles.iconGroup }>
        <Image source={ require('image!pending') } style={ styles.icon } />
        <Text style={ styles.amount }>$0</Text>
        <Text style={ styles.label }>Pending</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  profileImage: {
    height: 76,
    width: 76,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 38,
    marginBottom: 8,
  },

  text: {
    backgroundColor: 'transparent',
    color: '#18739d',
    fontSize: 18,
    marginBottom: 30,
  },

  iconsContainer: {
    flexDirection: 'row',
    width: deviceWidth,
    justifyContent: 'center',
  },

  iconGroup: {
    flex: 1,
    alignItems: 'center',
  },

  icon: {
    height: 32,
    width: 32,
    marginBottom: 8,
  },

  amount: {
    backgroundColor: 'transparent',
    fontSize: 24,
    color: '#fff'
  },

  label: {
    backgroundColor: 'transparent',
    fontSize: 12,
    color: '#fff',
    opacity: 0.8
  },
});

export default ParallaxContent;
