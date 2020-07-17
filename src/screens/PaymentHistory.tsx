import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import ContactList from '../components/ContactList';
import Contacts from '../assets/json/contacts.json';
import Payments from '../assets/json/payments.json';
import PaymentList from '../components/PaymentList';

const ArrowLeft = require('../assets/img/back.png');
const deviceHeight = Dimensions.get('window').height;

const PaymentHistory = ({ navigation }: any) => {
  const [payments, setPayments] = useState([]);

  useLayoutEffect(() => {
    /* istanbul ignore next */
    if (navigation) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={styles.backBtnContainer}>
              <Image source={ArrowLeft} style={styles.backBtnImage} />
            </View>
          </TouchableWithoutFeedback>
        ),
      });
    }
  }, [navigation]);

  useEffect(() => {
    fillContactsInPayments();
  }, []);

  const formatPrice = (price: number) => {
    let num: any = price.toFixed(2).split('.');
    num[0] = 'R$ ' + num[0].split(/(?=(?:...)*$)/).join('.');
    return num.join(',').replace('.,', ',');
  }

  const fillContactsInPayments = () => {
    const _payments: any = Payments;
    const _contacts: any = Contacts;

    for (let i = 0; i < _payments.length; i++) {
      _payments[i].formattedValue = formatPrice(_payments[i].value);

      for (let j = 0; j < _contacts.length; j++) {
        if (_payments[i].userId === _contacts[j].id) {
          _payments[i] = { ..._payments[i], ..._contacts[j] };
        }
      }

      if (i === _payments.length - 1) {
        setPayments(_payments);
      }
    }
  }

  return (
    <View style={styles.main}>
      { !!payments && payments.length > 0 &&
        <View style={[styles.paymentsContainer, { height: deviceHeight * .30 }]}>
          <PaymentList
            data={payments}
          />
        </View>
      }

      <View style={[styles.contactsContainer, { height: deviceHeight * .68 }]}>
        <ContactList
          data={payments}
          model={{
            title: 'fullName',
            subtitle: 'telephone',
            subtitle2: 'formattedValue',
          }}
        />
      </View>
    </View>
  );
}

PaymentHistory.defaultProps = {
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1d4366',
    paddingTop: 72,
  },
  backBtnContainer: {
    flex: 1,
    marginTop: -11,
    marginLeft: 15,
  },
  backBtnImage: {
    width: 40,
    height: 40,
  },
  paymentsContainer: {
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff30',
  },
  contactsContainer: {
    justifyContent: 'flex-end',
  },
});

export default PaymentHistory;
