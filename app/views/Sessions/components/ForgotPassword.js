import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

import Container from '../../shared/Container';
import Input from '../../shared/Input';

import {
  resetPassword,
  updateSessionEmail,
} from '../../../actions';

class ChangePassword extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    resetPassword: React.PropTypes.func,
    updateSessionEmail: React.PropTypes.func,
    email: React.PropTypes.string.isRequired,
    animated: React.PropTypes.bool,
  };

  render() {
    let {
      updateSessionEmail,
      email,
      handleNavigate,
    } = this.props;

    return (
      <Container
        style={{ flex: 1, paddingBottom: 50 }}
        title='Forgot Password'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          title: 'Cancel',
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
      >

        <StatusBar
          hidden={ false }
      />

        <Text style={ styles.forgotPasswordCopy }>
          Enter your Kickback email address associated with your account.
        </Text>

        <View style={ styles.formContainer }>
          <Input
            icon={ require('image!user') }
            placeholder='youremail@yourhost.com'
            autoCapitalize={ 'none' }
            autoCorrect={ false }
            keyboardType={ 'email-address' }
            autoFocus={ true }
            value={ email }
            setRef={ input => this.email = input }
            onChangeText={ updateSessionEmail }
            onSubmitEditing={ () => this.props.resetPassword(this.state) }
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  forgotPasswordCopy: {
    fontSize: 14.5,
    color: '#8C9AA0',
    marginTop: 30,
    marginLeft: 17,
    marginRight: 11,
  },

  formContainer: {
    marginTop: 19,
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
  email: state.session.enteredEmail,
});

const mapActionsToProps = dispatch => ({
  resetPassword: user => dispatch(resetPassword(user)),
  updateSessionEmail: v => dispatch(updateSessionEmail(v)),
});

export default connect(mapStateToProps, mapActionsToProps)(ChangePassword);
