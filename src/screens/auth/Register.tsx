import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, Text, Pressable} from 'react-native';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';

// contexts
import {Register, useAuth} from '@contexts/AuthContext';
import {useModal} from '@contexts/ModalContext';

// components
import Button from '@components/Button';
import Input from '@components/Input';
import Loader from '@components/Loader';

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

export default function RegisterScreen({navigation}: any) {
  const passwordInputRef = useRef<TextInput>(null);
  const {onRegister, isLoading} = useAuth();
  const {showModal, hideModal} = useModal();

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const handleRegister: SubmitHandler<Register> = async data => {
    const response = await onRegister!(data as Register);
    if (response?.error) {
      showModal(
        'Registration Error',
        response.status === 409
          ? 'An account with this email already exists. Please use a different email or log in.'
          : response.message,
        response.status === 409 && (
          <Button
            title="Log in"
            onPress={() => {
              hideModal();
              navigation.navigate('Login');
            }}
          />
        ),
      );
    } else {
      showModal(
        'Almost done!',
        <Text>
          We've sent a validation link to{' '}
          <Text style={styles.boldText}>{data.email}</Text>. Click the link to
          confirm your email account.
        </Text>,
        <Button
          title="Log in"
          onPress={() => {
            hideModal();
            navigation.navigate('Login');
          }}
        />,
      );
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader loading={isLoading} />}
      <FormProvider {...methods}>
        <Input
          name="email"
          label="Email"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          keyboardType="email-address"
        />
        <Input
          name="password"
          label="Password"
          secureTextEntry
          ref={passwordInputRef}
          returnKeyType="done"
        />
        <Button
          title="Sign Up"
          onPress={methods.handleSubmit(
            handleRegister as SubmitHandler<FieldValues>,
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
        <Text>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Sign in</Text>
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
