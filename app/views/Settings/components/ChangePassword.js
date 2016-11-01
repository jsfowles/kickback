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
  clearChangePassword,
} from '../../../actions';

class ChangePassword extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    changePassword: React.PropTypes.func,
    updatePassword: React.PropTypes.func,
    currentPassword: React.PropTypes.string,
    newPassword: React.PropTypes.string,
    passwordConfirmation: React.PropTypes.string,
  };

  isDisabled = () => {
    let {
      currentPassword,
      newPassword,
      passwordConfirmation,
     } = this.props;

    return !validatePassword(passwordConfirmation) || !validatePassword(currentPassword) || newPassword !== passwordConfirmation;
  }

  backButton = () => {
    this.props.clearChangePassword();
    return this.props.handleNavigate({ type: 'pop' });
  }

  render() {
    let { changePassword } = this.props;

    return (
      <Container
        style={{ flex: 1, paddingBottom: 50 }}
        title='Change Password'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('image!back'),
          onPress: this.backButton,
        }}
        rightItem={{
          title: 'SAVE',
          onPress: changePassword,
          disabled: this.isDisabled(),
        }}
      >
        <View style={ styles.currentPassword }>
          <Input
            icon={ require('image!lock') }
            placeholder='Current Password'
            secureTextEntry={ true }
            onChangeText={ v => this.props.updatePassword(v, 'CURRENT_PASSWORD') }
          />
        </View>
        <View style={ styles.newPassword }>
          <Input
            icon={ require('image!lock') }
            placeholder='New Password'
            secureTextEntry={ true }
            onChangeText={ e => this.props.updatePassword(e, 'NEW_PASSWORD') }
          />
          <View style={ styles.seperator } />
          <Input
            icon={ require('image!lock') }
            placeholder='Confirm New Password'
            secureTextEntry={ true }
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
  clearChangePassword: _ => dispatch(clearChangePassword()),
  changePassword: _ => dispatch(changePassword()),
  updatePassword: (v, type) => dispatch(updatePassword(v, type)),
});

export default connect(mapStateToProps, mapActionsToProps)(ChangePassword);
