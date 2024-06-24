import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import Button from '../components/Button';

export default function Verify({route, navigation}: any) {
  const {email} = route.params;
  const [otp, setOtp] = useState<string | null>(null);

  const handleVerifyOTP = async () => {
    console.log(otp);
  };
  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <Image
        source={require('../assets/images/enter-otp.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.message}>
        A 4-digit OTP (one-time-password) has been sent to{' '}
        <Text style={styles.boldText}>{email}</Text>
      </Text>
      <View style={styles.formContainer}>
        <OtpInput
          numberOfDigits={4}
          onFilled={text => setOtp(text)}
          autoFocus={false}
          theme={{
            inputsContainerStyle: styles.inputsContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            focusStickStyle: styles.focusStick,
          }}
        />
        <Button title="Verify" onPress={handleVerifyOTP} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 38,
  },
  image: {
    marginHorizontal: 'auto',
    marginVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    marginTop: 50,
    gap: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },

  // OTP input styles
  inputsContainer: {
    gap: 30,
  },
  pinCodeContainer: {
    flex: 1,
  },
  activePinCodeContainer: {
    borderColor: '#000',
  },
  focusStick: {
    backgroundColor: '#000',
  },
});
