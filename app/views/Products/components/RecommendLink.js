'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Shimmer from 'react-native-shimmer';
import { connect } from 'react-redux';

const RecommendLink = ({
  recommendProduct,
  showText,
  isFetchingRecommend,
}) => {
  let buttonTextStyles = isFetchingRecommend ? [ styles.btnText, { color: '#d4d9da' }] : styles.btnText
  let shareStyles = isFetchingRecommend ? [ styles.share, { tintColor: '#d4d9da' }] : styles.share;

  return (
    <TouchableOpacity
      underlayColor='#fff'
      activeOpacity={ isFetchingRecommend ? 1 : 0.25 }
      onPress={ recommendProduct }
      disabled={ isFetchingRecommend }
    >
      <View style={ styles.shareBtn }>
        <Shimmer
          opacity={ 1 }
          animationgOpacity={ 0.25 }
          animating={ isFetchingRecommend }
          speed={ 115 }
        >
          { showText && <Text style={ buttonTextStyles }>Recommend</Text> }
        </Shimmer>

        <Image source={ require('image!share') } style={ shareStyles } />
      </View>
    </TouchableOpacity>
  );
};

RecommendLink.propTypes = {
  isFetchingRecommend: React.PropTypes.bool.isRequired,
  showText: React.PropTypes.bool.isRequired,
  recommendProduct: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  btnText: {
    color: '#45baef',
    fontSize: 17,
    position: 'relative',
    lineHeight: 26,
  },

  share: {
    width: 20,
    height: 20,
    marginLeft: 7.5,
    marginTop: 5,
  },

  shareBtn: {
    flex: 1,
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => ({
  isFetchingRecommend: state.user.isFetchingRecommend,
});

export default connect(mapStateToProps)(RecommendLink);
