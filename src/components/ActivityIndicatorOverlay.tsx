import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

type Props = {
  theme?: 'white' | 'black';
  size?: 'large' | 'small';
  text?: string;
};

export const ActivityIndicatorOverlay = ({
  theme = 'white',
  size = 'large',
  text,
}: Props) => {
  const color = theme === 'white' ? '#fff' : '#fff';
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size={size as 'large' | 'small'} color={color} />
      {text && <Text style={{color, ...styles.text}}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});
