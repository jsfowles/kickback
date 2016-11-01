import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
} from 'react-native';

import { validatePassword } from '../../../utils/validations';

import Container from '../../shared/Container';
import Input from '../../shared/Input';

import {
  changePassword,
  updatePassword,
} from '../../../actions';

class ChangePassword extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    changePassword: React.PropTypes.func,
    updatePassword: React.PropTypes.func,
    currentPassword: React.PropTypes.string.isRequired,
    newPassword: React.PropTypes.string.isRequired,
    passwordConfirmation: React.PropTypes.string.isRequired,
  };

  render() {
    let {
      handleNavigate,
      changePassword,
      currentPassword,
      newPassword,
      passwordConfirmation,
     } = this.props;

    return (
      <Container
        style={{ flex: 1, paddingBottom: 50 }}
        title='Change Password'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('image!back'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
        rightItem={{
          title: 'SAVE',
          onPress: changePassword,
          disabled: !validatePassword(passwordConfirmation) || !validatePassword(currentPassword) || newPassword !== passwordConfirmation,
        }}
      >
        <View style={ styles.currentPassword }>
          <Input
            icon={ require('image!lock') }
            placeholder='Current Password'
            secureTextEntry={ true }
            value={ currentPassword }
            onChangeText={ v => this.props.updatePassword(v, 'CURRENT_PASSWORD') }
          />
        </View>
        <View style={ styles.newPassword }>
          <Input
            icon={ require('image!lock') }
            placeholder='New Password'
            secureTextEntry={ true }
            value={ newPassword }
            onChangeText={ e => this.props.updatePassword(e, 'NEW_PASSWORD') }
          />
          <View style={ styles.seperator } />
          <Input
            icon={ require('image!lock') }
            placeholder='Confirm New Password'
            secureTextEntry={ true }
            value={ passwordConfirmation }
            onChangeText={ e => this.props.updatePassword(e, 'PASSWORD_CONFIRMATION') }
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  currentPassword: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8edef',
    borderBottomWidth: 1,
    borderBottomColor: '#e8edef',
  },

  newPassword: {
    marginTop:29,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8edef',
    borderBottomWidth: 1,
    borderBottomColor: '#e8edef',
  },

  seperator: {
    marginLeft: 50,
    backgroundColor: '#e8edef',
    height: 1,
  },
});

const mapStateToProps = state => ({
  currentPassword: state.changePassword.currentPassword,
  newPassword: state.changePassword.newPassword,
  passwordConfirmation: state.changePassword.passwordConfirmation,
});

const mapActionsToProps = dispatch => ({
  changePassword: _ => dispatch(changePassword()),
  updatePassword: (v, type) => dispatch(updatePassword(v, type)),
});

export default connect(mapStateToProps, mapActionsToProps)(ChangePassword);
