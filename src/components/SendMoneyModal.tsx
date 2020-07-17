import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, StyleSheet, Image } from 'react-native';
import Touchable from 'react-native-touchable-safe';
import Modal from "react-native-modal";
import Avatar from './Avatar';
import AvatarColor from '../helpers/AvatarColor';
import AvatarInitials from '../helpers/AvatarInitials';
import { TextInputMask } from 'react-native-masked-text';
import LottieView from 'lottie-react-native';

const SuccessAnimation = require('../assets/lottie/loadingSuccess.json');
const ErrorAnimation = require('../assets/lottie/loadingError.json');

const deviceWidth = Dimensions.get('window').width;

const Close = require('../assets/img/close.png');

const SendMoneyModal = (props: any) => {
  const { contact, onClose } = props;

  const [value, setValue] = useState('R$0,00');
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState('');
  const [statusText, setStatusText] = useState('');

  const close = () => {
    onClose();
    setVisible(false);
  }

  const onChangeValue  = (text: string) => {
    setValue(text);
  }

  const sendMoney = () => {
    const _value = !value ? 'R$0,00' : value;

    const parsedValue: any = Number(_value.replace(/[^0-9-,]+/g, '').replace(',', '.'));

    console.log(parsedValue);

    if (parsedValue <= 0) {
      setStatus('error');
      setTimeout(() => setStatusText('Houve algum erro...'), 1000);
    } else {
      setStatus('success');
      setTimeout(() => setStatusText('Dinheiro enviado!'), 1250);
    }
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={close}
      onBackButtonPress={close}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      avoidKeyboard={true}
      animationIn={'slideInUp'}
      animationOut={'fadeOut'}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={350}
      backdropTransitionOutTiming={350}
      backdropOpacity={.7}
      style={{ zIndex: 99999999 }}
      customBackdrop={
        <TouchableWithoutFeedback onPress={close}>
          <View style={{ flex: 1, backgroundColor: '#000', position: 'absolute', left: 0, top: 0, width: '100%', height: '120%' }} />
        </TouchableWithoutFeedback>
      }
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.box}>
          <TouchableWithoutFeedback onPress={close} hitSlop={{ left: 20, top: 20, right: 20, bottom: 20 }}>
            <View style={styles.closeBtn}>
              <Image source={Close} style={styles.closeBtnImage} />
            </View>
          </TouchableWithoutFeedback>

          { !status &&
            <>
              <View style={styles.profileContainer}>
                <Avatar
                  size={80}
                  color={AvatarColor(contact.fullName)}
                  borderColor='#02f2be'
                  borderWidth={2}
                  picture={contact.picture}
                  initials={AvatarInitials(contact.fullName)}
                />

                <Text style={styles.profileName}>{ contact.fullName }</Text>
                <Text style={styles.profileTelephone}>{ contact.telephone }</Text>
              </View>

              <View style={styles.inputInstructions}>
                <Text style={styles.inputInstructionsText}>Valor a enviar:</Text>
              </View>

              <TextInputMask
                onChangeText={onChangeValue}
                style={styles.moneyInput}
                value={value}
                type={'money'}
                options={{ format: 'unit' }}
                placeholder='R$0,00'
                placeholderTextColor='#00a6a8'
              />

              <View style={{ width: '80%', alignSelf: 'center', flex: 1 }}>
                <Touchable onPress={sendMoney} testID='submitButton'>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Enviar</Text>
                  </View>
                </Touchable>
              </View>
            </>
          }

          { status === 'success' &&
            <>
              <LottieView
                source={SuccessAnimation}
                style={styles.successAnimation}
                autoPlay
                loop={false}
                speed={1}
              />

              { !!statusText &&
                <View style={styles.animationLabel}>
                  <Text style={styles.animationLabelText}>
                    { statusText }
                  </Text>
                </View>
              }
            </>
          }

          { status === 'error' &&
            <>
              <LottieView
                source={ErrorAnimation}
                style={styles.errorAnimation}
                autoPlay
                loop={false}
                speed={.85}
              />

              { !!statusText &&
                <View style={styles.animationLabel}>
                  <Text style={styles.animationLabelText}>
                    { statusText }
                  </Text>
                </View>
              }
            </>
          }
        </View>
      </View>
    </Modal>
  )
}

SendMoneyModal.defaultProps = {
  contact: {},
  onClose: () => {},
}

const styles = StyleSheet.create({
  iconListItem: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  iconListItemText: {
    fontSize: 17,
    marginLeft: 15,
    color: '#111',
  },
  closeBtn: {
    flex: 1,
    position:'absolute',
    top: 15,
    left: 15,
    zIndex: 99999,
  },
  closeBtnImage: {
    flex: 1,
    width: 45,
    height: 45,
  },
  box: {
    paddingTop: 18,
    borderRadius: 30,
    width: deviceWidth * .87,
    minHeight: 400,
    backgroundColor: '#39586a',
  },
  profileTopBox: {
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 10,
    // height: 220, // force box height
  },

  profileContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  profileName: {
    color: '#fff',
    marginTop: 5,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: "bold",
  },
  profileTelephone: {
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
    alignSelf: 'center',
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

  inputInstructions: {
    marginTop: 25,
  },
  inputInstructionsText: {
    textAlign: 'center',
    fontSize: 15,
  },
  moneyInput: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    fontSize: 38,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00a6a8'
  },
  successAnimation: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -15,
  },
  errorAnimation: {
    width: '55%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 35,
  },
  animationLabel: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 95,
  },
  animationLabelText: {
    fontSize: 25,
  },
});

export default SendMoneyModal;
