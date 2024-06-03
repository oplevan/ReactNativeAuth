import React from 'react';
import {AuthProvider, useAuth} from './app/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import screens
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Register from './app/screens/Register';

// import components
import HeaderBackButton from './app/components/HeaderBackButton';

export default function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
