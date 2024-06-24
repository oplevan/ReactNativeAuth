import React from 'react';
import {AuthProvider, useAuth} from './src/contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import screens
import Home from '@screens/Home';
import Login from '@screens/auth/Login';
import Register from '@screens/auth/Register';
import ForgotPassword from '@screens/auth/ForgotPassword';
import Verify from '@screens/auth/Verify';
import ResetPassword from '@screens/auth/ResetPassword';

// import components
import HeaderBackButton from '@components/HeaderBackButton';
import {ModalProvider} from '@contexts/ModalContext';

export default function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <ModalProvider>
        <RootStack />
      </ModalProvider>
    </AuthProvider>
  );
}

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Forgot: undefined;
  Verify: undefined;
  'Reset password': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const {authState} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Group
            screenOptions={{
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="Register"
              component={Register}
              options={({navigation}) => ({
                headerLeft: () => <HeaderBackButton navigation={navigation} />,
              })}
            />
            {/* Screen where user can request OTP (one-time-password) */}
            <Stack.Screen
              name="Forgot"
              component={ForgotPassword}
              options={({navigation}) => ({
                headerLeft: () => <HeaderBackButton navigation={navigation} />,
              })}
            />
            {/* This is where user can verify the OTP received via email */}
            <Stack.Screen
              name="Verify"
              component={Verify}
              options={({navigation}) => ({
                headerLeft: () => <HeaderBackButton navigation={navigation} />,
              })}
            />
            {/* New password screen */}
            <Stack.Screen
              name="Reset password"
              component={ResetPassword}
              options={({navigation}) => ({
                headerLeft: () => <HeaderBackButton navigation={navigation} />,
              })}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
