import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import Input from '../components/Input';
import Button from '../components/Button';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Login} from '../context/AuthContext';

const schema = z.object({
  email: z
    .string()
    .min(1, {message: 'Email is required'})
    .email({message: 'Invalid email address'}),
});

export default function ForgotPassword() {
  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const handleSubmit: SubmitHandler<Login> = async data => {
    console.log(data);
  };
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
      <View style={styles.formContainer}>
        <FormProvider {...methods}>
          <Input name="email" label="Enter your email" returnKeyType="done" />
          <Button
            title="Get OTP"
            onPress={methods.handleSubmit(
              handleSubmit as SubmitHandler<FieldValues>,
            )}
          />
        </FormProvider>
      </View>
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
  formContainer: {
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
});
