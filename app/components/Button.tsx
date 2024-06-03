import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
};

const Button = ({title, style, textStyle, onPress}: ButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? 0.8 : 1.0},
        styles.button,
        style,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
});
