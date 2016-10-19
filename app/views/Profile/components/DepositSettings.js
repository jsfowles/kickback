import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import Container from '../../shared/Container';
import Input from '../../User/components/EditInput';

const ROUTES = {
  payablesFaq: {
    type: 'push',
    route: { key: 'payablesFaq' },
  },
};

class DepositSettings extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
  };

  render() {
    const { handleNavigate } = this.props;

    return (
      <Container
        style={{ flex: 1 }}
        title='Deposit Settings'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('image!back'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
      >
        <View style={ styles.payablePicContainer }>
          <TouchableOpacity>
            <Image style={styles.payablePic} source={require('../img/payable.png')} />
          </TouchableOpacity>
        </View>

        <View style={ styles.formContainer }>
          <Input icon={ require('image!email')} />
        </View>
        <View>
          <Text style={ styles.payableCopy }>
            Deposits will be transferd to you through Payable on a monthly basis. See our Terms & Service agreement for more info.
          </Text>
        </View>
        <View>
          <Container
            style={styles.payablesFaq}
            leftItem={{
              title: 'Payable FAQ',
              onPress: () => handleNavigate(ROUTES.payablesFaq),
            }}/>
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
    fontSize: 100,
    color: '#45BAEF',
    backgroundColor: '#45BAEF',
    textAlign: 'center',
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

export default DepositSettings;
