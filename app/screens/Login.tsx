import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Login, useAuth} from '../context/AuthContext';
import {useModal} from '../context/ModalContext';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

// components
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';

// icons
import Icon from 'react-native-vector-icons/Ionicons';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, {message: 'Email is required'})
    .email({message: 'Invalid email address'}),
  password: z
    .string()
    .min(1, {message: 'Password is required'})
    .min(6, {message: 'Password must be at least 6 characters'}),
});

export default function LoginScreen({navigation}: any) {
  const passwordInputRef = useRef<TextInput>(null);
  const {onLogin, isLoading} = useAuth();
  const {showModal} = useModal();

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<Login> = async data => {
    const response = await onLogin!(data as Login);
    if (response?.error) {
      if (response.status === 403) {
        showModal(
          'Email Not Verified',
          <Text>
            Please, confirm your email by clicking the link we sent to{' '}
            <Text style={styles.boldText}>{response.email}</Text>.
          </Text>,
          <>
            <Button
              title="Resend verification email"
              onPress={() => {
                showModal(
                  'Verification email sent',
                  <Text>
                    We just sent a new link to{' '}
                    <Text style={styles.boldText}>{response.email}</Text>.
                    {'\n\n'} If you don't receive an email from us within 10
                    minutes, please contact our support team{' '}
                    <Text style={styles.boldText}>support@mail.com</Text>
                  </Text>,
                );
              }}
            />
          </>,
        );
      } else {
        Alert.alert('Error', response.message);
      }
    } else {
      Alert.alert('Success', 'You have logged in successfully');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader loading={isLoading} text="Logging in..." />}
      <FormProvider {...methods}>
        <Input
          name="email"
          label="Email"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          name="password"
          label="Password"
          secureTextEntry
          ref={passwordInputRef}
          returnKeyType="done"
        />
        <Pressable
          onPress={() => navigation.navigate('Forgot')}
          style={styles.forgotPasswordText}>
          <Text>Forgot password?</Text>
        </Pressable>
        <Button
          title="Login"
          onPress={methods.handleSubmit(
            handleLogin as SubmitHandler<FieldValues>,
          )}
          style={styles.button}
        />
      </FormProvider>
      <Text style={styles.orText}>or</Text>
      <Button
        variant="outlined"
        title="Continue with Google"
        onPress={() => console.log('Continue with Google')}
        style={styles.button}
        icon={<Icon name="logo-google" size={25} color="#000" />}
      />
      <View style={styles.registerTextContainer}>
        <Text>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 38,
    backgroundColor: '#fff',
    position: 'relative',
  },
  button: {
    marginTop: 25,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
  },
  orText: {
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerTextContainer: {
    marginTop: 45,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  linkText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
