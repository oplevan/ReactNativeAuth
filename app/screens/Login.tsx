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
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

// components
import Button from '../components/Button';
import Input from '../components/Input';

// icons
import Icon from 'react-native-vector-icons/Ionicons';
import {ActivityIndicatorOverlay} from '../components/ActivityIndicatorOverlay';
import {useModal} from '../context/ModalContext';

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
      console.log(response);
      if (response.status === 403) {
        showModal(
          'Email Not Verified',
          'Please verify your account by clicking the link in the email we sent to you. Also check the spam folder. If you do not have this email then click the button below to resend it.',
          <>
            <Button
              title="Resend verification email"
              onPress={() => {
                // Call function to resend verification email
                showModal(
                  'Verification Email Sent',
                  'A new verification email has been sent to your inbox.',
                );
              }}
            />
          </>,
        );
      } else {
        Alert.alert('Error: ' + response.status, response.msg);
      }
    } else {
      Alert.alert('Success', 'You have logged in successfully');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicatorOverlay text="Logging in..." />}
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
});
