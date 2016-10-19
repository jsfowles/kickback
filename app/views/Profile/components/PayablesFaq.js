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

class PayablesFaq extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
  };

  render() {
    const { handleNavigate } = this.props;

    return (
      <Container
        style={{ flex: 1 }}
        title='Payable FAQ'
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

        <View style={ styles.payableCopyContainer }>
          <Text style={ styles.payableHeader}>
            What is Payable?
          </Text>
          <Text style={ styles.payableCopy}>
            Chillwave tote bag taxidermy, Tumblr
            whatever locavore quinoa literally jean
            shorts church-key. High Life Schlitz
            actually seitan, gluten-free fanny pack
            Vice pour-over deep v blog leggings.
          </Text>

          <Text style={ styles.payableHeader}>
            How do I get a Payable Account?
          </Text>
          <Text style={ styles.payableCopy}>
            Chillwave tote bag taxidermy, Tumblr
            whatever locavore quinoa literally jean
            shorts church-key. High Life Schlitz
            actually seitan, gluten-free fanny pack
            Vice pour-over deep v blog leggings
            Austin really deep v.
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

  payableHeader: {
    fontSize: 28,
    color: '#1C343A',
    marginTop: 52,
    marginLeft: 27,
    marginRight: 133,
  },

  payableCopy: {
    fontSize: 18,
    color: '#8C9AA0',
    marginTop: 25,
    marginLeft: 28,
    marginRight: 28,
    lineHeight: 28,
    flexWrap: 'wrap',
  },
});

export default PayablesFaq;
