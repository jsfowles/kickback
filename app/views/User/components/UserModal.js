import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import CloseBtn from '../../shared/CloseBtn';
import { closeModal } from '../../../actions';

const UserModal = ({
  children,
  icon,
  description,
  linkText,
  linkAction,
  closeModal,
}) => (
  <View style={ styles.container }>
    <StatusBar hidden={ true } />

    <View style={ styles.contentWrapper }>
      <Image source={ icon } style={ styles.icon } />
      <Text style={ styles.descriptionText }>{ description }</Text>
      <View style={ styles.childWrapper }>
        { children }
      </View>
    </View>

    <TouchableOpacity
      style={ styles.btn }
      onPress={ linkAction }
    >
      <Text style={ styles.link }>{ linkText }</Text>
    </TouchableOpacity>

    <CloseBtn color='#6d7577' onPress={ closeModal } />
  </View>
);

UserModal.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  icon: React.PropTypes.object.isRequired,
  description: React.PropTypes.string.isRequired,
  linkText: React.PropTypes.string.isRequired,
  linkAction: React.PropTypes.func.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: -69,
  },

  childWrapper: {
    flexDirection: 'row',
  },

  descriptionText: {
    textAlign: 'center',
    color: '#6d7577',
    fontSize: 17,
    marginBottom: 25,
  },

  icon: {
    tintColor: '#afb9bc',
    width: 120,
    height: 120,
    marginBottom: 30,
  },

  link: {
    color: '#45baef',
    fontSize: 22,
  },

  btn: {
    height: 138,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = _ => ({});
const mapActionsToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapActionsToProps)(UserModal);
