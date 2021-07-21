import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface RequestProps {}

const Request = (props: RequestProps) => {
  return (
    <View style={styles.container}>
      <Text>Request</Text>
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({
  container: {}
});
