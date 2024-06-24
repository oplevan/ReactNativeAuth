import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import Input from '@components/Input';
import Button from '@components/Button';
import {Login} from '@contexts/AuthContext';

const schema = z.object({
  email: z
    .string()
    .min(1, {message: 'Email is required'})
    .email({message: 'Invalid email address'}),
});

export default function ForgotPassword({navigation}: any) {
  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const handleSubmit: SubmitHandler<Login> = async data => {
    console.log(data);
    navigation.navigate('Verify', data);
  };
  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <Image
        source={require('@assets/images/forgot-password.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.message}>
        Don't worry, it happens. Please enter the email address associated with
        your account.
      </Text>
      <View style={styles.formContainer}>
        <FormProvider {...methods}>
          <Input name="email" label="Enter your email" returnKeyType="done" />
          <Button
            title="Get OTP"
            onPress={methods.handleSubmit(
              handleSubmit as SubmitHandler<FieldValues>,
            )}
            style={styles.button}
          />
        </FormProvider>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 38,
  },
  image: {
    margin: 'auto',
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
    width: 'auto',
    marginTop: 30,
  },
  button: {
    marginTop: 15,
  },
});
