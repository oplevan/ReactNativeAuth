import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, Text, Pressable} from 'react-native';
import {z} from 'zod';
import Input from '../components/Input';
import Form from '../components/Form';

type formData = {
  email: string;
  password: string;
};

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

  const handleLogin = (data: formData) => {
    console.log('Login Data', data);
  };

  return (
    <View style={styles.container}>
      <Form schema={loginSchema} onSubmit={handleLogin}>
        <Input
          name="email"
          label="Enter your email"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          name="password"
          label="Enter your password"
          secureTextEntry
          ref={passwordInputRef}
          returnKeyType="done"
        />
      </Form>
      <View style={styles.textContainer}>
        <Text>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
  },
  textContainer: {
    marginTop: 13,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signUpText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
