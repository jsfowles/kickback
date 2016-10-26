import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Container from '../shared/Container';
import Input from '../shared/Input';

class EditProfile extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
  };

  render() {
    const { handleNavigate } = this.props;

    return (
      <Container
        style={{ flex: 1 }}
        title='Edit Profile'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('image!back'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
      >
        <View style={ styles.profilePicContainer }>
          <TouchableOpacity>
            <View style={ styles.profilePic } />
            <Text style={ styles.editLabel }>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={ styles.formContainer }>
          <Input icon={ require('image!user') } />
          <View style={ styles.seperator } />
          <Input icon={ require('image!email') } />
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

export default EditProfile;
