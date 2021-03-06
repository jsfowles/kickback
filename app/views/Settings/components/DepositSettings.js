import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { validateEmail } from '../../../utils/validations';

import Container from '../../shared/Container';
import Input from '../../shared/Input';
import BottomLink from '../../shared/BottomLink';
import {
  attachPayable,
} from '../../../actions';

const ROUTES = {
  payablesFaq: {
    type: 'push',
    route: { key: 'payablesFaq' },
  },
};

class DepositSettings extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    attachPayable: React.PropTypes.func,
    updatePayableEmail: React.PropTypes.func,
    email: React.PropTypes.string.isRequired,
    isFetchingUserPayable: React.PropTypes.bool.isRequired,
    isFetchingUserProfile: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: this.props.email,
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.email !== this.props.email) {
      this.setState({ email: nextProps.email});
    }
  }

  onInputChange = (v, k) => {
    this.setState({ [k]: v });
  }

  render() {
    let {
      handleNavigate,
      isFetchingUserPayable,
      isFetchingUserProfile,
     } = this.props;

    return (
      <Container
        style={{ flex: 1, paddingBottom: 50 }}
        title='Deposit Settings'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('./assets/images/back.png'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
        rightItem={{
          title: 'SAVE',
          onPress: () => this.props.attachPayable(this.state),
          disabled: !validateEmail(this.state.email) || isFetchingUserPayable || isFetchingUserProfile,
        }}
      >
        <View style={ styles.contentContainer }>
          <Image style={ styles.payablePic } source={ require('./assets/images/payable.png') } />
          <Input
            wrapperStyles={ styles.formContainer }
            icon={ require('./assets/images/email.png') }
            placeholder='youremail@yourhost.com'
            value={this.state.email}
            onChangeText={ v => this.onInputChange(v, 'email') }
            onSubmitEditing={ () => this.props.attachPayable(this.state) }
          />
          <Text style={ styles.payableCopy }>
            Deposits will be transferd to you through Payable on a monthly basis. See our Terms & Service agreement for more info.
          </Text>

        </View>

        <View style={ styles.btnContainer }>
          <BottomLink
            title='Payable FAQ'
            onPress={() => handleNavigate(ROUTES.payablesFaq)}
            />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  payablePic: {
    marginTop: 43,
    height: 145,
    width: 272,
    alignSelf: 'center',
  },

  payableCopy: {
    fontSize: 15,
    color: '#8C9AA0',
    marginTop: 14,
    marginLeft: 16,
    marginRight: 15,
  },

  formContainer: {
    marginTop: 43,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8edef',
    borderBottomWidth: 1,
    borderBottomColor: '#e8edef',
  },

  contentContainer: {
    flex: 1,
    position: 'relative',
  },

  btnContainer: {
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  email: state.user.user.payableEmail,
  isFetchingUserPayable: state.user.isFetchingUserPayable,
  isFetchingUserProfile: state.user.isFetchingUserProfile,
});

const mapActionsToProps = dispatch => ({
  attachPayable: user => dispatch(attachPayable(user)),
});

export default connect(mapStateToProps, mapActionsToProps)(DepositSettings);
