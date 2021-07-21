import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface RequestStatusProps {}

const RequestStatus = (props: RequestStatusProps) => {
  return (
    <View style={styles.container}>
      <Text>RequestStatus</Text>
    </View>
  );
};

export default RequestStatus;

const styles = StyleSheet.create({
  container: {}
});
