import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ResetPassword({route, navigation}: any) {
  return (
    <View style={styles.container}>
      <Text>ResetPassword</Text>
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
});
