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
import {
  attachPayable,
  updatePayableEmail,
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
    updatePayableEmail: React.PropTypes.func.isRequired,
    email: React.PropTypes.string.isRequired,
  };

  render() {
    let {
      handleNavigate,
      email,
      updatePayableEmail,
     } = this.props;

    return (
      <Container
        style={{ flex: 1 }}
        title='Deposit Settings'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('image!back'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
        rightItem={{
          title: 'SAVE',
          onPress: () => this.props.attachPayable(),
        }}
      >
        <View style={ styles.payablePicContainer }>
          <TouchableOpacity>
            <Image style={styles.payablePic} source={require('../img/payable.png')} />
          </TouchableOpacity>
        </View>

        <View style={ styles.formContainer }>
          <Input
            icon={ require('image!email')}
            placeholder='youremail@yourhost.com'
            value={ email }
            onChangeText={ updatePayableEmail }
          />
        </View>

        <View>
          <Text style={ styles.payableCopy }>
            Deposits will be transferd to you through Payable on a monthly basis. See our Terms & Service agreement for more info.
          </Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  payablePicContainer: {
    marginTop: 43,
    alignItems: 'center',
  },

  payablePic: {
    height: 145,
    width: 272,

  },

  payableCopy: {
    fontSize: 15,
    color: '#8C9AA0',
    marginTop: 14,
    marginLeft: 16,
    marginRight: 15,
  },

  payablesFaq: {
    backgroundColor: '#45BAEF',
    marginTop: 197,
  },

  formContainer: {
    marginTop: 43,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8edef',
    borderBottomWidth: 1,
    borderBottomColor: '#e8edef',

  },
});

const mapStateToProps = state => ({
  email: state.user.payableEmail,
});

const mapActionsToProps = dispatch => ({
  attachPayable: _ => dispatch(attachPayable()),
  updatePayableEmail: v => dispatch(updatePayableEmail(v)),
});

export default connect(mapStateToProps, mapActionsToProps)(DepositSettings);
