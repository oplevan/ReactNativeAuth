import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  secureTextEntry?: boolean;
  rules?: object;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      name,
      label,
      secureTextEntry,
      rules,
      onSubmitEditing,
      returnKeyType = 'done',
      ...rest
    },
    ref,
  ) => {
    const {
      control,
      formState: {errors},
    } = useFormContext();

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              style={[styles.input, errors[name] && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              onSubmitEditing={onSubmitEditing}
              returnKeyType={returnKeyType}
              ref={ref}
              {...rest}
            />
          )}
        />
        {errors[name] && (
          <Text style={styles.errorText}>{`${errors[name]?.message}`}</Text>
        )}
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 7,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: '#d1d1d1',
    backgroundColor: '#fdfdfd',
  },
  inputError: {
    borderColor: '#fc6d47',
  },
  errorText: {
    color: '#fc6d47',
    marginTop: 5,
  },
});
