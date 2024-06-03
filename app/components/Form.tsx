// Form.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import {ZodSchema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import Button from './Button';

interface FormProps {
  schema: ZodSchema;
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({schema, onSubmit, children}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <View>
        <View>{children}</View>
        <Button
          title="Login"
          onPress={methods.handleSubmit(onSubmit)}
          style={styles.button}
        />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
});

export default Form;
