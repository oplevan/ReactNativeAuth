import {View, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import {useAuth} from '../contexts/AuthContext';

const Home = () => {
  const {onLogout} = useAuth();
  return (
    <View style={styles.container}>
      <Button onPress={() => onLogout!()} title="Logout" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
