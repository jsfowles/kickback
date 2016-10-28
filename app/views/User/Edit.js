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
  updateUserProfile,
  updateEmail,
  updateName,
} from '../../actions';

class EditProfile extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    updateUserProfile: React.PropTypes.func,
    updateEmail: React.PropTypes.func.isRequired,
    updateName: React.PropTypes.func.isRequired,
    email: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    isFetchingEmail: React.PropTypes.bool,
    isFetchingName: React.PropTypes.bool,
    isFetchingUserProfile: React.PropTypes.bool.isRequired,
  };

  render() {
    let {
      handleNavigate,
      email,
      name,
      updateEmail,
      updateName,
      isFetchingEmail,
      isFetchingUserProfile,
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
          onPress: () => this.props.updateUserProfile(),
          disabled: !validateEmail(email) || isFetchingEmail || isFetchingUserProfile,
        }}
      >
        <View style={ styles.profilePicContainer }>
          <TouchableOpacity>
            <View style={ styles.profilePic } />
            <Text style={ styles.editLabel }>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={ styles.formContainer }>
          <Input
            icon={ require('image!user') }
            value={ name }
            onChangeText={ updateName }
            placeholder={ 'Your Name' }
          />
          <View style={ styles.seperator } />
          <Input
            icon={ require('image!email') }
            value={ email }
            onChangeText={ updateEmail }
            placeholder={ 'Your Email' }
          />
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
  email: state.user.user.email,
  name: state.user.user.name,
  isFetchingName: state.user.isFetchingName,
  isFetchingEmail: state.user.isFetchingEmail,
  isFetchingUserProfile: state.user.isFetchingUserProfile,
});

const mapActionsToProps = dispatch => ({
  updateUserProfile: _ => dispatch(updateUserProfile()),
  updateEmail: v => dispatch(updateEmail(v)),
  updateName: v => dispatch(updateName(v)),
});

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
