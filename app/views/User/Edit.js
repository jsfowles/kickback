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

import ImagePicker from 'react-native-image-crop-picker';

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
    avatarUrl: React.PropTypes.string,
    isFetchingAvatarUrl: React.PropTypes.bool,
    isFetchingEmail: React.PropTypes.bool,
    isFetchingName: React.PropTypes.bool,
    isFetchingUserProfile: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      avatarUrl: this.props.avatarUrl,
      name: this.props.name,
      email: this.props.email,
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.name !== this.props.name || nextProps.email !== this.props.email ) {
      this.setState({ email: nextProps.email, name: nextProps.name, avatarUrl: nextProps.avatarUrl });
    }
  }

  onInputChange = (v, k) => {
    this.setState({ [k]: v });
  }

  selectPhotoTapped() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      console.log(image);

      const source = `data:image/jpeg;base64,${image.data}`;

      this.setState({
        avatarUrl: source,
      });
    }).catch(res => {
      console.log('User Cancelled');
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
          icon: require('./components/assets/images/back.png'),
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
            <View style={[ styles.avatar, styles.avatarContainer ]}>
               <Image
                 style={styles.avatar}
                 source={{ uri: this.state.avatarUrl }}
                 />
           </View>
           <Text style={ styles.editLabel}>Edit</Text>
         </TouchableOpacity>
        </View>

        <View style={ styles.formContainer }>
          <Input
            icon={ require('./components/assets/images/user.png') }
            value={ this.state.name }
            placeholder={ 'Your Name' }
            onChangeText={ v => this.onInputChange(v, 'name') }
            onSubmitEditing={ _ => this.email.focus() }
          />
          <View style={ styles.seperator } />
          <Input
            icon={ require('./components/assets/images/email.png') }
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

  editLabel: {
    color: '#6d7577',
    fontSize: 16,
    marginTop: 9,
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
    borderRadius: 40,
    width: 80,
    height: 80,
  },
});

const mapStateToProps = state => ({
  avatarUrl: state.user.user.avatarUrl,
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
