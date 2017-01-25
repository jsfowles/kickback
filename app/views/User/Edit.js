import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  PixelRatio,
  Text,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import { validateEmail } from '../../utils/validations';

import Container from '../shared/Container';
import Input from '../shared/Input';

import {
  updateUserProfile,
} from '../../actions';

class EditProfile extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    updateUserProfile: React.PropTypes.func,
    email: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    avatar: React.PropTypes.string,
    isFetchingAvatar: React.PropTypes.bool,
    isFetchingEmail: React.PropTypes.bool,
    isFetchingName: React.PropTypes.bool,
    isFetchingUserProfile: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      name: this.props.name,
      email: this.props.email,
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.name !== this.props.name || nextProps.email !== this.props.email ) {
      this.setState({ email: nextProps.email, name: nextProps.name, avatar: nextProps.avatar });
    }
  }

  onInputChange = (v, k) => {
    this.setState({ [k]: v });
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source;

        if (Platform.OS === 'ios') {
          source = { uri: 'data:image/jpeg;base64,' + response.data };
        } else {
          source = { uri: response.uri.replace('file://', '') };
        }

        this.setState({
          avatar: source,
        });
      }
    });
  }

  render() {
    let {
      handleNavigate,
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
          onPress: () => this.props.updateUserProfile(this.state),
          disabled: !validateEmail(this.state.email) || isFetchingEmail || isFetchingUserProfile,
        }}
      >
        <View style={ styles.profilePicContainer }>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[ styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
             { this.state.avatar === null ? <Text>Select a Photo</Text> :
               <Image
                 style={styles.avatar}
                 source={this.state.avatar}
                 />
             }
           </View>
         </TouchableOpacity>
        </View>

        <View style={ styles.formContainer }>
          <Input
            icon={ require('image!user') }
            value={ this.state.name }
            placeholder={ 'Your Name' }
            onChangeText={ v => this.onInputChange(v, 'name') }
            onSubmitEditing={ _ => this.email.focus() }
          />
          <View style={ styles.seperator } />
          <Input
            icon={ require('image!email') }
            value={ this.state.email }
            placeholder={ 'Your Email' }
            setRef={ input => this.email = input }
            onChangeText={ v => this.onInputChange(v, 'email') }
            onSubmitEditing={ () => this.props.updateUserProfile(this.state) }
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
    borderWidth: 0,
    marginBottom: 9,
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

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});

const mapStateToProps = state => ({
  avatar: state.user.user.avatar.avatar.url,
  email: state.user.user.email,
  name: state.user.user.name,
  isFetchingAvatar: state.user.isFetchingAvatar,
  isFetchingName: state.user.isFetchingName,
  isFetchingEmail: state.user.isFetchingEmail,
  isFetchingUserProfile: state.user.isFetchingUserProfile,
});

const mapActionsToProps = dispatch => ({
  updateUserProfile: user => dispatch(updateUserProfile(user)),
});

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
