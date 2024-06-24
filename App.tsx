import React from 'react';
import {AuthProvider, useAuth} from './app/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import screens
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import ForgotPassword from './app/screens/ForgotPassword';
import Verify from './app/screens/Verify';

// import components
import HeaderBackButton from './app/components/HeaderBackButton';
import {ModalProvider} from './app/context/ModalContext';

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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
