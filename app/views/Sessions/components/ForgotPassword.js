import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import Container from '../../shared/Container';
import Input from '../../shared/Input';

import {

} from '../../../actions';

class ChangePassword extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
  };

  render() {
    let {
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
          animated={ 'fade' }
      />

        <Text style={ styles.forgotPasswordCopy }>
          Enter your Kickback email address associated with your account.
        </Text>

        <View style={ styles.formContainer }>
          <Input
            icon={ require('image!user') }
            placeholder='youremail@yourhost.com'
            setRef={ input => this.passwordConfirmation = input }
            onSubmitEditing={ () => Alert.alert('Coming Soon!') }
          />
        </View>


      </Container>
    );
  }
}

const styles = StyleSheet.create({
  forgotPasswordCopy: {
    fontSize: 15,
    color: '#8C9AA0',
    marginTop: 30,
    marginLeft: 18,
    marginRight: 18,
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

});

const mapActionsToProps = dispatch => ({

});

export default connect(mapStateToProps, mapActionsToProps)(ChangePassword);
