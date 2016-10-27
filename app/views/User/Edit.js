import React from 'react';
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
    isFetchingUserProfile: React.PropTypes.bool.isRequired,
  };

  render() {
    let {
      handleNavigate,
      email,
      updateUserEmail,
      isFetchingUserProfile,
      isFetchingUserEmail,
     } = this.props;

    return (
      <Container
        style={{ flex: 1 }}
        title='Edit Profile'
        headerColors={[ '#45baef', '#34bcd5' ]}
      >

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
  isFetchingUserProfile: state.user.isFetchingUserProfile,
});

const mapActionsToProps = dispatch => ({
  attachEmail: _ => dispatch(attachEmail()),
  updateUserEmail: v => dispatch(updateUserEmail(v)),
});

export default(mapStateToProps, mapActionsToProps)(EditProfile);
