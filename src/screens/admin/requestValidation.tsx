import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface RequestValidationProps {}

const RequestValidation = (props: RequestValidationProps) => {
  return (
    <View style={styles.container}>
      <Text>RequestValidation</Text>
    </View>
  );
};

export default RequestValidation;

const styles = StyleSheet.create({
  container: {}
});
