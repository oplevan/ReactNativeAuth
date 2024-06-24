import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HeaderBackButton({navigation}: any) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <Icon name="chevron-back" size={25} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});
