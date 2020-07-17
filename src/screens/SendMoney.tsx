import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import SendMoneyModal from '../components/SendMoneyModal';
import ContactList from '../components/ContactList';
import Contacts from '../assets/json/contacts.json';

const ArrowLeft = require('../assets/img/back.png');

const SendMoney = ({ navigation }: any) => {
  const [contact, setContact] = useState(false);

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

  const sendMoney = (contact: any) => {
    setContact(contact);
  }

  const onCloseModal = () => {
    setTimeout(() => {
      setContact(false);
    }, 500);
  }

  return (
    <View style={styles.main}>
      <ContactList
        data={Contacts}
        onPress={sendMoney}
        model={{
          title: 'fullName',
          subtitle: 'telephone',
        }}
      />

      { !!contact &&
        <SendMoneyModal
          contact={contact}
          onClose={onCloseModal}
        />
      }
    </View>
  );
}

SendMoney.defaultProps = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d4366',
    flexDirection: 'column',
  },
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
});

export default SendMoney;
