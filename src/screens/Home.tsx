import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Avatar from '../components/Avatar';
import Touchable from 'react-native-touchable-safe';

const Home = ({ navigation }: any) => {
  const goToSendMoney = () => {
    navigation.navigate('SendMoney');
  }

  const goToPaymentHistory = () => {
    navigation.navigate('PaymentHistory');
  }

  return (
    <View style={styles.main}>
      <View style={styles.profileContainer}>
        <Avatar
          size={140}
          color='#02f2be'
          borderColor='#02f2be'
          borderWidth={4}
          placeholderPicture={require('../assets/img/avatar.jpg')}
          initials='MG'
        />

        <Text style={styles.profileName}>Janaina Guimarães</Text>
        <Text style={styles.profileEmail}>janaina.gui@gmail.com</Text>
      </View>


      <View style={styles.bottom}>
        <Touchable onPress={goToSendMoney} testID='submitButton'>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Enviar Dinheiro</Text>
          </View>
        </Touchable>

        <Touchable onPress={goToPaymentHistory} testID='cancelButton'>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Histórico de Envios</Text>
          </View>
        </Touchable>
      </View>
    </View>
  );
}

Home.defaultProps = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d4366',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#1d4366',
  },
  profileContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 130,
  },
  profileName: {
    color: '#02f2be',
    marginTop: 15,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
  btn: {
    marginBottom: 20,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '100%',
    backgroundColor: '#00a6a8',
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});

export default Home;
