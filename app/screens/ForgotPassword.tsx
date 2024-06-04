import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/forgot-password.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.message}>
        Don't worry, it happens. Please enter the email address associated with
        your account.
      </Text>
    </View>
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
    marginVertical: 70,
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
});
