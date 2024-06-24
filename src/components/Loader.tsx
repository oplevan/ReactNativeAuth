import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BlurView} from 'expo-blur';

type LoaderProps = {
  loading: boolean;
  theme?: 'white' | 'black';
  size?: 'large' | 'small';
  text?: string;
};
export default function Loader({
  loading,
  theme = 'white',
  size = 'large',
  text,
}: LoaderProps) {
  const color = theme === 'white' ? '#fff' : '#fff';
  return (
    <Modal transparent={true} animationType="none" visible={loading}>
      <BlurView intensity={30} style={styles.blurContainer} tint="dark">
        <View style={styles.centeredView}>
          <ActivityIndicator size={size as 'large' | 'small'} color={color} />
          {text && <Text style={{color, ...styles.text}}>{text}</Text>}
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});
