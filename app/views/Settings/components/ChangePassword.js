import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';


import Container from '../../shared/Container';
import Input from '../../shared/Input';

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
        title='Change Password'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('image!back'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
        rightItem={{
          title: 'SAVE',
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
      >
        <View style={ styles.currentPassword }>
          <Input
            icon={ require('image!lock')}
            placeholder='Current Password'
          />
        </View>
        <View style={ styles.newPassword }>
          <Input
            icon={ require('image!lock')}
            placeholder='New Password'
          />
          <View style={ styles.seperator } />
          <Input
            icon={ require('image!lock')}
            placeholder='Confirm New Password'
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

  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChangePassword;
