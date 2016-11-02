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
  clearChangePassword,
} from '../../../actions';

class ChangePassword extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    changePassword: React.PropTypes.func,
    currentPassword: React.PropTypes.string,
    newPassword: React.PropTypes.string,
    passwordConfirmation: React.PropTypes.string,
    clearChangePassword: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPassword: this.props.currentPassword,
      newPassword: this.props.newPassword,
      passwordConfirmation: this.props.passwordConfirmation,
    };
  }

  onInputChange = (v, k) => {
    this.setState({ [k]: v });
  }

  isDisabled = () => {
    let {
      currentPassword,
      newPassword,
      passwordConfirmation,
    } = this.state;

    return !validatePassword(passwordConfirmation) || !validatePassword(currentPassword) || newPassword !== passwordConfirmation;
  }

  backButton = () => {
    this.props.clearChangePassword();
    return this.props.handleNavigate({ type: 'pop' });
  }

  render() {
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
          onPress: () => this.props.changePassword(this.state),
          disabled: this.isDisabled(),
        }}
      >
        <View style={ styles.currentPassword }>
          <Input
            icon={ require('image!lock') }
            placeholder='Current Password'
            value={ this.state.currentPassword }
            secureTextEntry={ true }
            onChangeText={ v => this.onInputChange(v, 'currentPassword') }
            onSubmitEditing={ _ => this.newPassword.focus() }
          />
        </View>
        <View style={ styles.newPassword }>
          <Input
            icon={ require('image!lock') }
            placeholder='New Password'
            value={ this.state.newPassword }
            secureTextEntry={ true }
            setRef={ input => this.newPassword = input }
            onChangeText={ v => this.onInputChange(v, 'newPassword') }
            onSubmitEditing={ _ => this.passwordConfirmation.focus() }
          />
          <View style={ styles.seperator } />
          <Input
            icon={ require('image!lock') }
            placeholder='Confirm New Password'
            value={ this.state.passwordConfirmation }
            secureTextEntry={ true }
            setRef={ input => this.passwordConfirmation = input }
            onChangeText={ v => this.onInputChange(v, 'passwordConfirmation') }
            onSubmitEditing={ () => this.props.changePassword(this.state) }

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
  changePassword: user => dispatch(changePassword(user)),
});

export default connect(mapStateToProps, mapActionsToProps)(ChangePassword);
