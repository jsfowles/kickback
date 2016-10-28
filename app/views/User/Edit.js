import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { validateEmail } from '../../utils/validations';

import Container from '../shared/Container';
import Input from '../shared/Input';

import {
  attachEmail,
  updateUserEmail,
} from '../../actions';

class EditProfile extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    attachEmail: React.PropTypes.func,
    updateUserEmail: React.PropTypes.func.isRequired,
    email: React.PropTypes.string.isRequired,
    isFetchingUserEmail: React.PropTypes.bool.isRequired,
  };

  render() {
    let {
      handleNavigate,
      email,
      updateUserEmail,
      isFetchingUserEmail,
     } = this.props;

    return (
      <Container
        style={{ flex: 1 }}
        title='Edit Profile'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('image!back'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
        rightItem={{
          title: 'SAVE',
          onPress: () => this.props.attachEmail,
          disabled: !validateEmail(email) || isFetchingUserEmail,
        }}
      >
        <View style={ styles.profilePicContainer }>
          <TouchableOpacity>
            <View style={ styles.profilePic } />
            <Text style={ styles.editLabel }>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={ styles.formContainer }>
          <Input icon={ require('image!user') }/>
          <View style={ styles.seperator } />
          <Input
            icon={ require('image!email') }
            value={ email }
            onChangeText={ updateUserEmail } />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  profilePicContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },

  profilePic: {
    height: 75,
    width: 75,
    borderRadius: 75,
    marginBottom: 9,
    backgroundColor: '#0e739f',
  },

  editLabel: {
    color: '#6d7577',
    fontSize: 16,
    textAlign: 'center',
  },

  formContainer: {
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
  email: state.user.user.updateEmail,
  isFetchingUserEmail: state.user.isFetchingUserEmail,
});

const mapActionsToProps = dispatch => ({
  attachEmail: _ => dispatch(attachEmail()),
  updateUserEmail: v => dispatch(updateUserEmail(v)),
});

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
