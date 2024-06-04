import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

type ButtonProps = {
  variant?: 'outlined' | 'contained';
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  icon?: React.ReactElement;
};

const Button = ({
  variant = 'contained',
  title,
  style,
  textStyle,
  onPress,
  icon,
}: ButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? 0.8 : 1.0},
        styles.button,
        styles[variant],
        style,
      ]}
      onPress={onPress}>
      {icon}
      <Text style={[styles.text, styles[`text-${variant}`], textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  contained: {
    backgroundColor: 'black',
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  'text-contained': {
    fontWeight: 'bold',
    color: 'white',
  },
  'text-outlined': {
    color: 'black',
  },
});
