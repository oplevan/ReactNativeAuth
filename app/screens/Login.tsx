import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, Text, Pressable} from 'react-native';
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
  const {showModal, hideModal} = useModal();

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const errors = [
    {
      status: 403,
      title: 'Email not verified',
      message:
        'Please, check your inbox and click the link to confirm your email address. Or request a new link below.',
      action: (
        <Button
          title="Resend verification email"
          onPress={() => {
            showModal(
              'Check your inbox',
              <Text>
                We just sent you a new link. If you don't receive an email from
                us within 10 minutes, please contact our support team{' '}
                <Text style={styles.boldText}>support@mail.com</Text>
              </Text>,
            );
          }}
        />
      ),
    },
    {
      status: 404,
      title: 'Not Found',
      message:
        "We couldn't find an account associated with this email address.",
      action: (
        <Button
          title="Register"
          onPress={() => {
            hideModal();
            navigation.navigate('Register');
          }}
        />
      ),
    },
    {
      status: 401,
      title: 'Unauthorized',
      message: 'Invalid credentials',
      action: null,
    },
    {
      status: 400,
      title: 'Bad Request',
      message: 'Incorrect password. Please try again',
      action: null,
    },
    {
      status: 500,
      title: 'Internal Server Error',
      message: 'Something went wrong. Please try again.',
      action: null,
    },
  ];

  const handleLogin: SubmitHandler<Login> = async data => {
    const response = await onLogin!(data as Login);
    if (response?.error) {
      showModal(
        // modal title
        errors.find(err => err.status === response.status)?.title ||
          'Login Error',

        // modal message/body
        errors.find(err => err.status === response.status)?.message ||
          'Something went wrong. Please try again.',

        // modal footer/actions
        errors.find(err => err.status === response.status)?.action,
      );
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
